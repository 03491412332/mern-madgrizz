const Users = require("../models/User");
const catchAsync = require("../Utils/catchAsync");
const jwt = require("jsonwebtoken");
const AppError = require("../Utils/appError");
const sendEmail = require("../Utils/email");
const formidable = require("formidable");
const path = require("path");
const fs = require("fs/promises");

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const signup = catchAsync(async (req, res, next) => {
  // console.log(`register`);
  // console.log(req);

  var form = new formidable.IncomingForm();
  form.parse(req, async (err, fields, files) => {
    // console.log("fields", fields);
    // console.log("file", files);
    let newUser;
    const {
      user_name,
      full_name,
      email,
      profile_image,
      password,
      passwordConfirm,
      passwordChangedAt,
    } = fields;

    if (!user_name || !full_name || !email || !password || !passwordConfirm) {
      return next(new AppError("Please provide all values", 400));
    }
    const isUserAlreadyExisted = await Users.findOne({ email });
    if (isUserAlreadyExisted) {
      return res.status(400).json({
        status: "fail",
        message: "User already existed with this email ! try again",
      });
    }
    //console.log("condition", Object.keys(files).length === 0);
    if (Object.keys(files).length === 0) {
      newUser = await Users.create({
        user_name,
        full_name,
        email,
        profile_image,
        password,
        passwordConfirm,
        passwordChangedAt,
      });
    }
    // This is question image coding
    const getProfileImageName = files.profile_image.originalFilename;
    // console.log("image name at 49", getQuestionImageName);
    const randNumberOfProfileImage = Math.floor(Math.random() * 9999999);
    const newProfileImageName = randNumberOfProfileImage + getProfileImageName;
    files.profile_image.originalFilename = newProfileImageName;
    const newPathForProfileImage = path.join(
      __dirname,
      `../public/images/users` + "/" + files.profile_image.originalFilename
    );

    await fs.copyFile(files.profile_image.filepath, newPathForProfileImage);
    newUser = await Users.create({
      user_name,
      full_name,
      email,
      profile_image: files.profile_image.originalFilename,
      password,
      passwordConfirm,
      passwordChangedAt,
    });
    const token = await signToken(newUser._id);
    return res.json({
      status: "success",
      message: "User added successfully",
      token,
      data: {
        newUser,
      },
    });
  });
});

const signin = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  // 1) Check if email and password exists
  if (!email || !password) {
    return next(new AppError("Please provide all values", 404));
  }

  // 2) Check if user exists && password is correct

  // const user = await Users.findOne({ email }).select("+password");
  // // ab yahan pr hamary db mai jo password pra hai wo encrypted hai lekin jo password aa rha hai wo plain text mai hai iskliye ham bcrypt ka function istmal kr k check kr lain gy
  // //iss kliye ham mongoose instance method ka use krain gy
  // const correct = await user.correctPassword(password, user.password);
  // if (!user || !correct) {
  //   return res.status(401).json({
  //     status: "fail",
  //     message: "Incorrect email or password",
  //   });
  // }
  // // 3) if everything is ok send the token
  // const token = signToken(user._id);
  const user = { name: "Ghulam" };
  const token = "jdjjdjdjd";

  return res.status(200).json({
    status: "success",
    data: {
      user,
      token,
    },
  });
});

