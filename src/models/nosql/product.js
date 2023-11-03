const mongoose = require("mongoose");

const urlSchema = new mongoose.Schema({ public_id: String, secure_url: String})
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
  images : [
    urlSchema
  ],
  // addons:[]

  // images: [
  //   {
  //     public_id: String,
  //     secure_url: String,
  //   },
  // ],

  // images: {
  //   type: Array,
  // },
});

module.exports = mongoose.model("product", ProductSchema);
