const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const {
  createQuestion,
  getAllQuestionsOfExam,
  getAQuestionOfExam,
  editQuestion,
  deleteQuestion,
} = require("../controllers/questionController");
const router = express.Router();

router.route("/").post(authMiddleware.protect, createQuestion);
router.route("/:exam_id").get(authMiddleware.protect, getAllQuestionsOfExam);
router
  .route("/:exam_id/:question_id")
  .get(authMiddleware.protect, getAQuestionOfExam)
  .patch(authMiddleware.protect, editQuestion)
  .delete(authMiddleware.protect, deleteQuestion);

module.exports = router;
