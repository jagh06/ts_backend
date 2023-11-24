const mongoose = require("mongoose");
const mongooseDelete = require("mongoose-delete");

const ClientSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        lastname: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            unique: true,
            required: true,
        },
        password: {
            type: String,
            required: true,
            select: false
        },
        phone: {
            type: String,
            required: true,
        },
        subscribed: {
            type: Boolean,
            default: false,
        },
        role: {
            type: ["user", "admin"],
            default: "admin",
        },
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

ClientSchema.plugin(mongooseDelete, { overrideMethods: "all" });
module.exports = mongoose.model("clients", ClientSchema);


