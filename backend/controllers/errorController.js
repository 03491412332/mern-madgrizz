const AppError = require("../Utils/appError");

const sendErrorDevelopment = (err, res) => {
  return res.status(err.statusCode).json({
    status: err.status,
    err: err,
    message: err.message,
    stack: err.stackTrace,
  });
};

const sendErrorProduction = (err, res) => {
  //Handle operational error
  if (err.isOperational) {
    return res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  } else {
    console.error("Error", err);
    return res.status(500).json({
      status: "Error",
      message: "Something went wrong",
    });
  }
};

const handleCastErrorDB = (err) => {
  const message = `Invalid ${err.path} : ${err.value}`;
  return new AppError(message, 400);
};

const handleDuplicateFieldDB = (err) => {
  console.log(err);
  // const value = err.keyValue.match(/([""])(\\?.)*?\1/)[0];
  // console.log(value);
  const message = `Duplicate field value: please use another value`;
  return new AppError(message, 400);
};

const handleValidationErrorDB = (error) => {
  const errors = Object.values(error.errors).map((element) => element.message);
  const message = `Invalid input data. ${errors.join(",")}`;
  return new AppError(message, 400);
};

const handleJwtError = (err) => {
  return new AppError("Invalid token.Please login again", 401);
};
const handleJwtExpiration = (err) => {
  return new AppError("Your token is expired! Please login again ", 401);
};
module.exports = (err, req, res, next) => {
  if (process.env.NODE_ENV === "development") {
    sendErrorDevelopment(err, res);
  } else if ((process.env.NODE_ENV = "production")) {
    console.log(err);
    let error = { ...err };
    console.log(error);
    if (err.name === "CastError") {
      error = handleCastErrorDB(error);
    }
    if (error.code === 11000) {
      error = handleDuplicateFieldDB(error);
    }
    if (error.name === "ValidationError") {
      error = handleValidationErrorDB(error);
    }
    if (error.name === "JsonWebTokenError") {
      error = handleJwtError(error);
    }
    if (error.name === "TokenExpiredError") {
      error = handleJwtExpiration(error);
    }

    sendErrorProduction(error, res);
  }

  //else if NODE_ENV != 'development' and 'production

  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });
};
