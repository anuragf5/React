const express = require("express");
const authController = require("../controller/authController");
const router = express.Router();
const auth = require("../middleware/auth")

router.post("/register", authController.register);
router.post("/login", authController.login);
router.get("/getById/:id", authController.getById);
router.put("/update/:id",authController.update)
router.post("/resetPassword", authController.resetPassword);
router.post("/setreferralCode", authController.setreferralCode);
module.exports = router;