import React, { useEffect, useState } from "react";
import LeftSectionDashboard from "../../components/admin/LeftSectionDashboard";
import "../../css/admin/CreateBlog.css";
import EditPost from "../../components/admin/EditPost";
import { useNavigate } from "react-router-dom";

const EditBlog = () => {
  const [barMenu, setBarMenu] = useState(true);

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
        <LeftSectionDashboard setBarMenu={setBarMenu} barMenu={barMenu} />
        <EditPost setBarMenu={setBarMenu} barMenu={barMenu} />
      </div>
    </div>
  );
};

export default EditBlog;
