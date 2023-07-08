const mongoose = require("mongoose");
const Questions = require("../models/Question");
const Users = require("../models/User");

const reportSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please provide report topic"],
    },
    question_id: {
      type: mongoose.ObjectId,
      ref: "questions",
    },
    user_id: {
      type: mongoose.ObjectId,
      ref: "users",
    },
    resolved: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Reports = new mongoose.model("reports", reportSchema);

module.exports = Reports;
