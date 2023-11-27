const mongoose = require("mongoose");

const ReservacionesSchema = new mongoose.Schema(
  {
    iduser: {
      type: String,
    },
    idhotel: {
      type: String,
    },
    emailowner: {
      type: String,
    },
    namehotel: {
      type: String,
    },
    city: {
      type: String,
    },
    street: {
      type: String,
    },
    name: {
      type: String,
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
    numpersonas: {
      type: Number,
    },
    numdenoches: {
      type: Number,
    },
    fechallegada: {
      type: String,
    },
  },
  {
    timestamps: true, //TODO createdAt, updatedAt
    versionKey: false,
  }
);
module.exports = mongoose.model("reservaciones", ReservacionesSchema);
