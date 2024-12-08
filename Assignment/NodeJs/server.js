// Importing packages
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT;
const MONGODB_URL = process.env.MONGODB_URL;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(bodyParser.json());

const userRouter = require("./routes/user_route");
app.use("/user", userRouter);

// Server runs on this port and creating url

mongoose
  .connect(MONGODB_URL)
  .then(() => {
    console.log(`Connected to MONGODB URL ${MONGODB_URL}`);
  })
  .catch((error) => {
    console.error(`${error} in connection MONGODB URL`);
  });

// Listen on the specified port
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
