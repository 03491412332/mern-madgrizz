const Questions = require("../models/Question");
const catchAsync = require("../Utils/catchAsync");
const AppError = require("../Utils/appError");
const formidable = require("formidable");
const path = require("path");
const fs = require("fs/promises");
//import formidable from "formidable";
const createQuestion = catchAsync(async (req, res, next) => {
  var form = new formidable.IncomingForm({ multiplies: true });
  var myfiles = [];

  form.on("file", (formname, file) => {
    form.emit("data", { name: "file", formname, value: file });
  });

  // If you want to customize whatever you want...
  form.on(
    "data",
    ({ name, key, value, buffer, start, end, formname, ...more }) => {
      if (name === "file") {
        myfiles.push([formname, value]);
      }
    }
  );

  form.parse(req, async function (err, fields, files) {
    if (err) {
      // next(err);
      console.log(`error while parsing form data of create question`);
      return;
    }
    let question;
    const {
      title,
      answer_choices,
      correct_answer,
      difficulty,
      status,
      type,
      subject_id,
      system_id,
      points,
      exam_id,
      answer_explanation,
    } = fields;
    if (
      !title ||
      !answer_choices ||
      !correct_answer ||
      !subject_id ||
      !system_id ||
      !exam_id
    ) {
      return res.json({
        success: "fail",
        message: "Please provide all values",
      });
    }
    const choices = answer_choices.split(",");

    // console.log("files ", myfiles);
    console.log("file 1", myfiles[0]);
    console.log("files 2", myfiles[1]);

    if (myfiles[0] !== undefined && myfiles[1] !== undefined) {
      // This is question image coding
      const getQuestionImageName = myfiles[0][1].originalFilename;
      // console.log("image name at 49", getQuestionImageName);
      const randNumberOfQuestionImage = Math.floor(Math.random() * 9999999);
      const newQuestionImageName =
        randNumberOfQuestionImage + getQuestionImageName;
      myfiles[0][1].originalFilename = newQuestionImageName;
      const newPathForQuestionImage = path.join(
        __dirname,
        `../public/images/question_answer_images` +
          "/" +
          myfiles[0][1].originalFilename
      );

      await fs.copyFile(myfiles[0][1].filepath, newPathForQuestionImage);

      const getAnswerImageName = myfiles[1][1].originalFilename;
      const randNumberOfAnswerImage = Math.floor(Math.random() * 9999999);
      const newAnswerImageName = randNumberOfAnswerImage + getAnswerImageName;
      myfiles[1][1].originalFilename = newAnswerImageName;
      const newPathForAnswerImage = path.join(
        __dirname,
        `../public/images/question_answer_images` +
          "/" +
          myfiles[1][1].originalFilename
      );
      await fs.copyFile(myfiles[1][1].filepath, newPathForAnswerImage);
    }
    console.log(
      "condition upper",
      myfiles[0] !== undefined && myfiles[1] === undefined
    );
    if (myfiles[0] !== undefined && myfiles[1] === undefined) {
      console.log("entered in condition upper");
      if (myfiles[0][0] === "question_image") {
        console.log("uploading question_image ");
        // This is question image coding
        const getQuestionImageName = myfiles[0][1].originalFilename;
        // console.log("image name at 49", getQuestionImageName);
        const randNumberOfQuestionImage = Math.floor(Math.random() * 9999999);
        const newQuestionImageName =
          randNumberOfQuestionImage + getQuestionImageName;
        myfiles[0][1].originalFilename = newQuestionImageName;
        const newPathForQuestionImage = path.join(
          __dirname,
          `../public/images/question_answer_images` +
            "/" +
            myfiles[0][1].originalFilename
        );

        await fs.copyFile(myfiles[0][1].filepath, newPathForQuestionImage);
        console.log("uploading done question_image ");
      }
      if (myfiles[0][0] === "answer_images") {
        console.log("uploading answer_image ");
        //  Answer image
        const getAnswerImageName = myfiles[0][1].originalFilename;
        const randNumberOfAnswerImage = Math.floor(Math.random() * 9999999);
        const newAnswerImageName = randNumberOfAnswerImage + getAnswerImageName;
        myfiles[0][1].originalFilename = newAnswerImageName;
        const newPathForAnswerImage = path.join(
          __dirname,
          `../public/images/question_answer_images` +
            "/" +
            myfiles[0][1].originalFilename
        );
        await fs.copyFile(myfiles[0][1].filepath, newPathForAnswerImage);
        //console.log("image 2", myfiles[1][1]);
        console.log("uploading done answer_image ");
      }
    }

    if (myfiles[0] !== undefined && myfiles[1] !== undefined) {
      question = await Questions.create({
        title,
        choices,
        correct_answer,
        difficulty,
        status,
        type,
        exam_id,
        answer_explanation,
        question_image: myfiles[0][1].originalFilename,
        answer_image: myfiles[1][1].originalFilename,
        system_id,
        subject_id,
        points,
      });
    }
    console.log(
      "condition",
      myfiles[0] !== undefined && myfiles[1] === undefined
    );
    if (myfiles[0] !== undefined && myfiles[1] === undefined) {
      console.log("file 1 name", myfiles[0][0]);
      if (myfiles[0][0] === "question_image") {
        question = await Questions.create({
          title,
          choices,
          correct_answer,
          difficulty,
          status,
          type,
          answer_explanation,
          exam_id,
          question_image: myfiles[0][1].originalFilename,
          answer_image: null,
          system_id,
          subject_id,
          points,
        });
      }
      if (myfiles[0][0] === "answer_images") {
        question = await Questions.create({
          title,
          choices,
          correct_answer,
          difficulty,
          status,
          type,
          exam_id,
          question_image: null,
          answer_image: myfiles[0][1].originalFilename,
          system_id,
          subject_id,
          answer_explanation,
          points,
        });
      }
    }
    if (myfiles[0] === undefined && myfiles[1] === undefined) {
      question = await Questions.create({
        title,
        choices,
        correct_answer,
        difficulty,
        status,
        type,
        exam_id,
        question_image: null,
        answer_image: null,
        system_id,
        subject_id,
        points,
        answer_explanation,
      });
    }

    return res.status(200).json({
      status: "success",
      message: "Question added successfully",
      data: {
        question,
      },
    });
  });
});

