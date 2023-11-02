const { default: mongoose } = require("mongoose");
const mongooseDelete = require("mongoose-delete");


const UserGoogleSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
        },
        role: {
            type: ["user", "admin"],
            default: "user",
        },
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

UserGoogleSchema.plugin(mongooseDelete, { overrideMethods: "all" });
module.exports = mongoose.model("usersgoogle", UserGoogleSchema);