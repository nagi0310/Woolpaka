import stripe from "../lib/stripe.js";
import Coupon from "../models/coupon.model.js";
import Order from "../models/order.model.js";
export const createCheckoutSession = async (req, res) => {
  try {
    const { products, couponCode } = req.body;

    // Check if products exist in order
    if (!Array.isArray(products) || products.length === 0) {
      return res.status(400).json({ error: "Invalid or empty products array" });
    }

    // Get the total amount of the order and get lineItems for stripe session
    let totalAmount = 0;
    const lineItems = products.map((product) => {
      const amount = Math.round(product.price * 100); // stripe requires format of cents
      totalAmount += amount * product.quantity;
      return {
        price_data: {
          currency: "usd",
          product_data: {
            name: product.name,
            images: [product.image],
          },
          unit_amount: amount,
        },
        quantity: product.quantity || 1,
      };
    });

    // Calculate discount with coupon
    let coupon = null;
    if (couponCode) {
      coupon = await Coupon.findOne({
        userId: req.user._id,
        code: couponCode,
        isActive: true,
      });
      if (coupon) {
        totalAmount -= Math.round(totalAmount * coupon.discountPercentage);
        coupon.isActive = false;
        coupon.save();
      }
    }

    // Create stripe checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: `${process.env.CLIENT_URL}/purchase-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.CLIENT_URL}/purchase-cancel`,
      discounts: coupon
        ? [{ coupon: await createStripeCoupon(coupon.discountPercentage) }]
        : [],
      metadata: {
        userId: req.user._id,
        couponCode: couponCode || "",
        products: JSON.stringify(
          products.map((product) => ({
            id: product.id,
            quantity: product.quantity,
            price: product.price,
          })),
        ),
      },
    });

    // Create a new coupon is totalAmount is more than $200
    if (totalAmount >= 20000) {
      await createNewCoupon(req.user._id);
    }

    res.status(200).json({ id: session.id, totalAmount: totalAmount / 100 });
  } catch (error) {
    console.log("Error in createCheckoutSession controller", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const CheckoutSuccess = async (req, res) => {
  try {
    const { sessionId } = req.body;
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    if (session.payment.status == "paid") {
      // Deactivate the coupon
      if (session.metadata.couponCode) {
        const coupon = await Coupon.findOneAndUpdate(
          {
            userId: session.metadata.userId,
            code: session.metadata.couponCode,
          },
          {
            isActive: false,
          },
        );
      }

      // Store the order in database
      const products = JSON.parse(session.metadata.products);
      const newOrder = await Order.create({
        user: session.metadata.userId,
        products: products.map((product) => ({
          product: product.id,
          quantity: product.quantity,
          price: product.price,
        })),
        totalAmount: session.amount_total / 100,
        stripeSessionId: session.id,
      });

      res.status(200).json({
        success: true,
        messaeg:
          "Payment successful, order created, and coupon deactivated if used",
        order: newOrder._id,
      });
    }
  } catch (error) {
    console.log("Error in CheckoutSuccess controller", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

async function createStripeCoupon(discountPercentage) {
  try {
    const coupon = await stripe.coupons.create({
      percent_off: discountPercentage,
      duration: "once",
    });
    return coupon.id;
  } catch (error) {
    console.log("Failed creating coupon in stripe");
  }
}

async function createNewCoupon(userId) {
  const newCoupon = await Coupon.create({
    code: "GIFT" + Math.random().toString(36).substring(2, 8).toUpperCase(),
    discountPercentage: 10,
    expirationDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
    isActive: true,
    userId: userId,
  });

  await newCoupon.save();
  return newCoupon;
}
