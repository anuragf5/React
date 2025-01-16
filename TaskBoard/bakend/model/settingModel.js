const mongoose = require("mongoose");

const SettingSchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  referalCode: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Setting", SettingSchema);