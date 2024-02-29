const { default: mongoose } = require("mongoose");

const { Schema } = mongoose;

const userSchema = new Schema({
    firstName: {
        type: String,
        required: true,
        minLength: [5],
        maxLength: [25],
    },
    lastName: {
        type: String,
        minLength: [5],
        maxLength: [25],
    },
    address: {
        type: String,
        required: true,
        minLength: [5],
        maxLength: [25],
    },
    email: {
        type: String,
        required: true,
        unique: true,
        minLength: [5],
        maxLength: [25],
    },
    phone: {
        type: String,
        required: true,
        unique: true,
        minLength: [11],
        maxLength: [14],
    },
    password: {
        type: String,
        required: true,
        minLength: [5],
    }
}, { timestamps: true });

const userModel = mongoose.model("Users", userSchema);

module.exports = userModel;