// Only http methods like .get, .post, .put, .patch, .delete
// Import controller into this route

const express = require("express");
const router = express.Router();
const userController = require("../controller/user_controller");
const userAuth = require("../middleware/userAuth");

router.post("/save", userController.signup);

router.post("/login", userController.login);

router.get("/getAll", userController.getAllUsers);

router.get("/getById/:id", userController.getById);

router.delete("/deleteOneUser/:id", userController.deleteOne);

router.delete("/deleteAll", userController.deleteAll);

router.put("/updateOneUser/:id", userController.updateOne);

router.post("/createList", userController.createList);

router.get("/getList", userController.getList);

router.get("/getListById/:id", userController.getListOne);

router.post("/createTask", userController.createTask);

router.put("/moveTask/:id", userController.moveTask);

router.put("/completedTask/:id", userController.taskCompleted);

module.exports = router;
