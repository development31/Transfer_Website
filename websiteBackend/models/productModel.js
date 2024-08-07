const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId, // Assuming user is linked to a user document
    ref: "User", // Reference to the User model un comment on same server i
    required: true,
  },
  carts: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, required: true },
      sno: { type: String, required: true },
      productname: { type: String, required: true },
      description: { type: String, required: true },
      price: { type: String, required: true },
      image: { type: String },
      qty: { type: Number, default: 1 }, 
    },
  ],
});

module.exports = mongoose.model("Cart", cartSchema);