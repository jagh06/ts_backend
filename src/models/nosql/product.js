const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  description: {
    type: String,
  },
  price: {
    type: Number,
  },

  images: {
    type: Array,
  },
});

module.exports = mongoose.model('product', ProductSchema);
