import React from "react";
import "../../../assets/scss/MyCustomSidebar.scss";
import { useState } from "react";
import { CiMemoPad, CiUser } from "react-icons/ci";
import { GoReport } from "react-icons/go";
import { IoHelpCircleOutline } from "react-icons/io5";
import { BsBook } from "react-icons/bs";
import { IoSettingsOutline } from "react-icons/io5";
import { CiCircleQuestion } from "react-icons/ci";
import { AiOutlineDollarCircle } from "react-icons/ai";
import { RiQuestionAnswerLine } from "react-icons/ri";
import { BiUser } from "react-icons/bi";
import { GiPriceTag } from "react-icons/gi";
import { AiOutlineArrowLeft, AiOutlineArrowDown } from "react-icons/ai";
import { FaHandsHelping } from "react-icons/fa";
import { Link, Outlet } from "react-router-dom";
import user from "../../../assets/images/user.jpg";
import { useNavigate } from "react-router-dom";
const MyCustomSidebar = () => {
  const navigate = useNavigate();
  return (
    <div className="admin-main-sidebar">
      <nav className="admin-main-sidebar__nav">
        <ul className="menu">
          <li>
            <Link to="/dashboard/exam/all">
              <CiMemoPad size="2rem" className="icon" />
              <span>Exam</span>
            </Link>
          </li>
          <li>
            <Link to="/dashboard/reports/report">
              <GiPriceTag size="2rem" className="icon" />
              <span>Report</span>
            </Link>
          </li>
          <li>
            <Link to="/dashboard/user/all">
              <BiUser size="2rem" className="icon" />
              <span>User</span>
            </Link>
          </li>
          <li>
            <Link to="/dashboard/help/help_center">
              <FaHandsHelping size="2rem" className="icon" />
              <span>Help Center</span>
            </Link>
          </li>

          <Outlet />
        </ul>
      </nav>
      <div className="user-section">
        <img src={user} alt="This is user logo" />
        <h6
          onClick={() => {
            localStorage.removeItem("user");
            localStorage.removeItem("token");
            localStorage.clear();
            navigate("/");
          }}
        >
          Logout
        </h6>
      </div>
    </div>
  );
};

export default MyCustomSidebar;
