import React from "react";
import { toast } from "react-toastify";
import "../../css/admin/ConfirmModal.css";
import { getPosts, updatePost } from "../../firebase/firebase_routes";

const ConfirmPublishModal = ({
  message,
  onConfirm,
  onCancel,
  formData,
  isOpen,
  setIsOpen,
  update,
  paramId,
}) => {
  const notify = (msg) =>
    toast.error(msg, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      style: {
        backgroundColor: "#000000",
        color: "#fff",
        border: "1px solid #444",
      },
    });

  const handleConfirm = () => {
    setIsOpen(false);
    const { title, value, category } = formData;
    console.log(formData, "dd");

    if (onConfirm) {
      if (!title) {
        notify("Add article title");
      } else if (!value) {
        notify("Add article content");
      } else if (category.length < 1) {
        notify("Pick a category");
      } else {
        if (!update) {
          getPosts().then((res) => {
            if (
              res.filter((dt) => dt.title.toLowerCase() === title.toLowerCase())
                .length < 1
            ) {
              onConfirm();
            } else {
              notify("Article title already exist");
            }
          });
        } else {
          console.log(paramId);
          getPosts().then((res) => {
            const existingPost = res.find((dt) => dt.id === paramId);

            if (!existingPost) {
              // Handle the case when the post doesn't exist
              // You can choose to create it or show an error message
              return;
            }

            // Check if the title has changed
            if (title.toLowerCase() === existingPost.title.toLowerCase()) {
              // If the title remains the same, update the post
              updatePost(paramId, formData).then((res) => {
                onConfirm();
              });
            } else {
              // Check if the new title exists among other posts
              const isTitleExist = res.some(
                (dt) => dt.title.toLowerCase() === title.toLowerCase()
              );

              if (!isTitleExist) {
                // If the new title is unique, update the post
                updatePost(paramId, formData).then((res) => {
                  onConfirm();
                });
              } else {
                // If the new title already exists, show a notification
                notify("Article title already exists");
              }
            }
          });
        }
      }
    }
  };

  const handleCancel = () => {
    setIsOpen(false);
    if (onCancel) {
      onCancel();
    }
  };

  return (
    <div className={`confirm-modal ${isOpen ? "open" : "closed"}`}>
      <div className="confirm-content">
        <p>{message}</p>
        <button onClick={handleConfirm}>OK</button>
        <button onClick={handleCancel}>Cancel</button>
      </div>
    </div>
  );
};

export default ConfirmPublishModal;
