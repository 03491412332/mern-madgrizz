const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const userSchema = new mongoose.Schema(
  {
    user_name: {
      type: String,
      required: [true, "Please provide name"],
      trim: true,
    },
    full_name: {
      type: String,
      required: [true, "Please provide full name"],
      trim: true,
    },
    email: {
      type: String,
      validate: [validator.isEmail, "Please provide email"],
      unique: true,
      trim: true,
    },
    profile_image: {
      type: String,
    },
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
    },
    password: {
      type: String,
      // required: [true, "Please provide a password"],
      trim: true,
      select: false, //jb koi new user create hoga to ye response mai show hoga lekin jb ham user ka data fetch kr rhy hongy to ye show nhi hoga
    },
    passwordConfirm: {
      type: String,
      // required: [true, "Please provide a password"],
      trim: true,
      validate: {
        //this only works on Users.create() and Users.save()
        //jb ham password update kr rhy honn gy to ye kam nhi kry ga
        //ye ham ny confirm password kliye add kiya hai
        validator: function (doc) {
          return doc === this.password; //abc===abc then return true
        },
        message: "Passwords are not same",
      },
    },
    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordResetExpires: Date, //ye aik specific time k badd expire ho jaye ga
  },
  {
    timestamps: true,
  }
);
//Before saving to db we encrypt password and del passwordConfirm
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  //here we encrypt the passwords
  this.password = await bcrypt.hash(this.password, 12);
  //ab hamary pass password jo hai woi encrypted ho k aa chuka hai ab hmain confirm password ko delete kr dain k db mai save krny sy pehly
  this.passwordConfirm = undefined;
  next();
});

userSchema.methods.correctPassword = async function (
  userPassword,
  ourDbPassword
) {
  return await bcrypt.compare(userPassword, ourDbPassword);
};
userSchema.methods.changePasswordAfterJwtIssued = function (JWTTimestamp) {
  if (this.passwordChangedAt) {
    const changeTimeStamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );
    console.log(changeTimeStamp, JWTTimestamp);
    return JWTTimestamp < changeTimeStamp;
  }
  //false means not changed
  return false;
};

userSchema.methods.createPasswordResetToken = function () {
  // crypto sy ham 32 bit hexa mai aik random string bna'ain gy
  const resetToken = crypto.randomBytes(32).toString("hex");
  this.passwordResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");
  console.log({ resetToken }, this.passwordResetToken);
  this.passwordResetExpires = Date.now() + 10 * 60 * 1000; //password reset token expires after 10 minutes
  return resetToken;
};

const Users = new mongoose.model("users", userSchema);

module.exports = Users;
