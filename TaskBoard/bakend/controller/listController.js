const ListModel = require("../model/listModel.js");
const TaskModel = require("../model/taskModel.js");
const cloudinary = require("cloudinary").v2;
const fileUpload = require("express-fileupload");
const express = require("express");
const app = express();
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);
require("dotenv").config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});


exports.createList = async (req, res) => {
  const { name, userId } = req.body;
  try {
    const list = await ListModel.create({ name, user: userId });
    res.status(201).json(list);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getListsByUser = async (req, res) => {
  const { userId } = req.params;
  try {
    const lists = await ListModel.find({ user: userId });
    res.status(200).json(lists);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.moveTask = async (req, res) => {
  const { taskId, listId } = req.body;
  try {
    const task = await TaskModel.findById(taskId);

    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }
    task.list = listId;
    await task.save();
    res.json(task);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update list color
exports.updateListColor = async (req, res) => {
  const { color } = req.body;
  try {
    const list = await ListModel.findByIdAndUpdate(
      req.params.id,
      { color },
      { new: true } // Return the updated document
    );

    if (!list) {
      return res.status(404).json({ message: "List not found" });
    }

    res.status(200).json(list);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to update list color" });
  }
};

exports.deleteOne = async (req, res) => {
  // Use `req.params` to get the id from the URL

  try {
    const { listId } = req.params;

    const list = await ListModel.findByIdAndDelete(listId);

    console.log(`>>>>> Deleted list <<<<< ${list}`);

    if (!list) {
      return res.status(404).json({ Error: "List not found" });
    }
    res.status(200).json(list);
  } catch (error) {
    console.error("Error deleting list:", error);
    res
      .status(500)
      .json({ message: "An error occurred while deleting the list" });
  }
};