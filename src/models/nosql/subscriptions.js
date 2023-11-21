const mongoose = require("mongoose");

const SuscriptionsSchema = new mongoose.Schema(
  {
    plan: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true, //TODO createdAt, updatedAt
    versionKey: false,
  }
);

module.exports = mongoose.model("suscriptions", SuscriptionsSchema);
