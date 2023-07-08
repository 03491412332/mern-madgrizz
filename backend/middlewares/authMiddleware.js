const AppError = require("../Utils/appError");
const catchAsync = require("../Utils/catchAsync");
const jwt = require("jsonwebtoken");
const { promisify } = require("util"); //ye promisfy
const Users = require("../models/User");
const protect = catchAsync(async (req, res, next) => {
  // 1) getting token from request and check if its exists
  let token;
  //   console.log(req.headers);
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
    // console.log(token);
  }
  if (!token) {
    // return next(
    //   new AppError("You are not logged in! Please log in to get access", 401)
    // );
    return res.status(401).json({
      status: "fail",
      message: "You are not logged in! Please log in to get access",
    });
  }
  // 2) validate token

  const decodedToken = await promisify(jwt.verify)(
    token,
    process.env.JWT_SECRET
  );
  //   const decodedToken = await jwt.verify(token, process.env.JWT_SECRET);
  console.log(decodedToken);

  // 3) check if user still exists

  const user = await Users.findById(decodedToken.id);
  if (!user) {
    return next(
      new AppError("The token belongs to this token is no longer exists", 401)
    );
  }
  // 4) Check if user changed password after the token was issued
  // ham isky liye instance method bnaain gy model k andr
  if (user.changePasswordAfterJwtIssued(decodedToken.iat)) {
    return next(
      new AppError("User recently changed password! Please login again", 401)
    );
  }
  //Grant access to protected Route
  req.user = user;
  next();
});

// This time we use permissions for users like deleting question or etc we use closures
const permissionTo = (...userRoles) => {
  return async (req, res, next) => {
    //userRoles ['admin','user'] ,role='user'

    if (!userRoles.includes(req.user.role)) {
      return next(
        new AppError("You do not have permission to perform this action", 403)
      );
    }
    next();
  };
};

module.exports = { protect, permissionTo };
