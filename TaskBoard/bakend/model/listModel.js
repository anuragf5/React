const mongoose = require("mongoose");

const listSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    color: { type: String, default: "white", required: false },
  },
  { versionKey: false }
);

module.exports = mongoose.model("List", listSchema);
