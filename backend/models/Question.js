const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Please provide question title"],
  },
  choices: {
    type: Array,
    required: [true, "Please provide choices"],
  },
  correct_answer: {
    type: String,
    required: [true, "Please provide correct answer"],
  },
  difficulty: {
    type: String,
    enum: ["Easy", "Medium", "Hard"],
    default: "Easy",
  },
  status: {
    type: String,
    enum: ["Answered", "Unanswered", "Flagged"],
    default: "Answered",
  },
  type: {
    type: String,
    enum: ["Unused", "Incorrect", "Correct"],
    default: "Unused",
  },
  exam_id: {
    type: mongoose.ObjectId,
    ref: "exams",
  },
  question_image: {
    type: String,
  },
  answer_explanation: {
    type: String,
  },
  answer_image: {
    type: String,
  },
  system_id: {
    type: mongoose.ObjectId,
    ref: "systems",
  },
  subject_id: {
    type: mongoose.ObjectId,
    ref: "subjects",
  },
  points: {
    type: Number,
    default: 1,
  },
});

const Questions = new mongoose.model("questions", questionSchema);

module.exports = Questions;
