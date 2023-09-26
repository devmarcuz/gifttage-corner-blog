import React from "react";
import { AiFillFile, AiOutlineBarChart } from "react-icons/ai";
import { BiSolidDashboard, BiLogOut } from "react-icons/bi";
import { BsFileEarmarkFontFill } from "react-icons/bs";
import { FaBell, FaChevronLeft } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";

const LeftSectionDashboard = ({
  setBarMenu,
  barMenu,
  setBarMenuResponsive,
  barMenuResponsive,
}) => {
  const location = useLocation();
  return (
    <div
      className={`left-section-dashboard ${barMenu && "display-left"} ${
        barMenuResponsive && "display-responsive"
      }`}
    >
      <div className="icon-menu" onClick={() => setBarMenu(false)}>
        <FaChevronLeft />
      </div>
      <div
        className="icon-menu-responsive"
        onClick={() => setBarMenuResponsive(false)}
      >
        <FaChevronLeft />
      </div>
      <div className="left-header">
        <h1>Gifttage Corners</h1>
      </div>
      <div className="action-link">
        <Link
          to="/gifttage/blog/admin"
          className={`${
            location.pathname === "/gifttage/blog/admin" && "active"
          }`}
        >
          <BiSolidDashboard />
          <p>Dashboard</p>
        </Link>
        <Link
          to="/gifttage/blog/admin/create-blog"
          className={` ${
            location.pathname === "/gifttage/blog/admin/create-blog" && "active"
          }`}
        >
          <BsFileEarmarkFontFill />
          <p>Create Post</p>
        </Link>
        <Link
          to="/gifttage/blog/admin/drafted-blogs"
          className={`${
            location.pathname === "/gifttage/blog/admin/drafted-blogs" &&
            "active"
          }`}
        >
          <AiFillFile />
          <p>Drafted Posts</p>
        </Link>
        <Link
          to="/gifttage/blog/admin/analytics"
          className={`${
            location.pathname === "/gifttage/blog/admin/analytics" && "active"
          }`}
        >
          <AiOutlineBarChart />
          {/* per months view on each  */}
          <p>Analytics</p>
        </Link>
        <Link
          to="/gifttage/blog/admin/notifications"
          className={`${
            location.pathname === "/gifttage/blog/admin/notifications" &&
            "active"
          }`}
        >
          <FaBell />
          <p>Notifications</p>
        </Link>
        <Link
          to="/gifttage/blog/admin/login"
          className="logout"
          onClick={() => localStorage.removeItem("user")}
        >
          <BiLogOut />
          <p>Logout</p>
        </Link>
      </div>
    </div>
  );
};

export default LeftSectionDashboard;
