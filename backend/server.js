const express = require("express");
const { connection } = require("./db/connection");
const userRouter = require("./routes/userRoutes");
const examRouter = require("./routes/examRoutes");
const systemRouter = require("./routes/systemRoutes");
const subjectRouter = require("./routes/subjectRoutes");
const questionRouter = require("./routes/questionRoutes");
const reportRouter = require("./routes/reportRoutes");
const helpRouter = require("./routes/helpRoutes");
const plansRouter = require("./routes/planRoutes");
const globalErrorHandler = require("./controllers/errorController");
const AppError = require("./Utils/appError");
const bodyParser = require("body-parser");
const passport = require("passport");
const passportSetup = require("./passport");
const cookieSession = require("cookie-session");
const dotenv = require("dotenv");
dotenv.config();
const morgan = require("morgan");
const cors = require("cors");
const app = express();
//app.use(
//   cors({
//     origin: ["https://medgrizz-project-frontend.vercel.app"],
//     methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
//     credentials: true,
//   })
// );
app.use(cors());
app.use(morgan("dev"));
app.use(
  cookieSession({
    name: "session",
    keys: ["cyberwolve"],
    maxAge: 24 * 60 * 60 * 1000,
  })
);
app.use(passport.initialize());
app.use(passport.authenticate("session"));

// parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// parse application/json
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// app.use(express.static(__dirname, "public"));
app.get("/", (req, res, next) => {
  return res.send("Hi from backend");
});
app.use("/medgrizz/api/v1/users", userRouter);
app.use("/medgrizz/api/v1/exams", examRouter);
app.use("/medgrizz/api/v1/systems", systemRouter);
app.use("/medgrizz/api/v1/subjects", subjectRouter);
app.use("/medgrizz/api/v1/questions", questionRouter);
app.use("/medgrizz/api/v1/reports", reportRouter);
app.use("/medgrizz/api/v1/help", helpRouter);
app.use("/medgrizz/api/v1/plans", plansRouter);
//middleware for routes not defined
app.all("*", (req, res, next) => {
  next(new AppError(`we can not find ${req.originalUrl} on this server `, 400));
});
app.use(globalErrorHandler);
const PORT = 4000;
app.listen(PORT, () => {
  connection()
    .then((res) => console.log("Mongo connection successfull"))
    .catch((err) => console.log("error while connecting with mongo", err));
  console.log(`Server running on ${PORT}`);
});
process.on("unhandledRejection", (err) => {
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
//agr koi variable declare nhi to wo kahein istmal ho rha hai to iskliye ye likha hai
// eg console.log(x)
process.on("uncaughtException", (err) => {
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
