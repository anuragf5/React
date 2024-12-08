// Creating schema/model
// Connect this model to controller

const mongoose = require("mongoose");

const listSchema = new mongoose.Schema(
  {
    listName: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
      ref:"user",
    },
  },
  { versionKey: false }
);

module.exports = mongoose.model("list", listSchema);
