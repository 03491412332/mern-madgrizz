const Users = require("../models/User");
const catchAsync = require("../Utils/catchAsync");
const AppError = require("../Utils/appError");
const sendEmail = require("../Utils/email");
const formidable = require("formidable");
const path = require("path");
const fs = require("fs/promises");
const HelpCenter = require("../models/Help");
const createReport = catchAsync(async (req, res, next) => {
  var form = new formidable.IncomingForm();
  form.parse(req, async (err, fields, files) => {
    let newHelp;
    const { title, issue, report_image, user_id } = fields;

    if (!title || !issue || !user_id) {
      return res.status(400).json({
        status: "success",
        message: "Please provide title or issue",
      });
    }

    if (Object.keys(files).length === 0) {
      newHelp = await HelpCenter.create({
        title,
        issue,
        user_id,
      });
    } else {
      // This is question image coding
      const getReportImageName = files.report_image.originalFilename;
      // console.log("image name at 49", getQuestionImageName);
      const randNumberOfReportImage = Math.floor(Math.random() * 9999999);
      const newReportImageName = randNumberOfReportImage + getReportImageName;
      files.report_image.originalFilename = newReportImageName;
      const newPathForReportImage = path.join(
        __dirname,
        `../public/images/reports` + "/" + files.report_image.originalFilename
      );

      await fs.copyFile(files.report_image.filepath, newPathForReportImage);
      newHelp = await Users.create({
        title,
        issue,
        user_id,
        report_image: files.profile_image.originalFilename,
      });
    }

    return res.json({
      status: "success",
      message: "Email sent successfully",

      data: {
        newHelp,
      },
    });
  });
});

const getReports = catchAsync(async (req, res, next) => {
  const helps = await HelpCenter.find().populate("user_id");

  if (helps.length === 0) {
    return res.status(404).json({
      status: "fail",
      message: "We could not found any reports",
    });
  }

  return res.status(200).json({
    status: "success",
    data: {
      helps,
    },
  });
});

const getReportWithId = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const helps = await HelpCenter.findById(id).populate("user_id");

  if (!helps) {
    return res.status(404).json({
      status: "fail",
      message: "We could not found any reports",
    });
  }

  return res.status(200).json({
    status: "success",
    data: {
      helps,
    },
  });
});
const updateHelp = catchAsync(async (req, res, next) => {
  const { email_body, email } = req.body;
  console.log("email", email);
  console.log("email_body", email_body);
  const help = await HelpCenter.findByIdAndUpdate(req.params.id, {
    resolved: true,
  });
  if (!help) {
    return res.status(400).json({
      status: "fail",
      message: "Internal server error",
    });
  }

  try {
    await sendEmail({
      email: email,
      subject: "Medgrizz Reported query",
      html: `<!DOCTYPE html><html lang="en"> <head> <meta charset="UTF-8" /> <meta name="viewport" content="width=device-width, initial-scale=1.0" /> <title>Medgrizz Report Email</title> </head> <body> <div class="center_email"> <h1>Medgrizz Reported issues Details</h1> <p>${email_body}</p> </div> </body></html>`,
    });

    return res.status(200).json({
      status: "success",
      message: `Email sent successfully ${email}`,
      data: {
        help,
      },
    });
  } catch (error) {
    console.log(error);
  }
});

module.exports = { createReport, getReports, getReportWithId, updateHelp };
