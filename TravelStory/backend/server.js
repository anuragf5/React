const express = require("express");
const dotenv = require("dotenv");
const app = express();
const cors = require("cors");
const db = require("./config/mongodb");
const authRoutes = require("./route/authRoute");
const travelStoryRoutes = require("./route/travelstoryRoute");
const path = require("path");

dotenv.config();
db();

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

app.use("/auth", authRoutes);
app.use("/travelStory", travelStoryRoutes);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/assets", express.static(path.join(__dirname, "assets")));

const port = 9090;

app.listen(port, () => {
  console.log(`server start on http://localhost:${port}`);
});
