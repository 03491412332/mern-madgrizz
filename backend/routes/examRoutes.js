const express = require("express");
const router = express.Router();
const examController = require("../controllers/examController");
const authMiddleware = require("../middlewares/authMiddleware");
router
  .route("/")
  .get(authMiddleware.protect, examController.getAllExam)
  .post(authMiddleware.protect, examController.createExam);
router
  .route("/:id")
  .get(authMiddleware.protect, examController.getExamById)
  .patch(authMiddleware.protect, examController.updateExam)
  .delete(authMiddleware.protect, examController.deleteExam);

module.exports = router;
