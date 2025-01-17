const express = require("express");
const dotenv = require("dotenv");
const app = express();
const cors = require("cors");
const db = require("./config/mongodb");
const authRoutes = require("./route/authRoute");

dotenv.config();
db();

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

app.use("/auth", authRoutes);

const port = 9090;

app.listen(port, () => {
  console.log(`server start on http://localhost:${port}`);
});
