const express = require("express");
const app = express();
const taskController = require("../controller/taskContoller");
const router = express.Router();
const auth = require("../middleware/auth");

router.post("/create", taskController.createTask);
router.post("/complete", taskController.completeTask);
router.delete("/deleteOneTask/:taskId", taskController.deleteOne);
router.get("/:listId", taskController.getTasksForList);
router.put("/update/:taskId", taskController.updateTask);
router.put("/:id/color", taskController.updateTaskColor);
router.post("/dueDate", taskController.addDueDate);
router.post("/startDate", taskController.addStartDate);
router.post("/getdueDateTask", taskController.getTasksWithDueDate);

module.exports = router;