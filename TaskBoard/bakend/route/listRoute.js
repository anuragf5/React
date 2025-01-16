const express = require("express");
const listController = require("../controller/listController");
const router = express.Router();
const auth = require("../middleware/auth");

router.post("/create", listController.createList);
router.post("/move", listController.moveTask);
router.get("/:userId", listController.getListsByUser);
router.delete("/deleteOneList/:listId", listController.deleteOne);
router.put("/:id/color", listController.updateListColor);

module.exports = router;
