import React from "react";
import SidebarItem from "./SidebarItem";
import "./Sidebar.scss";

const Sidebar = () => {
  return (
    <nav className="sidebar">
      <ul>
        <li>
          <a href="">Menu 1</a>
        </li>
        <li>
          <a href="">Menu 2</a>
        </li>
        <li>
          <a href="">Menu 3</a>
        </li>
        <li>
          Show menu
          <ul>
            <li>
              <a href="">Sub menu</a>
            </li>
            <li>
              <a href=""></a>Sub menu
            </li>
            <li>
              <a href=""></a>Sub menu
            </li>
            <li>
              <a href=""></a>sub menu
            </li>
          </ul>
        </li>
        <li>
          <a href="">Menu 5</a>
        </li>
        <li>
          <a href="">Menu 6</a>
        </li>
      </ul>
    </nav>
  );
};

export default Sidebar;
