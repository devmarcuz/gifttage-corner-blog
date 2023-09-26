import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import "../scss/Dashboard.css";
import LeftDashboardSection from "../components/LeftDashboardSection";
import RightSectionDashboard from "../components/RightSectionDashboard";
import { useNavigate } from "react-router-dom";

const Dashboard = ({ totalPosts, setTotalPosts }) => {
  const [bar, setBar] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("lendsqr_data")) {
      navigate("/login");
    }
  }, [navigate]);

  return (
    <div className="dashboard-container">
      <Header setBar={setBar} bar={bar} />
      <div className="main-container">
        <LeftDashboardSection bar={bar} />
        <RightSectionDashboard
          totalPosts={totalPosts && totalPosts}
          setTotalPosts={setTotalPosts}
        />
      </div>
    </div>
  );
};

export default Dashboard;
