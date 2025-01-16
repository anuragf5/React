const mongoose = require("mongoose");

const taskSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    completed: {
      type: Boolean,
      default: false,
    },
    listId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "List",
      required: true,
    },
    color: { type: String, default: "white", required: false },
    startDate: {
      type: Date,
    },
    dueDate: {
      type: Date,
    },
  },
  { versionKey: false }
);

module.exports = mongoose.model("Task", taskSchema);
