import React, { useState, useEffect } from "react";
import "../css/admin/CommentBlog.css";
import {
  addComment,
  addNotification,
  getAllComments,
  getComments,
  getPosts,
  updatePost,
} from "../firebase/firebase_routes";
import CommentItem from "./CommentItem";
import CommentInput from "./CommentInput";
import LoadingContainer from "./LoadingContainer";

const CommentsBlog = ({
  blogId,
  admin,
  setShowConforimDeleteComment,
  setCommentId,
  setIsModalOpen,
  setComments,
  comments,
  display,
}) => {
  const [commentText, setCommentText] = useState("");
  const [loading, setLoading] = useState(false);
  const [recentComment, setRecentComment] = useState(null);

  const loadComments = async () => {
    setLoading(true);
    try {
      const commentsData = await getComments(blogId, "asc");
      setComments(
        commentsData.filter((dt) => {
          if (dt.postId === blogId) {
            return dt;
          }
        })
      );
      setLoading(false);
    } catch (error) {
      console.error("Error loading comments:", error);
    }
  };

  useEffect(() => {
    loadComments();
  }, [blogId]);

  useEffect(() => {
    if (recentComment) {
      addNotification(recentComment);
    }
  }, [recentComment]);

  const onComment = async (data, parentCommentId = null) => {
    setLoading(true);
    setRecentComment(null);
    const { text, name, email } = data;
    if (text.trim() !== "") {
      try {
        const commentData = {
          postId: blogId,
          commentText: text,
          name,
          email,
          parentCommentId,
        };

        await addComment(commentData);

        // Set the recent comment for notification with createdAt
        setRecentComment({
          ...commentData,
          createdAt: new Date(),
        });

        loadComments();
        setCommentText("");
        setLoading(false);

        getAllComments().then((res) => {
          let comments = res;

          getPosts().then((res) => {
            res.forEach((dt) => {
              const getAllPostCommentLength = (id) => {
                let data = comments.filter((dt) => {
                  if (dt.postId === id) {
                    return dt;
                  }
                });
                let formData = {
                  comments: data.length,
                };
                updatePost(dt.id, formData);
              };
              getAllPostCommentLength(dt.id);
            });
          });
        });
      } catch (error) {
        console.error("Error adding comment:", error);
        setLoading(true);
      }
    }
  };

  return (
    <div className={`comment-blog-container ${display && "dark-mode"}`}>
      <h1>SHARE YOUR THOUGHTS...</h1>
      <CommentInput
        onComment={(text) => onComment(text)}
        commentText={commentText}
        setCommentText={setCommentText}
      />
      {comments.length >= 1 && (
        <div className="comments">
          {loading && <LoadingContainer newsletter={true} />}
          <h1>COMMENTS</h1>
          <div className="cmt-container">
            {comments
              .sort((obj2, obj1) => {
                const date1 = obj1.createdAt.toMillis();
                const date2 = obj2.createdAt.toMillis();

                // Compare the dates in reverse order
                if (date1 < date2) {
                  return 1; // obj1 comes after obj2
                } else if (date1 > date2) {
                  return -1; // obj1 comes before obj2
                } else {
                  return 0; // dates are equal
                }
              })
              .map((comment) => (
                <CommentItem
                  key={comment.id}
                  comment={comment}
                  loadComments={loadComments}
                  onComment={onComment}
                  admin={admin}
                  setShowConforimDeleteComment={setShowConforimDeleteComment}
                  setCommentId={setCommentId}
                  setIsModalOpen={setIsModalOpen}
                />
              ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CommentsBlog;
