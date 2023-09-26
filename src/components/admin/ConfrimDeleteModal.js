import React from "react";
import "../../css/admin/ConfirmModal.css";
import { deletePost } from "../../firebase/firebase_routes";

const ConfrimDeleteModal = ({
  message,
  onCancel,
  setTotalPosts,
  totalPosts,
  setAllPosts,
  allPosts,
  id,
  isOpen,
  setIsOpen,
}) => {
  const handleConfirm = () => {
    setIsOpen(false);
    // if (onConfirm) {
    //   onConfirm();
    deletePost(id).then((res) => {
      setTotalPosts(totalPosts.filter((post) => post.id !== id));
      setAllPosts(allPosts.filter((post) => post.id !== id));
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

export default ConfrimDeleteModal;
