const mongoose = require("mongoose");

const travelStorySchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    story: {
      type: String,
      required: true,
    },
    visitedLocation: {
      type: [String],
      default: [],
    },
    isFavorite: {
      type: Boolean,
      default: false,
    },
    createdOn: {
      type: Date,
      default: Date.now(),
    },
    imageUrl: {
      type: String,
      required: true,
    },
    visitedDate: {
      type: Date,
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { versionKey: false }
);

module.exports = mongoose.model("TravelStory", travelStorySchema);
