import React from "react";
import { FaTimes } from "react-icons/fa";
import "../css/ImageContainer.css";

const ImageContainer = ({ imgShow, setImgShow }) => {
  return (
    <div className="image-container">
      <FaTimes onClick={() => setImgShow(false)} />
      <img src="/images/pexels-bryan-catota-3756766.jpg" alt="" />
    </div>
  );
};

export default ImageContainer;
