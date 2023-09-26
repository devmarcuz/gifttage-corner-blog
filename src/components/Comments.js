import React, { useEffect, useState } from "react";
import "../css/Comments.css";
import { addComment, getComments, getPosts } from "../firebase/firebase_routes";

const Comments = ({ display, param }) => {
  const [formBool, setFormBool] = useState(false);
  const [url, setUrl] = useState("");
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState("");
  const [postId, setPostId] = useState("");
  const [load, setLoad] = useState(false);
  const [replyingToCommentId, setReplyingToCommentId] = useState(null);
  const [replyText, setReplyText] = useState("");

  // Reset reply form when replyingToCommentId changes
  useEffect(() => {
    setReplyText("");
  }, [replyingToCommentId]);

  useEffect(() => {
    const dataTitle = param.blog.split("-").join(" ");
    console.log(dataTitle);
    getPosts()
      .then((res) => {
        setLoad(true);
        res.filter((data) => {
          if (data.title.toLowerCase() === dataTitle) {
            console.log(data.id, "getposts");
            setPostId(data.id);
          }
        });
      })
      .catch((err) => {});
  }, [param]);

  useEffect(() => {
    if (load) {
      fetchComments();
    }
  }, [load]);

  const fetchComments = async () => {
    try {
      const commentsData = await getComments(postId);
      // Organize comments into a hierarchical structure
      const organizedComments = organizeComments(commentsData);
      setComments(organizedComments);
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  const handleCommentSubmit = async (e, parentCommentId) => {
    e.preventDefault();
    if (commentText) {
      const newComment = {
        postId,
        parentCommentId, // Pass the parent comment ID for replies
        commentText,
        createdAt: new Date().toString(),
      };
      try {
        await addComment(newComment);
        setCommentText("");
        fetchComments(); // Refresh comments after adding a new comment
      } catch (error) {
        console.error("Error adding comment:", error);
      }
    }
  };

  const organizeComments = (commentsData) => {
    const organizedComments = [];

    const commentMap = new Map();

    commentsData.forEach((comment) => {
      commentMap.set(comment.id, comment);
    });

    commentsData.forEach((comment) => {
      if (comment.parentCommentId) {
        const parentComment = commentMap.get(comment.parentCommentId);
        if (parentComment) {
          parentComment.replies = parentComment.replies || [];
          parentComment.replies.push(comment);
        }
      } else {
        organizedComments.push(comment);
      }
    });

    return organizedComments;
  };

  const textArea = () => {
    setFormBool(!formBool);
  };

  return (
    <div className={`comment-container ${display && "dark-mode"}`}>
      <div className="left-section">
        <div className="head">SHARE YOUR THOUGHTS...</div>
        <div className="comment">
          <form action="" onSubmit={handleCommentSubmit}>
            <textarea
              name="textValue"
              //   value={textValue}
              id=""
              cols="30"
              rows="7"
              onClick={textArea}
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              // onClick={textArea}
              //   onChange={handleChange}
              //   className={`"text-area" ${borderError3 && "border-error"}`}
              placeholder="Enter your comment here..."
            ></textarea>
            <div className={`form ${formBool && "active"}`}>
              <p>Fill in your details below</p>
              <input
                type="text"
                className="inp"
                name="author"
                placeholder="NAME*"
                required
              />
              <input
                type="email"
                name="email"
                placeholder="EMAIL ADDRESS*"
                required
                className="inp"
              />
              <input
                type="url"
                name="website"
                placeholder="WEBSITE"
                className="inp"
              />
              <div className="input">
                <input type="checkbox" name="msg_condition" />
                <div className="content">
                  Save my name, email, and website in this browser for the next
                  time I comment.
                </div>
              </div>
              <button type="submit">Post Comment</button>
            </div>
          </form>
        </div>
      </div>
      <div className="right-section">
        <div className="comment-header">COMMENTS</div>
        <div className="comments">
          <div className="comment">
            <div className="details">
              <div className="text">
                <a href="#" className={`${url && "active"}`}>
                  Maire Boone Clark
                </a>{" "}
                . <span>February 7, 2022 at 11:28 am</span>
              </div>
            </div>
            <p>
              Thank you!!! I am going to review this and share with my circle!!!
              I hope you will share more insights. This is a critically
              important discussion ~ for clinicians, as well as lay people. The
              more educated we (patients) are, hopefully the better we can
              advocate for ourselves and our families.
            </p>
            <button>REPLY</button>
          </div>
          <div className="comment">
            <div className="details">
              <div className="text">
                <a className={`${url && "active"}`}>Maire Boone Clark</a> .{" "}
                <span>February 7, 2022 at 11:28 am</span>
              </div>
            </div>
            <p>
              Thank you!!! I am going to review this and share with my circle!!!
              I hope you will share more insights. This is a critically
              important discussion ~ for clinicians.
            </p>
            <button>REPLY</button>
          </div>
          {comments.map((comment, index) => (
            <div className="comment" key={index}>
              <div className="details">
                <div className="text">
                  <a className={`${url && "active"}`}>{comment.author}</a> .
                  <span>{comment.createdAt.toDate().toLocaleString()}</span>
                </div>
              </div>
              <p>{comment.commentText}</p>
              <button onClick={() => setReplyingToCommentId(comment.id)}>
                REPLY
              </button>
              {/* {replyingToCommentId === comment.id && (
                <form onSubmit={(e) => handleCommentSubmit(e, comment.id)}>
                  <textarea
                    name="textValue"
                    id=""
                    cols="30"
                    rows="7"
                    onClick={textArea}
                    value={commentText}
                    placeholder="Enter your comment here..."
                    onChange={(e) => setReplyText(e.target.value)}
                  />
                  <button type="submit">Reply</button>
                </form>
              )} */}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Comments;
