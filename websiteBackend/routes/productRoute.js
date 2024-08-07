const express = require("express");
const {
  getCartItems,
  addToCart,
  updateCartProductQuantity,
  deleteProductFromCart,
  getProducts
} = require("../controllers/productController");
const {
  verifyToken,
  checkAuthentication,
} = require("../middleware/verifyToken");
const router = express.Router();
//as User
router.get("/", checkAuthentication, getCartItems); // login
router.get("/product", getProducts); // login
router.post("/addcart", checkAuthentication, addToCart); // login
router.post("/update", checkAuthentication, updateCartProductQuantity); // login
router.delete("/:id", checkAuthentication, deleteProductFromCart); // login

module.exports = router;
