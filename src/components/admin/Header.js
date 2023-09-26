import React, { useEffect, useState } from "react";
import { HiMenuAlt2 } from "react-icons/hi";
import { FaBell, FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export const Header = ({
  barMenu,
  setBarMenu,
  searchInput,
  setSearchInput,
  notificationBool,
  notifications,
  setBarMenuResponsive,
}) => {
  const navigate = useNavigate();

  const onSearch = (e) => {
    e.preventDefault();

    if (searchInput.trim() !== "") {
    }
  };

  const handleChange = (e) => {
    setSearchInput(e.target.value);
  };

  const checkNotification = () => {
    // clearAllNotifications();
    // getAllNotification().then((res) => setNotification([...res]));
    navigate("/gifttage/blog/admin/notifications");
  };

  return (
    <div className="header-container">
      <div className="header">
        <div className="logo">
          {!barMenu && (
            <HiMenuAlt2
              className="icon-logo"
              onClick={() => setBarMenu(true)}
            />
          )}
          <HiMenuAlt2
            onClick={() => setBarMenuResponsive(true)}
            className="icon-logo-responsive"
          />
          <p>Gifttage Dashboard</p>
        </div>
        {!notificationBool && (
          <div className="search-container">
            <form action="" className="search">
              <input
                type="search"
                name="search"
                value={searchInput}
                placeholder="SEARCH"
                onChange={handleChange}
              />
              <button onClick={onSearch}>
                <FaSearch />
              </button>
            </form>
          </div>
        )}
        <div className="end">
          <div className="notifications" onClick={checkNotification}>
            <FaBell />
            {notifications.length >= 1 && (
              <div className="circle">
                <p>{notifications.length}</p>
              </div>
            )}
          </div>
          <div className="profile">
            <img src="/images/pexels-bryan-catota-3756766.jpg" alt="" />
            <p>Hi, Gift!</p>
          </div>
        </div>
      </div>
    </div>
  );
};