const signInWithGoogle = catchAsync(async (req, res) => {
  if (req.user) {
    console.log(req.user._json);
    const { name, picture, email } = req.user._json;
    const user = await Users.find({ email });
    if (user) {
      const token = signToken(user._id);
      return res.status(403).json({
        status: "success",
        message: "Login success",
        data: { user, token },
      });
    }
    const newUser = await Users.create({
      user_name: name,
      full_name: name,
      email,
      profile_image: picture,
    });
    const token = signToken(newUser._id);
    return res.status(200).json({
      status: "success",
      message: "Loggedin successfully",
      data: {
        user: newUser,
        token,
      },
    });
  }
});
const forgotPassword = catchAsync(async (req, res, next) => {
  // 1) get user based on posted email
  const { email } = req.body;
  const user = await Users.findOne({ email });
  if (!user) {
    return next(new AppError("There is no user with email address.", 404));
  }

  // 2) generate the random reset token we use instance method for this purpose

  const resetToken = user.createPasswordResetToken();

  // 3)Send it to user email
  const resetURL = `${req.protocol}://${req.get(
    "host"
  )}/api/v1/users/resetPassword/${resetToken}`;
  const message = `Forgot your password? Submit a PATCH request with your new password and passwordConfirm to ${resetURL}.\nIf you did not forgot your password ,Please ignore this`;

  try {
    await sendEmail({
      email: user.email,
      subject: "Your Password reset token(Valid for 10 minutes)",
      message,
    });

    return res.status(200).json({
      status: "success",
      message: `Token sent to email ${user.email}`,
    });
  } catch (error) {
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    //jb ham ny iss createPasswordResetToken mai this.passwordResetToken ko kiya to ham ny dacument ko modify kiya hai issliye ham issy save krain gy
    //await user.save(); jb ye kraingy to ye hamain btaye ga k jo validation mai required field hain wo missing hain isliye ham ny yahan pr validations ko skip krna hai
    await user.save({ validateBeforeSave: false });
    console.log(error);
    return next(
      new AppError("There was an error sending the email.Try again later", 500)
    );
  }
});

const resetPassword = catchAsync(async (req, res, next) => {});

const deleteUser = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const user = await Users.findByIdAndDelete(id);
  return res.status(200).json({
    status: "success",
    message: "User deleted successfully",
  });
});

const getAllUsers = catchAsync(async (req, res, next) => {
  const users = await Users.find({});

  if (users.length === 0) {
    // return res.json(404).json({
    //   status:'fail',
    //   message:'we could'
    // })
    return next(new AppError("We could not find any user", 404));
  }

  return res.status(200).json({
    status: "success",
    data: {
      users,
    },
  });
});

const getUser = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  console.log("params", req.params);
  const user = await Users.findById(id);
  if (!user) {
    return res.status(400).json({
      status: "fail",
      message: "Could not find user",
    });
  }
  return res.status(200).json({
    status: "success",
    data: {
      user,
    },
  });
});

const updateUser = catchAsync(async (req, res, next) => {
  var form = new formidable.IncomingForm();
  form.parse(req, async (err, fields, files) => {
    console.log("fields", fields);
    console.log("params", req.params);
    const { id } = req.params;

    let newUser;
    const { user_name, full_name, email, profile_image } = fields;

    if (!user_name || !full_name || !email) {
      return next(new AppError("Please provide all values", 400));
    }
    // const isUserAlreadyExisted = await Users.findOne({ email });
    // if (isUserAlreadyExisted) {
    //   return res.status(400).json({
    //     status: "fail",
    //     message: "User already existed with this email ! try again",
    //   });
    // }

    if (Object.keys(files).length === 0) {
      newUser = await Users.findByIdAndUpdate(id, {
        user_name,
        full_name,
        email,
      });
    }
    if (Object.keys(files).length !== 0) {
      // This is question image coding
      const getProfileImageName = files.profile_image.originalFilename;
      // console.log("image name at 49", getQuestionImageName);
      const randNumberOfProfileImage = Math.floor(Math.random() * 9999999);
      const newProfileImageName =
        randNumberOfProfileImage + getProfileImageName;
      files.profile_image.originalFilename = newProfileImageName;
      const newPathForProfileImage = path.join(
        __dirname,
        `../public/images/users` + "/" + files.profile_image.originalFilename
      );

      await fs.copyFile(files.profile_image.filepath, newPathForProfileImage);
      newUser = await Users.findByIdAndUpdate(id, {
        user_name,
        full_name,
        email,
        profile_image: files.profile_image.originalFilename,
      });
    }
    const token = await signToken(newUser._id);
    return res.json({
      status: "success",
      message: "User added successfully",
      token,
      data: {
        newUser,
      },
    });
  });
});

module.exports = {
  signup,
  signin,
  deleteUser,
  forgotPassword,
  resetPassword,
  getAllUsers,
  getUser,
  updateUser,
  signInWithGoogle,
};
