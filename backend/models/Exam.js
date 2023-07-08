const mongoose = require("mongoose");

const examSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide exam name"],
    },
    plan_ids: {
      type: [mongoose.ObjectId],
      ref: "plans",
    },
  },
  {
    timestamps: true,
  }
);

const Exams = new mongoose.model("exams", examSchema);

module.exports = Exams;
