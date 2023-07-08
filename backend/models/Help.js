const mongoose = require("mongoose");

const helpSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please provide title "],
    },
    issue: {
      type: String,
      required: [true, "Please provide issue"],
    },
    report_image: {
      type: String,
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

const HelpCenter = new mongoose.model("help_center", helpSchema);

module.exports = HelpCenter;
