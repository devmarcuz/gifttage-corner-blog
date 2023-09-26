import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { HiMenuAlt2 } from "react-icons/hi";
import { FaTimes, FaMoon, FaSun } from "react-icons/fa";

const Header = ({ display, setDisplay, bar, setBar, setCurrentPage }) => {
  const navigate = useNavigate();

  const displayClick = () => {
    setDisplay(!display);

    localStorage.setItem(
      "gifttage-display-mode",
      JSON.stringify({ display: !display })
    );
  };

  return (
    <main className="main-home">
      <header>
        <h1 onClick={() => navigate("/")}>GIFTTAGE CORNER</h1>
        <p>RELATIONSHIP, FAITH AND LIFESTLYE BLOG</p>
      </header>
      <div onClick={displayClick} className="display-mode">
        {display ? <FaSun className="sun" /> : <FaMoon />}
      </div>
      <nav className={`${bar && "nav-animate"}`}>
        <div className="menu">
          <div></div>
          <p>MENU</p>
          <FaTimes onClick={() => setBar(!bar)} />
        </div>
        <Link to="/" onClick={() => setCurrentPage(1)}>
          Home
        </Link>
        <Link onClick={() => setCurrentPage(1)} to="/blog/relationship">
          Relationship
        </Link>
        <Link onClick={() => setCurrentPage(1)} to="/blog/faith">
          Faith
        </Link>
        <Link onClick={() => setCurrentPage(1)} to="/blog/lifestyle">
          Lifestyle
        </Link>
        <Link onClick={() => setCurrentPage(1)} to="/blog/vlog">
          Youtube
        </Link>
        <Link onClick={() => setCurrentPage(1)} to="/contact">
          Contact
        </Link>
      </nav>
      <div className="bar" onClick={() => setBar(!bar)}>
        <HiMenuAlt2 /> MENU
      </div>
    </main>
  );
};

export default Header;
