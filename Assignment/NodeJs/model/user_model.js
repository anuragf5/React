// Creating schema/model
// Connect this model to controller

const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    confirmPassword: {
      type: String,
      required: true,
    },
    // otp: {
    //   type: String,
    //   required: true,
    // },
    // otpGeneratedAt: { type: Date, default: Date.now },
  },
  { versionKey: false }
);

module.exports = mongoose.model("user", userSchema);
