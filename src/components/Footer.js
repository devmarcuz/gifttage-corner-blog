import React from "react";
import { Link } from "react-router-dom";
import {
  BiLogoFacebook,
  BiLogoTwitter,
  BiLogoInstagram,
  BiLogoYoutube,
  BiCopyright,
} from "react-icons/bi";

import "../css/Footer.css";

const Footer = ({ display }) => {
  return (
    <footer className={`${display && "dark-mode"}`}>
      <div className="container">
        <div className="left-section">
          <nav>
            <Link to="/">Home</Link>
            <Link to="/about">About</Link>
            <Link to="/contact">Contact</Link>
          </nav>
          <header>
            <h1>GIFTTAGE CORNER</h1>
            <p>RELATIONSHIP, FAITH AND LIFESTLYE BLOG</p>
          </header>
          <div className="socials">
            <Link>
              <BiLogoFacebook />
            </Link>
            <Link>
              <BiLogoInstagram />
            </Link>
            <Link>
              <BiLogoTwitter />
            </Link>
            <Link>
              <BiLogoYoutube />
            </Link>
          </div>
        </div>
        <div className="right-section">
          <p>
            <BiCopyright /> 2023 GIFT KORIE
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
