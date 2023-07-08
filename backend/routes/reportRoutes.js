const express = require("express");
const reportController = require("../controllers/reportController");
const authMiddleware = require("../middlewares/authMiddleware");
const router = express.Router();

router
  .route("/")
  .post(authMiddleware.protect, reportController.createReport)
  .get(authMiddleware.protect, reportController.getAllReports);

router
  .route("/:id")
  .get(authMiddleware.protect, reportController.getReportedQuestionWithId)
  .patch(authMiddleware.protect, reportController.editReport);

module.exports = router;
