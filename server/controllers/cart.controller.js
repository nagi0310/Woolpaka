import Product from "../models/product.model.js";
import User from "../models/user.model.js";

export const getCartProducts = async (req, res) => {
  try {
    const user = req.user;
    const productIds = user.cartItems.map((item) => item.product);
    const products = await Product.find({
      _id: { $in: productIds },
    });

    // Add quantity field to the cartItems
    const cartItems = products.map((product) => {
      const item = user.cartItems.find(
        (cartItem) => String(cartItem.product) === String(product._id),
      );
      return {
        ...product.toJSON(),
        quantity: item.quantity,
      };
    });
    res.json(cartItems);
  } catch (error) {
    console.log("Error in getCartProducts controller", error.message);
    res.status(500).json({ message: error.message });
  }
};
export const addToCart = async (req, res) => {
  try {
    const { productId } = req.body;
    const user = req.user; // get from protect Route

    // check if the product exists in the user cart
    const existingItem = user.cartItems.find(
      (item) => String(item.product) === String(productId),
    );
    if (existingItem) {
      // add the quantity
      existingItem.quantity += 1;
    } else {
      // create in cart
      user.cartItems.push({ product: productId });
    }

    await User.findByIdAndUpdate(
      user._id,
      { $set: { cartItems: user.cartItems } },
      { new: true },
    );
    res.json(user.cartItems);
  } catch (error) {
    console.log("Error in addToCart controller", error.message);
    res.status(500).json({ message: error.message });
  }
};

export const removeAllFromCart = async (req, res) => {
  try {
    const { productId } = req.body;
    const user = req.user;
    if (!productId) {
      return res
        .status(400)
        .json({ message: "Product ID is required to remove an item." });
    } else {
      user.cartItems = user.cartItems.filter(
        (item) => String(item.product) !== String(productId),
      );
    }
    await User.findByIdAndUpdate(
      user._id,
      { $set: { cartItems: user.cartItems } },
      { new: true },
    );
    res.json(user.cartItems);
  } catch (error) {
    console.log("Error in removeAllFromCart controller", error.message);
    res.status(500).json({ message: error.message });
  }
};

export const updateQuantity = async (req, res) => {
  try {
    const { id: productId } = req.params;
    const { quantity } = req.body;
    const user = req.user;

    // check if the product exists in the user cart
    const existingItem = user.cartItems.find(
      (item) => String(item.product) === String(productId),
    );
    if (existingItem) {
      if (quantity === 0) {
        user.cartItems = user.cartItems.filter(
          (item) => String(item.product) !== String(productId),
        );
      } else {
        existingItem.quantity = quantity;
      }
      await User.findByIdAndUpdate(
        user._id,
        { $set: { cartItems: user.cartItems } },
        { new: true },
      );
      res.json(user.cartItems);
    } else {
      return res.status(404).json({ message: "Product not found." });
    }
  } catch (error) {
    console.log("Error in updateQuantity controller", error.message);
    res.status(500).json({ message: error.message });
  }
};
