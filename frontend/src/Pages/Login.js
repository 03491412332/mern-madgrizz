import Button from "../Components/Button";
import "../assets/scss/Login.scss";
import "../assets/scss/utils.scss";
import Logo from "../assets/images/Madgrizz_logo_blue.jpeg";
import { Link, useNavigate } from "react-router-dom";
import IconRowInput from "../Components/IconRowInput";
import UserSvg from "../Components/UserSvg";
import LockSvg from "../Components/LockSvg";
import CheckBox from "../Components/CheckBox";
import GoogleSvg from "../Components/GoogleSvg";
import MedgrizzFinalLogo from "../assets/images/medgrizz_final.jpeg";
import usePostMutation from "../Utils/usePostMutation";
import { Formik, Form, useFormik } from "formik";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";
const Login = () => {
  const navigate = useNavigate();

  const googleAuth = () => {
    console.log("login clicked");
    window.open(
      "http://localhost:4000/medgrizz/api/v1/users/google/callback",
      "_self"
    );
  };
  const MyMutation = usePostMutation();
  useEffect(() => {
    // window.location.reload(false);
  }, []);
  const notify = (message) => toast(message);
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: (values) => {
      console.log(values);
      console.log("My mutation", MyMutation);
      MyMutation.mutate(
        {
          url: "users/signin",
          values: values,
        },
        {
          onSuccess: (res) => {
            toast.warn("Logged in successfully");
            console.log("response", res);
            const token = res.data.data.token;
            const user = res.data.data.user;
            console.log("user", user);
            console.log("token", token);
            localStorage.setItem("token", token);
            localStorage.setItem("user", JSON.stringify(user));
            navigate("/dashboard/exam/all");
          },
          onError: (response) => {
            // alert("An error occured during submitting system");
            console.log("our response", response.response.data.message);
            toast.error(response.response.data.message);
          },
        }
      );
    },
  });
  return (
    <div className="login-form-design">
      <div className="login-form-design__form">
        <form onSubmit={formik.handleSubmit}>
          <div className="logo">
            <img src={MedgrizzFinalLogo} alt="this is logo" />
          </div>
          <h1 className="colors primary_heading mt-20">Have an account?</h1>

          <IconRowInput
            id="email"
            name="email"
            icon={<UserSvg className="icon" />}
            placeholder="Email"
            type="email"
            value={formik.values.email}
            handleChange={formik.handleChange}
          />
          <IconRowInput
            icon={<LockSvg className="icon" />}
            placeholder="password"
            type="password"
            id="password"
            name="password"
            value={formik.values.password}
            handleChange={formik.handleChange}
          />
          <div className="form-row">
            <Link to="">forgot password</Link>
            <div className="remember_me">
              <p>Remember me</p>
              <CheckBox />
            </div>
          </div>
          <Button
            className="w-100"
            text="Sign In"
            type="submit"
            // disable={formik.isSubmitting}
          />
          <ToastContainer />
          <div className="form-row">
            <h3>Or Sign Up With</h3>
          </div>
          <div className="logos_row">
            {/*<GoogleSvg handleClick={() => googleAuth()} />*/}
            <GoogleSvg handleClick={() => googleAuth()} />
            <img
              className="medgrizz"
              src={Logo}
              alt="This is medgrizz logo"
              // onClick={() => {
              //   toast.success("Success Notification !", {
              //     position: toast.POSITION.TOP_RIGHT,
              //   });
              // }}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
