const mongoose = require("mongoose");
const mongooseDelete = require("mongoose-delete");

const urlSchema = new mongoose.Schema({ public_id: String, secure_url: String})
const HotelSchema = new mongoose.Schema(
  {
    nameowner: {
      type: String,
      required: true,
      trim: true,
    },
    lastnameowner: {
      type: String,
      required: true,
      trim: true,
    },
    emailowner: {
      type: String,
      required: true,
      trim: true,
    },

    namehotel: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: Number,
      required: true
    },

    postalcode: {
      type: Number,
      required: true,
    },
    street: {
      type: String,
      required: true,
      trim: true,
    },
    streetnumber: {
      type: Number,
      required: true
    },
    city: {
      type: String,
      required: true,
      trim: true,
    },
    phone: {
      type: String,
      required: true,
      trim: true,
    },
    images: [
      urlSchema 
    ],
    disponible: {
      type: Boolean,
      default: true,
    }
  },
  {
    timestamps: true, //TODO createdAt, updatedAt
    versionKey: false,
  }
);

HotelSchema.plugin(mongooseDelete, { overrideMethods: "all" });
module.exports = mongoose.model("hotels", HotelSchema);
