import React, { useState } from "react";
import "../css/Home.css";
import "../css/Contact.css";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import { HiMenuAlt2 } from "react-icons/hi";
import { FaTimes, FaSun, FaMoon } from "react-icons/fa";
import emailjs from "emailjs-com";

const Contact = ({ display, setDisplay }) => {
  const [bar, setBar] = useState(false);
  const [load, setLoad] = useState(false);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [reason, setReason] = useState("");
  const [message, setMessage] = useState("");

  const sendEmail = (e) => {
    e.preventDefault();
    setLoad(true);

    const templateParams = {
      from_email: email,
      user_name: name,
      message: message,
      reason: reason,
    };

    emailjs
      .send(
        "service_s0i71ae",
        "template_ygtd2su",
        templateParams,
        "PWPc9hpfnv5rsQGtw"
      )
      .then((response) => {
        console.log("Email sent successfully:", response);
        setEmail("");
        setName("");
        setLoad(false);
        setReason("");
        setMessage("");
      })
      .catch((error) => {
        console.error("Email sending failed:", error);
      });
  };

  const displayClick = () => {
    setDisplay(!display);

    localStorage.setItem(
      "gifttage-display-mode",
      JSON.stringify({ display: !display })
    );
  };

  return (
    <div className={`contact home ${display && "dark-mode"}`}>
      <main className="main-home">
        <header>
          <h1>GIFTTAGE CORNER</h1>
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
          <Link to="/">Home</Link>
          <Link to="/blog/relationship">Relationship</Link>
          <Link to="/blog/faith">Faith</Link>
          <Link to="/blog/lifestyle">Lifestyle</Link>
          <Link to="/blog/vlog">Youtube</Link>
          <Link to="/contact">Contact</Link>
        </nav>
        <div className="bar" onClick={() => setBar(!bar)}>
          <HiMenuAlt2 /> MENU
        </div>
        <div className="contact-header">
          <h1>CONTACT</h1>
        </div>
      </main>
      <div className="contact-section">
        <div className="left-section">
          <img src="/images/pexels-mikotoraw-photographer-3639496.jpg" alt="" />
        </div>
        <div className={`right-section ${display && "dark-mode"}`}>
          <div className="content">
            <div className="text">
              If you are a brand and you would like to collaborate, please email{" "}
              <span className="span-1">
                <a href="mailto:koriechinonso@gmail.com">
                  koriechinonso@gmail.com
                </a>
                <div className="bar"></div>
              </span>
            </div>
            <div className="text">
              If you are a blog reader, a publicist, or press, please fill out
              the contact form below or email{" "}
              <span className="span-2">
                <a href="mailto:hello@koriechinonso.com">
                  hello@koriechinonso.com
                </a>
                <div className="bar"></div>
              </span>{" "}
              and we will get back to you as quickly as possible!
            </div>
            <div className="text italic">
              * Please note that I do not allow guest posts or do-follow link
              insertions on my site.
            </div>
          </div>

          <form onSubmit={sendEmail} action="">
            <div className="contain">
              <input
                type="text"
                name="name"
                placeholder="NAME*"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <input
                type="email"
                name="email"
                placeholder="EMAIL ADDRESS*"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <input
              type="text"
              name="reason"
              placeholder="REASON FOR CONTACTING"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              required
            />
            <textarea
              name="textValue"
              id=""
              cols="30"
              rows="5"
              placeholder="Message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
            ></textarea>
            <button type="submit">SEND MESSAGE</button>
          </form>
        </div>
      </div>
      <Footer display={display} />
    </div>
  );
};

export default Contact;
