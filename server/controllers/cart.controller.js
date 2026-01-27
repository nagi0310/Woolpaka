import Product from "../models/product.model.js";

export const getCartProducts = async (req, res) => {
  try {
    const user = req.user;
    const products = await Product.find({ _id: { $in: user.cartItems } });

    // Add quantity
    const cartItems = products.map((product) => {
      const item = user.cartItems((cartItem) => {
        cartItem.id === product.id;
      });
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
    const existingItem = user.cartItems.findById(
      (item) => item.id === productId,
    );
    if (existingItem) {
      // add the quantity
      existingItem.quantity += 1;
    } else {
      // create in cart
      user.cartItems.push({ product: productId });
    }

    await user.save();
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
      user.cartItems = user.cartItems.filter((item) => item.id !== productId);
    }
    await user.save();
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
    const existingItem = user.cartItems.findById(
      (item) => item.id === productId,
    );
    if (existingItem) {
      if (quantity === 0) {
        user.cartItems = user.cartItems.filter((item) => item.id !== productId);
      } else {
        existingItem.quantity = quantity;
      }
      user.save();
      res.json(user.cartItems);
    } else {
      return res.status(404).json({ message: "Product not found." });
    }
  } catch (error) {
    console.log("Error in updateQuantity controller", error.message);
    res.status(500).json({ message: error.message });
  }
};
