const jwt = require("jsonwebtoken");
const secretKey = "qwertyuiopasdfghjklzxcvbnmqwertyuiopasdfghjklzxcvbnm";
const userModel = require("../model/user_model");

module.exports = async (req, res, next) => {
  try {
    const token = req.headers?.authorization.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }

    // const splitToken = token.split(" ")[1];
    const decode = jwt.verify(token, secretKey);

    if (!decode) {
      return res.status(401).json({ message: "Invalid token" });
    }

    const user = await userModel.findById(decode.id);

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    // Call controller (get,post,put,patch method call)
    next();
  } catch (error) {
    res.status(400).send("Invalid token");
  }
};
