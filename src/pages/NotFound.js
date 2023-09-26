import React, { useState } from "react";
import "../css/Home.css";
import Footer from "../components/Footer";
import NotFoundContainer from "../components/NotFoundContainer";
import Header from "../components/Header";

const NotFound = ({ display, setDisplay }) => {
  const [bar, setBar] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <div className={`home ${display && "dark-mode"}`}>
      <Header
        display={display}
        setDisplay={setDisplay}
        bar={bar}
        setBar={setBar}
        setCurrentPage={setCurrentPage}
      />

      <NotFoundContainer display={display} />

      <Footer display={display} />
    </div>
  );
};

export default NotFound;
