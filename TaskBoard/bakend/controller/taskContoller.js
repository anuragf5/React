const TaskModel = require("../model/taskModel"); // Fix typo
const List = require("../model/listModel"); // Import List modee

exports.createTask = async (req, res) => {
  const { name, listId } = req.body;
  try {
    const task = await TaskModel.create({
      name,
      listId,
    });
    await List.findByIdAndUpdate(listId, {
      $push: { tasks: task._id },
    });

    res.status(200).json(task);
    console.log(">>>>> Task created <<<<<", task);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

exports.completeTask = async (req, res) => {
  const { taskId } = req.body;
  try {
    const task = await TaskModel.findById(taskId);
    task.completed = true;
    await task.save();
    res.json(task);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getTasksForList = async (req, res) => {
  const { listId } = req.params;

  try {
    const tasks = await TaskModel.find({ listId });
    res.status(200).json(tasks);
  } catch (err) {
    console.error("Error fetching tasks:", err);
    res.status(500).json({ error: "Failed to fetch tasks." });
  }
};

// In your taskController.js
exports.updateTask = async (req, res) => {
  const { taskId } = req.params;
  const { listId } = req.body;

  try {
    const task = await TaskModel.findById(taskId);
    task.listId = listId; // Update the listId of the task
    await task.save();

    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteOne = async (req, res) => {
  // Use `req.params` to get the id from the URL

  try {
    const { taskId } = req.params;

    const task = await TaskModel.findByIdAndDelete(taskId);

    console.log(`>>>>> Deleted task <<<<< ${task}`);

    if (!task) {
      return res.status(404).json({ Error: "Task not found" });
    }
    res.status(200).json(task);
  } catch (error) {
    console.error("Error deleting task:", error);
    res
      .status(500)
      .json({ message: "An error occurred while deleting the task" });
  }
};

exports.updateTaskColor = async (req, res) => {
  const { color } = req.body;
  try {
    const task = await TaskModel.findByIdAndUpdate(
      req.params.id,
      { color },
      { new: true } // Return the updated document
    );

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.status(200).json(task);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to update task color" });
  }
};

exports.addDueDate = async (req, res) => {
  try {
    const { taskId, dueDate } = req.body;
    const task = await TaskModel.findByIdAndUpdate(
      taskId,
      { dueDate },
      { new: true }
    );

    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }

    res.status(200).json(task);
  } catch (error) {
    console.error("Error updating task:", error);
    res.status(500).json({ error: error.message });
  }
};

exports.addStartDate = async (req, res) => {
  try {
    const { taskId, startDate } = req.body;
    const task = await TaskModel.findByIdAndUpdate(
      taskId,
      { startDate },
      { new: true }
    );

    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }

    res.status(200).json(task);
  } catch (error) {
    console.error("Error updating task:", error);
    res.status(500).json({ error: error.message });
  }
};

exports.getTasksWithDueDate = async (req, res) => {
  try {
    const { userId } = req.body;

    if (!userId) {
      return res.status(400).json({ error: "User ID is required" });
    }

    const tasks = await TaskModel.find({
      userId,
      dueDate: { $exists: true, $ne: null },
    });

    return res.status(200).json(tasks);
  } catch (error) {
    console.error("Error fetching tasks:", error);
    res.status(500).json({ error: error.message });
  }
};