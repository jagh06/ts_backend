const mongoose = require("mongoose");

const SuscriptionsSchema = new mongoose.Schema(
  {
    idclient: {
      type: String,
    },
    email: {
      type: String,
    },
  },
  {
    timestamps: true, //TODO createdAt, updatedAt
    versionKey: false,
  }
);

module.exports = mongoose.model("suscriptions", SuscriptionsSchema);
