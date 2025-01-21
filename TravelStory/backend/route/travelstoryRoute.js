const express = require("express");
const travelstoryController = require("../controller/travelstoryController");
const router = express.Router();
const auth = require("../middleware/auth");
const upload = require("../multer");

router.post("/addStory", auth, travelstoryController.addStory);
router.get("/getAllStory", auth, travelstoryController.getAllStory);
router.get("/getStoryById/:id", travelstoryController.getStoryById);
router.post(
  "/uploadImage",
  upload.single("image"),
  travelstoryController.uploadImage
);
router.delete("/deleteImages", travelstoryController.deleteImage);
router.post("/editStoryById/:id", auth, travelstoryController.editStoryById);
router.delete(
  "/deleteStoryById/:id",
  auth,
  travelstoryController.deleteStoryById
);
router.put(
  "/updateIsFavoriteById/:id",
  auth,
  travelstoryController.updateIsFavoriteById
);
router.get("/searchTravelStory", auth, travelstoryController.searchTravelStory);
router.get("/filterTravelStory", auth, travelstoryController.filterTravelStory);

module.exports = router;
