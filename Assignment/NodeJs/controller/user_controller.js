// All the logic part + request and response
// Import model in this controller

const userModel = require("../model/user_model");
const taskModel = require("../model/task_model");
const listModel = require("../model/list_model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const secretKey = "qwertyuiopasdfghjklzxcvbnmqwertyuiopasdfghjklzxcvbnm";

const generateOTP = async () => {
  const otp = Math.floor(Math.random() * 10000 + 1).toString();
  return otp;
};

exports.signup = async (req, res) => {
  try {
    // const randomOTP = await generateOTP();

    const { username, email, password, confirmPassword } = req.body;

    if (!username && !email && !password && !confirmPassword) {
      return res.status(400).json({ Error: "Please fill all the fields" });
    }

    const userEmail = await userModel.findOne({ email });
    const userName = await userModel.findOne({ username });

    if (userEmail) {
      return res.status(400).json({ Error: "Email already exists" });
    }

    if (userName) {
      return res.status(400).json({ Error: "Username already exists" });
    }

    if (password !== confirmPassword) {
      return res.status(400).send("Passwords do not match!");
    }

    const salt = bcrypt.genSaltSync(10);
    console.log(`>>>>> Salt <<<<< ${salt}}`);

    const hash = bcrypt.hashSync(password, salt);
    console.log(`>>>>> Hash <<<<< ${hash}}`);

    const userData = {
      username,
      email,
      password: hash,
      confirmPassword: hash,
      // otp: randomOTP,
    };

    const user = new userModel(userData);
    await user.save();

    // Generate JWT token for the newly created user
    const token = jwt.sign({ id: user._id }, secretKey, { expiresIn: "1h" });

    res.status(200).json({ user, token, message: "User created successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  const userEmail = await userModel.findOne({ email });

  if (!userEmail) {
    return res.status(400).json({ message: "Please Signup" });
  }

  const databasePassword = userEmail.password;
  const match = await bcrypt.compare(password, databasePassword);

  if (!match) {
    return res.status(400).json({ message: "Invalid Password" });
  }

  const token = jwt.sign({ id: userEmail._id }, secretKey, { expiresIn: "1h" });

  return res.status(200).json({
    token,
    message: "User login successfully",
  });
};

exports.createList = async (req, res) => {
  const { listName } = req.body;

  const list = await listModel.create({
    listName,
  });

  try {
    const newList = await list.save();
    res.status(200).json(newList);

    console.log("<<<<< Save Create List >>>>>", newList);
  } catch (err) {
    res.status(400).json({ message: "err" });
  }
};

exports.getList = async (req, res) => {
  try {
    const list = await listModel.find();

    console.log(`>>>>> Lists found <<<<< ${list}`);

    if (!list) {
      return res.status(404).json({ Error: "Lists not found" });
    }
    res.status(200).json(list);
  } catch (error) {
    console.error("Error finding lists:", error);
    res
      .status(500)
      .json({ message: "An error occurred while finding the lists" });
  }
};

exports.getListOne = async (req, res) => {
  try {
    const { id } = req.params;

    const list = await listModel.findById(id);

    console.log(`>>>>> List found <<<<< ${list}`);

    if (!list) {
      return res.status(404).json({ Error: "List not found" });
    }
    res.status(200).json(list);
  } catch (error) {
    console.error("Error finding list:", error);
    res
      .status(500)
      .json({ message: "An error occurred while finding the list" });
  }
};

exports.createTask = async (req, res) => {
  const { taskName, listId, completed } = req.body;

  const task = await taskModel.create({
    taskName,
    completed,
    listId,
  });

  try {
    const newTask = await task.save();
    res.status(200).json(newTask);

    console.log("<<<<< Save Create Task >>>>>", newTask);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Move task to another list
exports.moveTask = async (req, res) => {
  const { id } = req.params;
  const { listId } = req.body;
  const task = await taskModel.findById(id);

  console.log(task);

  if (!task) {
    return res.status(404).json({ message: "Task not found for move" });
  }

  task.listId = listId;
  await task.save();
  res.status(200).json(task);
};

// Mark task as completed
exports.taskCompleted = async (req, res) => {
  const { id } = req.params;
  const task = await taskModel.findById(id);
  if (!task) {
    return res.status(404).json({ message: "Task not found" });
  }

  try {
    task.completed = true;
    await task.save();
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

// Get user one by one
exports.getAllUsers = async (req, res) => {
  const user = await userModel.find();

  if (!user) {
    return res.status(400).json({ message: "Users not found" });
  }

  res.status(200).json(user);
};

// Get user one by one
exports.getById = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await userModel.findById(id);

    console.log(`>>>>> User found <<<<< ${user}`);

    if (!user) {
      return res.status(404).json({ Error: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error("Error finding user:", error);
    res
      .status(500)
      .json({ message: "An error occurred while finding the user" });
  }
};

// Delete user one by one
exports.deleteOne = async (req, res) => {
  // Use `req.params` to get the id from the URL

  try {
    const { id } = req.params;

    const user = await userModel.findByIdAndDelete(id);

    console.log(`>>>>> Deleted user <<<<< ${user}`);

    if (!user) {
      return res.status(404).json({ Error: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error("Error deleting user:", error);
    res
      .status(500)
      .json({ message: "An error occurred while deleting the user" });
  }
};

// Delete all user
exports.deleteAll = async (req, res) => {
  // Use `req.params` to get the id from the URL

  try {
    // const { id } = req.params;

    const user = await userModel.deleteMany();

    console.log(`>>>>> Deleted user <<<<< ${user}`);

    if (!user) {
      return res.status(404).json({ Error: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error("Error deleting user:", error);
    res
      .status(500)
      .json({ message: "An error occurred while deleting the user" });
  }
};

// Update user one by one
exports.updateOne = async (req, res) => {
  const { id } = req.params;
  const updatedData = req.body;

  try {
    const updatedUser = await userModel.findByIdAndUpdate(id, updatedData, {
      new: true,
    });
    console.log(`>>>>> Updated user<<<<< ${updatedUser}`);

    if (!updatedUser) {
      return res.status(404).json({ Error: "User not found" });
    }
    return res.status(200).json(updatedUser);
  } catch (error) {
    console.error("Error updating user:", error);
    return res
      .status(500)
      .json({ message: "An error occurred while updating the user" });
  }
};
