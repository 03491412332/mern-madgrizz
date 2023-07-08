const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const router = express.Router();
const {
  createSubject,
  getAllSubjects,
  getSubject,
  updateSubject,
  deleteSubject,
} = require("../controllers/subjectController");

router
  .route("/")
  .get(authMiddleware.protect, getAllSubjects)
  .post(createSubject);
router
  .route("/:id")
  .get(authMiddleware.protect, getSubject)
  .patch(authMiddleware.protect, updateSubject)
  .delete(authMiddleware.protect, deleteSubject);

module.exports = router;
