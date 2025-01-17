const UserModel = require("../model/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const moment = require("moment");
const secretKey = "";
const nodemailer = require("nodemailer")

const register = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    if (!(name && email && password)) {
      return res.status(404).json({ message: "All fields are required" });
    }
    const userEmail = await UserModel.findOne({ email });
    if (userEmail)
      return res.status(400).json({ message: "Email already exist" });

    const salt = bcrypt.genSaltSync(10);
    console.log("Generated salt:", salt);

    const hash = bcrypt.hashSync(password, salt);
    console.log("Hashed password:", hash);

    const trialDays = 14;
    const trialStartDate = new Date();
    const trialEndDate = new Date();
    trialEndDate.setDate(trialStartDate.getDate() + trialDays);

    const data = {
      name,
      email,
      password: hash,
      signupDate: trialStartDate,
      timeLimits: trialEndDate,
    };

    const user = new UserModel(data);
    await user.save();
    console.log("User successfully saved:", user);

    res.status(200).json(user);
  } catch (error) {
    console.log("Error saving user:", error.message);
    res.status(500).json({
      message: "Internal server error while creating user",
    });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const userEmail = await UserModel.findOne({ email });
    console.log(">>>>> User Detail >>>>>:", userEmail);

    if (!userEmail) {
      return res.status(400).json({ message: "email not found" });
    }

    const databasePassword = userEmail.password;

    const match = await bcrypt.compare(password, databasePassword);

    if (!match) {
      return res.status(500).json({ message: "invalid password" });
    }

    // Calculate the difference in days between signupDate and timeLimit
    // const signupDate = moment(userEmail.signupDate, "DD-MM-YYYY");
    // const timeLimit = moment(userEmail.timeLimit, "DD-MM-YYYY");

    // const diffInDays = timeLimit.diff(signupDate, "days");

    const token = jwt.sign({ id: userEmail._id }, secretKey, {
      expiresIn: "1h",
    });

    return res.status(200).json({
      token,
      _id: userEmail._id,
      email: userEmail.email,
      // diffInDays: diffInDays,
      message: "user Login successful",
    });
  } catch (error) {
    res.status(500).json({ message: " error in login user" });
  }
};

const getById = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await UserModel.findById(id);

    console.log(`>>>>> User found <<<<< ${user}`);

    if (!user) {
      return res.status(404).json({ Error: "User not found" });
    }

    const trialEndDate = user.timeLimits;
    const endDate = new Date(trialEndDate);
    const now = new Date();
    const differnce = endDate - now;

    if (differnce <= 0) return "Your trial is expired";
    const days = Math.floor(differnce / (1000 * 60 * 60 * 24));

    res.status(200).json({
      name: user.name,
      email: user.email,
      password: user.password,
      signupDate: user.signupDate,
      timeLimits: user.timeLimits,
      remainingDays: days,
    });
  } catch (error) {
    console.error("Error finding user:", error);
    res
      .status(500)
      .json({ message: "An error occurred while finding the user" });
  }
};

const update = async (req, res) => {
  const { id } = req.params;
  const updatedData = req.body;

  try {
    const updatedUser = await UserModel.findByIdAndUpdate(id, updatedData, {
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

const resetPassword = async (req, res) => {
  const { email, oldPassword, newPassword } = req.body;

  try {
    // Validate input fields
    if (!(email && oldPassword && newPassword)) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Find the user by email
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if the old password matches the stored password
    const match = await bcrypt.compare(oldPassword, user.password);
    if (!match) {
      return res.status(400).json({ message: "Old password is incorrect" });
    }

    // Hash the new password
    const salt = bcrypt.genSaltSync(10);
    const hashedNewPassword = bcrypt.hashSync(newPassword, salt);

    // Update the user's password with the new hashed password
    user.password = hashedNewPassword;
    await user.save();

    res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    console.log("Error resetting password:", error.message);
    res
      .status(500)
      .json({ message: "Internal server error while resetting password" });
  }
};

const setreferralCode = async (req, res) => {
  try {
    const { userId } = req.body;

    // const user = await userModel.findOne({ _id:userId });
    // if (!user) {
    //   return res.status(400).json({ message: "user not found! Please signup" });
    // }

    const result = await UserModel.findByIdAndUpdate(
      userId,
      { referralCode: referralCode },
      { new: true, upsert: true }
    );

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  register,
  login,
  getById,
  update,
  resetPassword,
  setreferralCode,
};
