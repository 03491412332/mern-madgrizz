const mongoose = require("mongoose");

const systemSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide name of system"],
    },
  },
  {
    timestamps: true,
  }
);

const Systems = new mongoose.model("systems", systemSchema);

module.exports = Systems;