const getAllQuestionsOfExam = catchAsync(async (req, res, next) => {
  console.log("req params", req.params);
  console.log("req body", req.body);
  const { exam_id } = req.params;
  const questions = await Questions.find({ exam_id });

  if (questions.length === 0) {
    next(
      new AppError("we could not find any questions related to this exam", 404)
    );
  }
  return res.json({
    status: "success",
    data: {
      questions,
    },
  });
});

const getAQuestionOfExam = catchAsync(async (req, res, next) => {
  const { exam_id, question_id } = req.params;

  const question = await Questions.findOne({
    exam_id: exam_id,
    _id: question_id,
  });

  return res.json({
    status: "success",
    data: {
      question,
    },
  });
});

const editQuestion = catchAsync(async (req, res, next) => {
  var form = new formidable.IncomingForm({ multiplies: true });
  var myfiles = [];

  form.on("file", (formname, file) => {
    form.emit("data", { name: "file", formname, value: file });
  });

  // If you want to customize whatever you want...
  form.on(
    "data",
    ({ name, key, value, buffer, start, end, formname, ...more }) => {
      if (name === "file") {
        myfiles.push([formname, value]);
      }
    }
  );

  form.parse(req, async function (err, fields, files) {
    if (err) {
      // next(err);
      console.log(`error while parsing form data of create question`);
      return;
    }
    const {
      title,
      answer_choices,
      correct_answer,
      difficulty,
      status,
      type,
      subject_id,
      system_id,
      points,
      exam_id,
    } = fields;
    if (
      !title ||
      !answer_choices ||
      !correct_answer ||
      !subject_id ||
      !system_id ||
      !exam_id
    ) {
      return res.json({
        success: "fail",
        message: "Please provide all values",
      });
    }
    const choices = answer_choices.split(",");

    console.log("fileds ", fields);
    console.log("file 1", myfiles[0]);
    console.log("files 2", myfiles[1]);
    console.log(req.params);
    const { question_id } = req.params;

    if (myfiles[0] !== undefined && myfiles[1] !== undefined) {
      // This is question image coding
      const getQuestionImageName = myfiles[0][1].originalFilename;
      // console.log("image name at 49", getQuestionImageName);
      const randNumberOfQuestionImage = Math.floor(Math.random() * 9999999);
      const newQuestionImageName =
        randNumberOfQuestionImage + getQuestionImageName;
      myfiles[0][1].originalFilename = newQuestionImageName;
      const newPathForQuestionImage = path.join(
        __dirname,
        `../public/images/question_answer_images` +
          "/" +
          myfiles[0][1].originalFilename
      );

      await fs.copyFile(myfiles[0][1].filepath, newPathForQuestionImage);

      const getAnswerImageName = myfiles[1][1].originalFilename;
      const randNumberOfAnswerImage = Math.floor(Math.random() * 9999999);
      const newAnswerImageName = randNumberOfAnswerImage + getAnswerImageName;
      myfiles[1][1].originalFilename = newAnswerImageName;
      const newPathForAnswerImage = path.join(
        __dirname,
        `../public/images/question_answer_images` +
          "/" +
          myfiles[1][1].originalFilename
      );
      await fs.copyFile(myfiles[1][1].filepath, newPathForAnswerImage);
    }

    if (myfiles[0] !== undefined && myfiles[1] === undefined) {
      console.log("entered in condition upper");
      if (myfiles[0][0] === "question_image") {
        console.log("uploading question_image ");
        // This is question image coding
        const getQuestionImageName = myfiles[0][1].originalFilename;
        // console.log("image name at 49", getQuestionImageName);
        const randNumberOfQuestionImage = Math.floor(Math.random() * 9999999);
        const newQuestionImageName =
          randNumberOfQuestionImage + getQuestionImageName;
        myfiles[0][1].originalFilename = newQuestionImageName;
        const newPathForQuestionImage = path.join(
          __dirname,
          `../public/images/question_answer_images` +
            "/" +
            myfiles[0][1].originalFilename
        );

        await fs.copyFile(myfiles[0][1].filepath, newPathForQuestionImage);
        console.log("uploading done question_image ");
      }
      if (myfiles[0][0] === "answer_images") {
        console.log("uploading answer_image ");
        //  Answer image
        const getAnswerImageName = myfiles[0][1].originalFilename;
        const randNumberOfAnswerImage = Math.floor(Math.random() * 9999999);
        const newAnswerImageName = randNumberOfAnswerImage + getAnswerImageName;
        myfiles[0][1].originalFilename = newAnswerImageName;
        const newPathForAnswerImage = path.join(
          __dirname,
          `../public/images/question_answer_images` +
            "/" +
            myfiles[0][1].originalFilename
        );
        await fs.copyFile(myfiles[0][1].filepath, newPathForAnswerImage);
        //console.log("image 2", myfiles[1][1]);
        console.log("uploading done answer_image ");
      }
    }

    if (myfiles[0] !== undefined && myfiles[1] !== undefined) {
      const question = await Questions.findByIdAndUpdate(question_id, {
        title,
        choices,
        correct_answer,
        difficulty,
        status,
        type,
        exam_id,
        question_image: myfiles[0][1].originalFilename,
        answer_image: myfiles[1][1].originalFilename,
        system_id,
        subject_id,
        points,
      });
    }
    console.log(
      "condition",
      myfiles[0] !== undefined && myfiles[1] === undefined
    );
    if (myfiles[0] !== undefined && myfiles[1] === undefined) {
      console.log("file 1 name", myfiles[0][0]);
      if (myfiles[0][0] === "question_image") {
        const question = await Questions.findByIdAndUpdate(question_id, {
          title,
          choices,
          correct_answer,
          difficulty,
          status,
          type,
          exam_id,
          question_image: myfiles[0][1].originalFilename,
          answer_image: fields.answer_image,
          system_id,
          subject_id,
          points,
        });
      }
      if (myfiles[0][0] === "answer_images") {
        const question = await Questions.findByIdAndUpdate(question_id, {
          title,
          choices,
          correct_answer,
          difficulty,
          status,
          type,
          exam_id,
          question_image: fields.question_image,
          answer_image: myfiles[0][1].originalFilename,
          system_id,
          subject_id,
          points,
        });
      }
    }
    if (myfiles[0] === undefined && myfiles[1] === undefined) {
      const question = await Questions.findByIdAndUpdate(question_id, {
        title,
        choices,
        correct_answer,
        difficulty,
        status,
        type,
        exam_id,
        question_image: fields.question_image,
        answer_image: fields.answer_image,
        system_id,
        subject_id,
        points,
      });
    }

    return res.json({ fields, files });
  });
});

const deleteQuestion = catchAsync(async (req, res, next) => {
  const { question_id } = req.params;
  const question = await Questions.findByIdAndDelete(question_id);
  if (!question) {
    return next(new AppError("we could not find question", 404));
  }
  return res.status(200).json({
    status: "success",
    message: "Question deleted successfully",
  });
});

module.exports = {
  createQuestion,
  getAllQuestionsOfExam,
  getAQuestionOfExam,
  editQuestion,
  deleteQuestion,
};
