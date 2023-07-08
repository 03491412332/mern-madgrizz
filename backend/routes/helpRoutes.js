const express = require("express");
const helpController = require("../controllers/helpController");
const authMiddleware = require("../middlewares/authMiddleware");
const router = express.Router();

router
  .route("/")
  .post(authMiddleware.protect, helpController.createReport)
  .get(authMiddleware.protect, helpController.getReports);

router
  .route("/:id")
  .get(authMiddleware.protect, helpController.getReportWithId)
  .patch(authMiddleware.protect, helpController.updateHelp);

module.exports = router;
