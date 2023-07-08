const mongoose = require("mongoose");

const subjectSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide name of subject"],
    },
  },
  {
    timestamps: true,
  }
);

const Subjects = new mongoose.model("subjects", subjectSchema);

module.exports = Subjects;
