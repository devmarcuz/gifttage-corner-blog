import React from "react";
import "../css/loading.css";

const LoadingContainer = ({ newsletter }) => {
  return (
    <div className={`loader-container ${newsletter && "active"}`}>
      <div className="loader">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default LoadingContainer;
