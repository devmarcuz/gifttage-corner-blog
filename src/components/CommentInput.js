import React, { useEffect, useState } from "react";

const CommentInput = ({ onComment }) => {
  const [commentText, setCommentText] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [formBool, setFormBool] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("allow-comment")) {
      const data = JSON.parse(localStorage.getItem("allow-comment"));
      setEmail(data.email);
      setName(data.name);
    }
  }, []);

  const handleComment = (e) => {
    e.preventDefault();

    if (isChecked) {
      if (!localStorage.getItem("allow-comment")) {
        localStorage.setItem("allow-comment", JSON.stringify({ email, name }));
      } else {
        const data = JSON.parse(localStorage.getItem("allow-comment"));
        // if (data.email === email || data.name === name) {
        localStorage.removeItem("allow-comment");
        localStorage.setItem("allow-comment", JSON.stringify({ email, name }));
        // }
      }
    }

    const data = {
      name,
      email,
      text: commentText,
    };

    onComment(data);
    setCommentText("");
    setEmail("");
    setName("");
    setIsChecked(false);
  };

  const textArea = () => {
    setFormBool(!formBool);
  };

  const onClick = () => {
    !email ? setFormBool(true) : setFormBool(false);
  };

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  return (
    <form onSubmit={handleComment} className="text-area">
      <textarea
        value={commentText}
        onChange={(e) => setCommentText(e.target.value)}
        type="text"
        placeholder="What are your thoughts?"
        cols="30"
        rows="6"
        className="input-text"
        onClick={textArea}
        required
      />
      <div className={`form ${formBool && "active"}`}>
        <p>Fill in your details below</p>
        <input
          type="text"
          className="inp"
          name="name"
          placeholder="NAME"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="EMAIL ADDRESS* (address never made public)"
          required
          className="inp"
        />
        <div className="input">
          <input
            type="checkbox"
            name="msg_condition"
            checked={isChecked} // Bind the checked value to the state
            onChange={handleCheckboxChange} // Call the handler on change
          />
          <div className="content">
            Save my name, email, and website in this browser for the next time I
            comment.
          </div>
        </div>
      </div>
      <button onClick={onClick} type="submit">
        Comment
      </button>
    </form>
  );
};

export default CommentInput;
