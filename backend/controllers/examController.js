const Exams = require("../models/Exam");
const catchAsync = require("../Utils/catchAsync");
const AppError = require("../Utils/appError");
const Plans = require("../models/Plans");
const createExam = catchAsync(async (req, res, next) => {
  const { name, plans } = req.body;
  let exam;
  let plansForExam = [];
  if (Object.keys(plans[0]).length === 0) {
    exam = await Exams.create({ name });
  } else {
    for (let i = 0; i < plans.length; i++) {
      const { name, full_price, discounted_price, plan_length, duration } =
        plans[i];
      console.log("plan", full_price);
      const plan = await Plans.create({
        name,
        full_price,
        discounted_price,
        plan_length,
        duration,
      });
      plansForExam.push(plan._id);
    }
    exam = await Exams.create({
      name,
      plan_ids: plansForExam,
    });
    console.log("plans for exam", plansForExam);
  }

  return res.status(200).json({
    status: "success",
    data: {
      exam,
    },
  });
});

const getAllExam = catchAsync(async (req, res, next) => {
  const exams = await Exams.find();
  if (exams.length <= 0) {
    return next(new AppError("We could not found any exam", 404));
  }
  return res.status(200).json({
    status: "success",
    data: {
      exams,
    },
  });
});
const getExamById = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const exam = await Exams.findById(id).populate("plan_ids");
  if (!exam) {
    return res.json(404).json({
      status: "fail",
      message: "we could not find any exam",
    });
  }
  return res.status(200).json({
    status: "success",
    data: {
      exam,
    },
  });
});
const updateExam = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const { name, plan_ids } = req.body;
  let exam;
  let plansForExam = [];
  if (Object.keys(plan_ids[0]).length === 0) {
    exam = await Exams.findByIdAndUpdate(id, { name });
  } else {
    const allExamsIdsAlreadyWeCreated = await Exams.find({ _id: id }).select(
      "plan_ids"
    );
    console.log("exams existed ids", allExamsIdsAlreadyWeCreated);
    console.log("paln_ids", plan_ids);

    for (let i = 0; i < plan_ids.length; i++) {
      if (plan_ids[i]._id) {
        plansForExam.push(plan_ids[i]._id);
      }
      if (!plan_ids[i]._id) {
        console.log("plan full price");
        const { name, full_price, discounted_price, plan_length, duration } =
          plan_ids[i];
        const plan = await Plans.create({
          name,
          full_price,
          discounted_price,
          plan_length,
          duration,
        });
        plansForExam.push(plan._id);
      }
    }
    console.log("plans for exam after createing exams ", plansForExam);

    exam = await Exams.findByIdAndUpdate(id, {
      name: name,
      plan_ids: plansForExam,
    });
  }

  // const exam = await Exams.findByIdAndUpdate(req.params.id, { name });
  // if (!exam) {
  //   return next(new AppError("We could not find any exam", 404));
  // }
  return res.status(200).json({
    status: "success",
    data: {
      exam,
    },
  });
});

const deleteExam = catchAsync(async (req, res, next) => {
  const exam = await Exams.findByIdAndDelete(req.params.id);
  if (!exam) {
    return next(new AppError("We could not find any exam", 404));
  }
  return res.status(200).json({
    status: "success",
    message: "Exam deleted successfully",
  });
});

module.exports = {
  createExam,
  getAllExam,
  getExamById,
  updateExam,
  deleteExam,
};
