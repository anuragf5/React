const express = require("express");
const dotenv = require("dotenv");
const app = express();
const cors = require("cors");
const db = require("./config/db");
const fileUpload = require("express-fileupload");
const authRoutes = require("./route/authRoute");
const listRoutes = require("./route/listRoute");
const taskRoutes = require("./route/taskRoute");
const settingRoutes = require("./route/settingRoute");

dotenv.config();
db();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(fileUpload());

app.use("/auth", authRoutes);
app.use("/lists", listRoutes);
app.use("/tasks", taskRoutes);
app.use("/settings", settingRoutes);

const port = 8080;

app.listen(port, () => {
  console.log(`server start on http://localhost:${port}`);
});
