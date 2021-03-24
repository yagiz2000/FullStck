const mongoose = require("mongoose");
const stockSchema = new mongoose.Schema({
  productType: {
    type: String,
    required: true,
    max: 255,
  },
  quantity: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
});
const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
    max: 255,
  },
  password: {
    type: String,
    required: true,
    max: 255,
  },
  stock: [stockSchema],
});

module.exports = mongoose.model("User", userSchema);
//module.exports = mongoose.model = ("Stock",stockSchema);
