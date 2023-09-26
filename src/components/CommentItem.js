import React, { useState } from "react";
import CommentInput from "./CommentInput";
import { FaTrash } from "react-icons/fa";

const CommentItem = ({
  comment,
  loadComments,
  onComment,
  admin,
  setShowConforimDeleteComment,
  setCommentId,
  setIsModalOpen,
}) => {
  const [isReplying, setIsReplying] = useState(false);
  const [replyText, setReplyText] = useState("");

  const onReply = (formData) => {
    const { text } = formData;
    if (text.trim() !== "") {
      onComment(formData, comment.id); // Pass the parent comment's ID
      setIsReplying(false);
      setReplyText("");
    }
  };

  const renderReplies = () => {
    if (comment.replies && comment.replies.length > 0) {
      return (
        <div className="replies">
          {comment.replies.map((reply) => (
            <CommentItem
              key={reply.id}
              comment={reply}
              loadComments={loadComments}
              onComment={onComment}
            />
          ))}
        </div>
      );
    }
    return null;
  };

  function timestampToDate(timestamp) {
    const date = timestamp.toDate(); // Convert Firestore Timestamp to JavaScript Date

    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    };

    return new Intl.DateTimeFormat("en-US", options).format(date);
  }

  const deleteComment = (id) => {
    setShowConforimDeleteComment(true);
    setCommentId(id);
    setIsModalOpen(true);
  };

  return (
    <div className="comment-text">
      <div className="details">
        {comment.commentText && (
          <div className="text">
            <a
              className={`${
                comment.email === "koriechinoso@gmail.com" && "admin"
              }`}
            >
              {comment.email === "koriechinoso@gmail.com"
                ? "Gifttage Corner"
                : comment.name
                ? comment.name
                : "Anonymous"}
            </a>{" "}
            . <span>{timestampToDate(comment.createdAt)}</span>
          </div>
        )}
      </div>
      <p>{comment.commentText}</p>
      {isReplying ? (
        <>
          <CommentInput
            onComment={(text) => onReply(text)}
            commentText={replyText}
            setCommentText={setReplyText}
          />
          <button onClick={() => setIsReplying(false)}>Cancel</button>
        </>
      ) : (
        <button onClick={() => setIsReplying(true)}>Reply</button>
      )}
      {renderReplies()}
      {admin && (
        <div className="del">
          <FaTrash onClick={() => deleteComment(comment.id)} />
        </div>
      )}
    </div>
  );
};

export default CommentItem;
