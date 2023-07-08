const nodemailer = require("nodemailer");
const { google } = require("googleapis");
const { OAuth2 } = google.auth;
const dotenv = require("dotenv");
dotenv.config();
const oauthLink = "https://developers.google.com/oauthplayground";
const {
  EMAIL,
  EMAIL_CLIENT_ID,
  EMAIL_SECRET_ID,
  EMAIL_REFRESH_TOKEN,
  EMAIL_ACCESS_TOKEN,
} = process.env;

const auth = new OAuth2(
  EMAIL_CLIENT_ID,
  EMAIL_SECRET_ID,
  EMAIL_REFRESH_TOKEN,
  oauthLink
);

const sendEmail = async (options) => {
  auth.setCredentials({
    refresh_token: EMAIL_REFRESH_TOKEN,
  });
  const accessToken = await auth.getAccessToken();
  //1) create a transporter
  //console.log(process.env.EMAIL_USERNAME, process.env.EMAIL_PASSWORD);
  const transporter = nodemailer.createTransport({
    service: "gmail",

    auth: {
      type: "OAuth2",
      user: EMAIL,
      clientId: EMAIL_CLIENT_ID,
      clientSecret: EMAIL_SECRET_ID,
      refreshToken: EMAIL_REFRESH_TOKEN,
      accessToken,
    },
    //Activate in gmail "less secure app" option
  });

  //2) Define the email option
  const mailOptions = {
    from: "MedGrizz",
    to: options.email,
    subject: options.subject,
    text: options.message,
    html: options.html,
  };
  //3) Actually send the email
  transporter.sendMail(mailOptions, (err, res) => {
    if (err) return err;
    return res;
  });
};

module.exports = sendEmail;
