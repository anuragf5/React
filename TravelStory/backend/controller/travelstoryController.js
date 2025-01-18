const { error } = require("console");
const travelstoryModel = require("../models/travelstoryModel");
const fs = require("fs");
const path = require("path");
const { title } = require("process");

exports.addStory = async (req, res) => {
  const { title, story, visitedLocation, imageUrl, visitedDate } = req.body;

  const userId = req.user;

  if (!title || !story || !visitedLocation || !imageUrl || !visitedDate) {
    return res
      .status(400)
      .json({ error: true, message: "All fields are required" });
  }

  //Converted visitedDate from milliseconds to Date object
  const parsedVisitedDate = new Date(parseInt(visitedDate));

  try {
    const travelStory = new travelstoryModel({
      title,
      story,
      visitedLocation,
      imageUrl,
      visitedDate: parsedVisitedDate,
      userId,
    });

    await travelStory.save();
    res
      .status(200)
      .json({ story: travelStory, message: "Story added successfully" });
  } catch (error) {
    return res.status(400).json({ error: true, message: error.message });
  }
};

exports.getAllStory = async (req, res) => {
  try {
    const travelStories = await travelstoryModel
      .find()
      .sort({ isFavorite: -1 });
    res.status(200).json({ stories: travelStories });
  } catch (error) {
    return res.status(400).json({ error: true, message: error.message });
  }
};

exports.getStoryById = async (req, res) => {
  try {
    const { id } = req.params;
    const travelStories = await travelstoryModel.findById(id);
    console.log(`>>>>> Travel story found <<<<< ${travelStories}`);

    if (!travelStories) {
      return res.status(404).json({ Error: "Travel story not found" });
    }
    res.status(200).json({ stories: travelStories });
  } catch (error) {
    return res.status(400).json({ error: true, message: error.message });
  }
};

exports.uploadImage = async (req, res) => {
  try {
    if (!req.file) {
      return res
        .status(400)
        .json({ error: true, message: "No image uploaded" });
    }
    const imageUrl = `http://localhost:9090/uploads/${req.file.filename}`;
    res.status(200).json({ imageUrl });
  } catch (error) {
    res.status(500).json({ error: true, message: error.message });
  }
};

exports.deleteImage = async (req, res) => {
  const { imageUrl } = req.query;
  if (!imageUrl) {
    return res
      .status(400)
      .json({ error: true, message: "imageUrl paramater is required" });
  }

  try {
    const fileName = path.basename(imageUrl);
    const filePath = path.join(__dirname, "..", "uploads", fileName);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
      res.status(200).json({ message: "Image deleted successfully" });
    } else {
      res.status(200).json({ error: true, message: "Image not found" });
    }
  } catch (error) {
    res.status(500).json({ error: true, message: error.message });
  }
};

exports.editStoryById = async (req, res) => {
  const { id } = req.params;

  const { title, story, visitedLocation, imageUrl, visitedDate } = req.body;

  const { userId } = req.user;

  if (!title || !story || !visitedLocation || !imageUrl || !visitedDate) {
    return res
      .status(400)
      .json({ error: true, message: "All fields are required" });
  }

  //Converted visitedDate from milliseconds to Date object
  const parsedVisitedDate = new Date(parseInt(visitedDate));

  try {
    const travelStory = await travelstoryModel.findById({
      _id: id,
      userId: userId,
    });

    if (!travelStory) {
      return res
        .status(400)
        .json({ error: true, message: "Travel story not found" });
    }

    const placeHolderImageUrl = `http://localhost:9090/assets/freepik__pixel-art-8bits-a-flat-lay-arrangement-featuring-a__24328.png`;

    travelStory.title = title;
    travelStory.story = story;
    travelStory.visitedLocation = visitedLocation;
    travelStory.imageUrl = imageUrl || placeHolderImageUrl;
    travelStory.visitedDate = parsedVisitedDate;

    await travelStory.save();
    res
      .status(200)
      .json({ story: travelStory, message: "Update successfully" });
  } catch (error) {
    return res.status(500).json({ error: true, message: error.message });
  }
};

exports.deleteStoryById = async (req, res) => {
  const { id } = req.params;
  const { userId } = req.user;
  try {
    const travelStory = await travelstoryModel.findById({
      _id: id,
      userId: userId,
    });
    console.log(`>>>>> Travel story found <<<<< ${travelStory}`);

    if (!travelStory) {
      return res.status(404).json({ Error: "Travel story not found" });
    }

    await travelStory.deleteOne({ _id: id, userId: userId });

    const imageUrl = travelStory.imageUrl;
    const fileName = path.basename(imageUrl);

    const filePath = path.join(__dirname, "..", "uploads", fileName);

    fs.unlinkSync(filePath, (err) => {
      if (err) {
        console.error("Failed to delete image file ", err);
      }
    });

    res.status(200).json({ message: "Travel story deleted successfully" });
  } catch (error) {
    return res.status(400).json({ error: true, message: error.message });
  }
};

exports.updateIsFavoriteById = async (req, res) => {
  const { id } = req.params;
  const { isFavorite } = req.body;
  const { userId } = req.user;

  try {
    const travelStory = await travelstoryModel.findById({
      _id: id,
      userId: userId,
    });

    if (!travelStory) {
      return res
        .status(404)
        .json({ error: true, message: "Travel story not found" });
    }

    travelStory.isFavorite = isFavorite;
    await travelStory.save();
    res
      .status(200)
      .json({ story: travelStory, message: "Update successfully" });
  } catch (error) {
    res.status(500).json({ error: true, message: error.message });
  }
};

exports.searchTravelStory = async (req, res) => {
  const { userId } = req.user;
  const { query } = req.query;

  if (!query) {
    return res.status(404).json({ error: true, message: "Query is required" });
  }

  try {
    console.log("User ID:", userId);
    console.log("Query:", query);
    const searchResult = await travelstoryModel
      .find({
        // userId: userId,
        $or: [
          { title: { $regex: query, $options: "i" } },
          { story: { $regex: query, $options: "i" } },
          { visitedLocation: { $regex: query, $options: "i" } },
        ],
      })
      .sort({ isFavorite: -1 });

    res.status(200).json({ stories: searchResult });
  } catch (error) {
    res.status(500).json({ error: true, message: error.message });
  }
};

exports.filterTravelStory = async (req, res) => {
  const { startDate, endDate } = req.query;
  const { userId } = req.user;
  try {
    const start = new Date(parseInt(startDate));
    const end = new Date(parseInt(endDate));
    const filterTravelStory = await travelstoryModel
      .find({
        // userId: userId,
        visitedDate: { $gte: start, $lte: end },
      })
      .sort({ isFavorite: -1 });
    res.status(200).json({ stories: filterTravelStory });
  } catch (error) {
    res.status(500).json({ error: true, message: error.message });
  }
};
