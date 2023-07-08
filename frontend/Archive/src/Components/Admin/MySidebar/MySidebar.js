import React from "react";
import "./MySidebar.scss";
import { useState } from "react";
import { CiMemoPad, CiUser } from "react-icons/ci";
import { GoReport } from "react-icons/go";
import { IoHelpCircleOutline } from "react-icons/io5";
import { AiOutlineArrowLeft } from "react-icons/ai";
const MySidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClickBtn = (e) => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <header class="main-head">
        <nav class="head-nav">
          <ul class="menu">
            <li>
              <a href="#">
                <CiMemoPad size="large" />
                <span>Exam</span>
              </a>
            </li>
            <li>
              <button class="dropdown-btn" onClick={handleClickBtn}>
                <GoReport size="md" />
                <>
                  <div className="dropdown-btn__wrapper">
                    <h4>Drop</h4>
                    <AiOutlineArrowLeft />
                  </div>
                </>
              </button>
              <div
                class={
                  isOpen ? "dropdown-container show" : "dropdown-container"
                }
              >
                <a href="#">Link 1</a>
                <a href="#">Link 2</a>
                <a href="#">Link 3</a>
              </div>
            </li>
            <li>
              <a href="#">
                <CiUser size="large" />
                <span>User</span>
              </a>
            </li>
            <li>
              <a href="#">
                <IoHelpCircleOutline size="large" />
                <span>Help Center</span>
              </a>
            </li>
            <li>
              <a href="#">
                <GoReport size="large" />
                <span>Report</span>
              </a>
            </li>
          </ul>
        </nav>
      </header>

      <div class="wrap-all-the-things"></div>
    </div>
  );
};

export default MySidebar;
