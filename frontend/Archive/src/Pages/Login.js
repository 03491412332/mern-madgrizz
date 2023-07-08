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
const Login = () => {
  const navigate = useNavigate();
  const handleLogin = () => {
    navigate("/dashboard/exam/all");
  };
  const googleAuth = () => {
    console.log("login clicked");
    window.open(
      "http://localhost:4000/medgrizz/api/v1/users/google/callback",
      "_self"
    );
  };
  const { mutate } = usePostMutation();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: (values) => {
      console.log(values);
      mutate(
        {
          url: "users/signin",
          values: values,
        },
        {
          onSuccess: (res) => {
            alert("Login successfully");
            console.log("response", res);
            navigate("/dashboard/exam/all");
          },
          onError: (response) => {
            alert("An error occured during submitting system");
            console.log(response);
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
          <Button className="w-100" text="Sign In" type="submit" />
          <div className="form-row">
            <h3>Or Sign Up With</h3>
          </div>
          <div className="logos_row">
            {/*<GoogleSvg handleClick={() => googleAuth()} />*/}
            <GoogleSvg handleClick={() => googleAuth()} />
            <img className="medgrizz" src={Logo} alt="This is medgrizz logo" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
