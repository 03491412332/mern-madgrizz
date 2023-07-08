const catchAsync = require("../Utils/catchAsync");
const AppError = require("../Utils/appError");
const Plans = require("../models/Plans");

const getAllPlans = catchAsync(async (req, res, next) => {
  const plans = await Plans.find();
  if (plans.length === 0) {
    return res.status(404).json({
      status: "fail",
      message: "we could not find any plans",
    });
  }

  return res.status(200).json({
    status: "success",
    data: {
      plans,
    },
  });
});

module.exports = { getAllPlans };
