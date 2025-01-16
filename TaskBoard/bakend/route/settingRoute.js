const express = require("express");
const settingController = require("../controller/settingController");
const router = express.Router();

router.post("/sendReferral", settingController.sendReferral);
router.get("/getReferredUsers", settingController.getReferredUsers);
router.post("/sendReferral", settingController.sendReferral);
router.get("/getReferredUsers", settingController.getReferredUsers);

module.exports = router;