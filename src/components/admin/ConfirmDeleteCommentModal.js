import React from "react";
import "../../css/admin/ConfirmModal.css";
import {
  deleteComments,
  deletePost,
  getAllComments,
  getPosts,
  updatePost,
} from "../../firebase/firebase_routes";

const ConfirmDeleteCommentModal = ({
  message,
  onCancel,
  id,
  isOpen,
  setIsOpen,
  setComments,
  comments,
}) => {
  const handleConfirm = () => {
    setIsOpen(false);
    // if (onConfirm) {
    //   onConfirm();
    deleteComments(id).then((res) => {
      setComments(comments.filter((post) => post.id !== id));
      getAllComments().then((res) => {
        let commentss = res;

        getPosts().then((res) => {
          res.forEach((dt) => {
            const getAllPostCommentLength = (id) => {
              let data = commentss.filter((dt) => {
                if (dt.postId === id) {
                  return dt;
                }
              });
              let formData = {
                comments: data.length,
              };
              console.log(formData);
              updatePost(dt.id, formData);
            };
            getAllPostCommentLength(dt.id);
          });
        });
      });
    });
    // }
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

export default ConfirmDeleteCommentModal;
