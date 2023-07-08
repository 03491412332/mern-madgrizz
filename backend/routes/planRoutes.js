const express = require("express");
const router = express.Router();
const plansController = require("../controllers/plansController");
const authMiddleware = require("../middlewares/authMiddleware");
router.route("/").get(authMiddleware.protect, plansController.getAllPlans);

module.exports = router;
