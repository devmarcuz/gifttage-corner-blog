import React, { useState } from "react";
import "../../css/admin/ConfirmModal.css";
import { getPosts, updatePost } from "../../firebase/firebase_routes";

const COnfirmDraftPostModal = ({
  message,
  onCancel,
  setTotalPosts,
  totalPosts,
  setAllPosts,
  id,
  isOpen,
  setIsOpen,
  allPosts,
  draftUrl,
  setCurrentPosts,
  indexOfFirstPost,
  indexOfLastPost,
  mainDraftPost,
}) => {
  const handleConfirm = () => {
    setIsOpen(false);
    getPosts().then((dt) => {
      allPosts.filter((post) => {
        if (post.id === id) {
          const data = {
            draft: !post.draft,
          };
          updatePost(id, data).then(() => {
            setTotalPosts(totalPosts.filter((post) => post.id !== id));
            getPosts().then((ress) => {
              setAllPosts([...ress]);
            });
            if (draftUrl) {
              getPosts().then((res) => {
                setCurrentPosts([
                  ...(mainDraftPost &&
                    mainDraftPost.slice(indexOfFirstPost, indexOfLastPost)),
                ]);
              });
            }
          });
        }
      });
    });
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

export default COnfirmDraftPostModal;
