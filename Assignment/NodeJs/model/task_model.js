// Creating schema/model
// Connect this model to controller

const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    taskName: {
      type: String,
      required: true,
    },
    completed: {
      type: Boolean,
      required: true,
    },
    listId: {
      type: String,
      ref: "list",
    },
  },
  { versionKey: false }
);

module.exports = mongoose.model("task", taskSchema);
