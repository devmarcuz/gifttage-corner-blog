import React, { useState } from "react";
import emailjs from "emailjs-com";
import { addNewsletter, getNewsletters } from "../firebase/firebase_routes";
import LoadingContainer from "./LoadingContainer";

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [load, setLoad] = useState(false);
  const [message, setMessage] = useState(false);

  const sendEmail = (e) => {
    e.preventDefault();
    setLoad(true);

    const templateParams = {
      to_email: email.toLowerCase(),
      user_name: name, // Add the user name here
      message: "Your custom newsletter message goes here", // Add your custom message
    };

    emailjs
      .send(
        "service_s0i71ae",
        "template_c1nn5bv",
        templateParams,
        "PWPc9hpfnv5rsQGtw"
      )
      .then((response) => {
        console.log("Email sent successfully:", response);
        getNewsletters().then((res) => {
          let data = res.map((dt) => {
            if (dt.email === email.toLowerCase()) {
              return dt.email;
            }
          });
          //   console.log(data);
          if (!data.includes(email.toLowerCase())) {
            addNewsletter({ email, name });
          }
        });
        setEmail("");
        setName("");
        setLoad(false);
        setMessage(true);
      })
      .catch((error) => {
        console.error("Email sending failed:", error);
      });
  };

  return (
    <div className="newsletter" onSubmit={sendEmail}>
      <form action="">
        {load && <LoadingContainer newsletter={true} />}
        <h1>Join the newsletter family</h1>

        {message ? (
          <p>You have successfully joined the newsletter family</p>
        ) : (
          <>
            <input
              type="text" // Change to "text" for the user's name
              placeholder="FIRST NAME"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <input
              type="email"
              placeholder="EMAIL ADDRESS"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button type="submit">subscribe</button>
          </>
        )}
      </form>
    </div>
  );
};

export default Newsletter;
