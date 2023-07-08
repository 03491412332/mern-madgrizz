const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const router = express.Router();
const {
  createSystem,
  getAllSystems,
  getSystem,
  UpdateSystem,
  deleteSystem,
} = require("../controllers/systemController");
router
  .route("/")
  .get(authMiddleware.protect, getAllSystems)
  .post(authMiddleware.protect, createSystem);
router
  .route("/:id")
  .get(authMiddleware.protect, getSystem)
  .patch(authMiddleware.protect, UpdateSystem)
  .delete(authMiddleware.protect, deleteSystem);

module.exports = router;
