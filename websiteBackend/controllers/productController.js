const Cart = require("../models/productModel");
const User = require("../models/userModel");
const product=require('../models/productsmodel')
const mongoose = require("mongoose"); // Import mongoose for ObjectId validation
const createError = require("../middleware/error");
const createSuccess = require("../middleware/success");

const addToCart = async (req, res) => {
  try {
    const { product } = req.body;
    const userId = req.user.id;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    let cart = await Cart.findOne({ user: userId });

    if (!cart) {
      cart = new Cart({ user: userId, carts: [] });
    }

    const existingProductIndex = cart.carts.findIndex(
      (item) => item.productId.toString() === product._id.toString()
    );

    if (existingProductIndex !== -1) {
      cart.carts[existingProductIndex].qty += 1;
    } else {
      cart.carts.push({
        productId: product._id,
        sno: product.sno,
        productname: product.productname,
        description: product.description,
        price: product.price,
        image: product.image,
        qty: 1,
      });
    }

    const savedCart = await cart.save();

    res.status(201).json({email:user.email});
  } catch (error) {
    console.error("Error adding item to cart:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};


const getCartItems = async (req, res) => {
  try {
    const userId = req.user.id;
    const cartItems = await Cart.findOne({ user: userId });
    if (!cartItems) {
      return res.status(404).json({ message: "Cart not found for this user" });
    }
    res.status(200).json(cartItems.carts);
  } catch (error) {
    console.error("Error fetching cart items:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const updateCartProductQuantity = async (req, res) => {
  const { productId, type } = req.body;
  const userId = req.user.id;

  try {
    let cart = await Cart.findOne({ user: userId });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found for the user" });
    }

    let productToUpdate = cart.carts.find(
      (item) => item.productId.toString() === productId
    );

    if (!productToUpdate) {
      return res.status(404).json({ message: "Product not found in the cart" });
    }

    if (type === "add") {
      productToUpdate.qty = productToUpdate.qty + 1;
    } else {
      productToUpdate.qty = productToUpdate.qty - 1;

      if (productToUpdate.qty === 0) {
        cart.carts = cart.carts.filter(
          (item) => item.productId.toString() !== productId
        );
      }
    }

    const updatedCart = await cart.save();

    res.status(200).json(updatedCart.carts);
  } catch (error) {
    console.error("Error updating cart product quantity:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const deleteProductFromCart = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const productId = req.params.id;

    let cart = await Cart.findOne({ user: userId });

    if (!cart) {
      return next(createError(404, "Cart not found for the user"));
    }

    const productIndex = cart.carts.findIndex(
      (item) => item.productId.toString() === productId
    );

    if (productIndex === -1) {
      return next(createError(404, "Product not found in the cart"));
    }

    cart.carts.splice(productIndex, 1);

    const updatedCart = await cart.save();

    res.status(200).json(updatedCart.carts);
  } catch (error) {
    console.error("Error deleting product from cart:", error);
    return next(createError(500, "Internal Server Error"));
  }
};

const getProducts=async(req,res)=>{
  try {
    const products = await product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

module.exports = {
  getCartItems,
  addToCart,
  deleteProductFromCart,
  updateCartProductQuantity,
  getProducts
};