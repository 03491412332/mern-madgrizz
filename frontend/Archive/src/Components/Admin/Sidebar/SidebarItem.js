import React from "react";
import { FaApple } from "react-icons/fa";
import "./SidebarItem.scss";
const SidebarItem = () => {
  return (
    <li className="sidebar-item">
      <FaApple className="sidebar-item__icon" />
      <a className="sidebar-item__text" href="#">
        This is text
      </a>
    </li>
  );
};

export default SidebarItem;
