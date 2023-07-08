const catchAsync = require("../Utils/catchAsync");
const AppError = require("../Utils/appError");
const Reports = require("../models/Report");
const sendEmail = require("../Utils/email");
const createReport = catchAsync(async (req, res, next) => {
  console.log(req.body);
  const { title, question_id, user_id } = req.body;

  if (!title || !question_id || !user_id) {
    return res.status(400).json({
      status: "fail",
      message: "Please provide all values",
    });
  }
  const report = await Reports.create({ title, question_id, user_id });

  return res.status(200).json({
    status: "success",
    message: "question reported successfully",
    data: {
      report,
    },
  });
});

const getAllReports = catchAsync(async (req, res, next) => {
  const reports = await Reports.find()
    // .select(["_id", "title", "question_id", "createdAt", "resolved"])
    .populate({
      path: "question_id",
      select: ["subject_id", "system_id"],
      populate: [
        { path: "system_id", select: ["name"] },
        { path: "subject_id", select: ["name"] },
      ],
    });

  return res.status(200).json({
    status: "success",
    data: {
      reports,
    },
  });
});

const getReportedQuestionWithId = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  console.log("id", id);
  const report = await Reports.findById(id)
    .select(["_id", "title", "question_id", "createdAt"])
    .populate({
      path: "question_id",
    })
    .populate({
      path: "user_id",
    });

  return res.status(200).json({
    status: "success",
    data: {
      report,
    },
  });
});

const editReport = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const { email_body, answer_explanation, email } = req.body;

  const report = await Reports.findByIdAndUpdate(id, { resolved: true });
  try {
    await sendEmail({
      email: email,
      subject: "Medgrizz Reported query for report",
      html: `<!DOCTYPE html><html lang="en"> <head> <meta charset="UTF-8" /> <meta name="viewport" content="width=device-width, initial-scale=1.0" /> <title>Medgrizz Report Email</title> </head> <body> <div class="center_email"> <h1>Medgrizz Reported issues Details</h1> <p>${email_body}</p><p>${answer_explanation}</p> </div> </body></html>`,
    });

    return res.status(200).json({
      status: "success",
      message: `Email sent successfully ${email}`,
      data: {
        report,
      },
    });
  } catch (error) {
    console.log(error);
  }
  return res.status(200).json({
    status: "success",
    message: "Report resolved successfully",
    data: {
      report,
    },
  });
});

module.exports = {
  createReport,
  getAllReports,
  editReport,
  getReportedQuestionWithId,
};
