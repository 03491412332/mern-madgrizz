const Subjects = require("../models/Subject");
const catchAsync = require("../Utils/catchAsync");
const AppError = require("../Utils/appError");
const createSubject = catchAsync(async (req, res, next) => {
  const { name } = req.body;
  if (!name) {
    return next(new AppError("Please provide name of subject", 404));
  }

  const subject = await Subjects.create({ name });

  return res.status(200).json({
    status: "success",
    data: {
      subject,
    },
  });
});

const getAllSubjects = catchAsync(async (req, res, next) => {
  const subjects = await Subjects.find();
  if (subjects.length <= 0) {
    return next(new AppError("We could not find any subjects", 404));
  }

  return res.status(200).json({
    status: "success",
    data: {
      subjects,
    },
  });
});
const getSubject = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const subject = await Subjects.findById(id);
  if (!subject) {
    return next(new AppError("We could not find subject", 404));
  }

  const { _id, name } = subject;
  return res.status(200).json({
    status: "success",
    data: {
      _id,
      name,
    },
  });
});
const updateSubject = catchAsync(async (req, res, next) => {
  const { name } = req.body;
  const subject = await Subjects.findByIdAndUpdate(req.params.id, { name });
  if (!subject) {
    return next(new AppError("No subject found with this id", 404));
  }
  return res.status(200).json({
    status: "success",
    data: {
      subject,
    },
  });
});

const deleteSubject = catchAsync(async (req, res, next) => {
  const subject = await Subjects.findByIdAndDelete(req.params.id);
  if (!subject) {
    return next(new AppError("We could not find any subject of that id"));
  }
  return res.status(200).json({
    status: "success",
    message: "Subject deleted successfully",
  });
});

module.exports = {
  createSubject,
  getAllSubjects,
  getSubject,
  updateSubject,
  deleteSubject,
};
