const catchAsync = require("../Utils/catchAsync");
const AppError = require("../Utils/appError");
const Systems = require("../models/System");

const createSystem = catchAsync(async (req, res, next) => {
  const { name } = req.body;

  if (!name) {
    return next(new AppError("Please provide name of system", 404));
  }

  const system = await Systems.create({ name });

  return res.status(200).json({
    status: "success",
    data: {
      system,
    },
  });
});

const getAllSystems = catchAsync(async (req, res, next) => {
  const systems = await Systems.find();
  if (systems.length <= 0) {
    return next(new AppError("We could not find any systems", 404));
  }
  return res.status(200).json({
    status: "success",
    data: {
      systems,
    },
  });
});
const getSystem = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const system = await Systems.findById(id);
  if (!system) {
    return next(new AppError("We could not find subject", 404));
  }

  const { _id, name } = system;
  return res.status(200).json({
    status: "success",
    data: {
      _id,
      name,
    },
  });
});
const UpdateSystem = catchAsync(async (req, res, next) => {
  //const

  const { name } = req.body;
  const system = await Systems.findByIdAndUpdate(req.params.id, { name });
  if (!system) {
    return next(new AppError("we could not find system", 404));
  }
  return res.status(200).json({
    status: "success",
    data: {
      system,
    },
  });
});

const deleteSystem = catchAsync(async (req, res, next) => {
  const system = await Systems.findByIdAndDelete(req.params.id);

  if (!system) {
    return next(new AppError("we could not find system", 404));
  }
  return res.status(200).json({
    status: "success",
    message: "System deleted successfully",
  });
});

module.exports = {
  createSystem,
  getAllSystems,
  getSystem,
  UpdateSystem,
  deleteSystem,
};
