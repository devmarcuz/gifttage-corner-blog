import React, { useEffect, useState } from "react";
import LeftSectionDashboard from "../../components/admin/LeftSectionDashboard";
import RightSectionDashboard from "../../components/admin/RightSectionDashboard";
import "../../css/admin/BlogAdmin.css";
import { useNavigate } from "react-router-dom";

const Analytics = () => {
  const [barMenu, setBarMenu] = useState(true);
  const [barMenuResponsive, setBarMenuResponsive] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const userData = getItemWithExpiration("user");
    if (!userData) {
      navigate("/gifttage/blog/admin/login");
    }
  }, []);

  function getItemWithExpiration(key) {
    const storedItem = localStorage.getItem(key);
    if (!storedItem) {
      return null; // Item does not exist
    }

    const parsedItem = JSON.parse(storedItem);
    const now = new Date().getTime();

    if (now >= parsedItem.expirationTime) {
      localStorage.removeItem(key); // Remove the expired item
      return null; // Item has expired
    }

    return parsedItem.value; // Return the item's value
  }

  return (
    <div className="blog-admin-container">
      <div className="admin-container">
        <LeftSectionDashboard
          setBarMenu={setBarMenu}
          barMenu={barMenu}
          setBarMenuResponsive={setBarMenuResponsive}
          barMenuResponsive={barMenuResponsive}
        />
        <h1>Comming soon</h1>
      </div>
    </div>
  );
};

export default Analytics;
