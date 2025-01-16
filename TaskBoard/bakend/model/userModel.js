const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    name: {
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
    signupDate: {
      type: String,
    },
    timeLimits: {
      type: String,
    },
    diffInDays: {
      type: String,
    },
    image: {
      type: JSON,
      required: false,
    },
  },
  { versionKey: false }
);

module.exports = mongoose.model("User", userSchema);
