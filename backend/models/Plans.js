const mongoose = require("mongoose");

const plansSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter name of plan"],
    },
    full_price: {
      type: Number,
      required: [true, "Please enter full price of plan"],
    },
    discounted_price: {
      type: Number,
    },
    plan_length: {
      type: Number,
      required: [true, "Please enter plan length"],
    },
    duration: {
      type: String,
      enum: ["Day", "Week", "Month", "Year"],
    },
    expiration_date: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

const Plans = new mongoose.model("plans", plansSchema);

module.exports = Plans;
