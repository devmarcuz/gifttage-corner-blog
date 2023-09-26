import React, { useEffect, useState } from "react";
import { Header } from "./Header";
import TextEditor from "./textEditor";
import { useNavigate } from "react-router-dom";
import ConfirmDraftModal from "./ConfirmDraftModal";
import ConfirmPublishModal from "./CofirmPublishModal";
import {
  addPost,
  getAllNotification,
  getNewsletters,
} from "../../firebase/firebase_routes";
import { Timestamp } from "firebase/firestore";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import emailjs from "emailjs-com";
import Editor from "./TextEditorContainer";

const CreatePost = ({ setBarMenu, barMenu, setBarMenuResponsive }) => {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    value: "",
    draft: false,
    comments: 0,
    views: 0,
    mainHTML: "",
    category: ["lifestyle"],
    createdAt: Timestamp.now().toDate().toString(),
  });

  const [showConfirmDraft, setShowConfirmDraft] = useState(false);
  const [showConfirmPublish, setShowConfirmPublish] = useState(false);
  const [isOpen, setIsOpen] = useState(true);
  const [notifications, setNotifications] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const { title, content, createdAt, draft } = formData;

  useEffect(() => {
    getAllNotification().then((res) => {
      setNotifications(
        [...res]
          .filter((dt) => dt.commentText)
          .sort((obj1, obj2) => {
            const date1 = timestampToDate(obj1.createdAt);
            const date2 = timestampToDate(obj2.createdAt);

            // Compare the dates in reverse order
            if (date1 < date2) {
              return 1; // obj1 comes after obj2
            } else if (date1 > date2) {
              return -1; // obj1 comes before obj2
            } else {
              return 0; // dates are equal
            }
          })
      );
    });
  }, []);

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

  const navigate = useNavigate();

  function formatDateString(inputDateString) {
    const date = new Date(inputDateString);
    const options = { year: "numeric", month: "long", day: "numeric" };
    return date.toLocaleDateString(undefined, options);
  }

  const handleConfirmDraft = () => {
    setFormData({ ...formData, draft: true });
  };

  const handleConfirmPublish = () => {
    addPost(formData)
      .then(() => {
        sendEmail();
        navigate("/gifttage/blog/admin");
      })
      .catch((err) => console.log(err));
  };

  const publishArticle = () => {
    setShowConfirmPublish(true);
    setShowConfirmDraft(false);
    setIsOpen(true);
    setFormData({ ...formData, createdAt: formatDateString(createdAt) });
  };

  const sendEmail = () => {
    getNewsletters().then((res) => {
      res.forEach((dt) => {
        console.log(dt);
        if (dt.email) {
          const templateParams = {
            to_email: dt.email.toLowerCase(),
            message: "Check out the blog, a new post just got added.",
            user_name: dt.name, // Add the user name here
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
            })
            .catch((error) => {
              console.error("Email sending failed:", error);
            });
        }
      });
    });
  };

  const draftArticle = () => {
    setIsOpen(true);
    setShowConfirmDraft(true);
    setShowConfirmPublish(false);
    setFormData({
      ...formData,
      draft: true,
      createdAt: formatDateString(createdAt),
    });
  };

  return (
    <div className={`right-section-dashboard ${barMenu && "display-right"} `}>
      <Header
        setBarMenu={setBarMenu}
        barMenu={barMenu}
        setNotifications={setNotifications}
        notifications={notifications}
        setBarMenuResponsive={setBarMenuResponsive}
      />
      <div className="create-post-container">
        <div className="create-header">
          <h1>Create Article</h1>
          <h1>Preview</h1>
        </div>
        <TextEditor
          formData={formData}
          setFormData={setFormData}
          setIsLoading={setIsLoading}
        />
        {isLoading ? (
          <div className="button">
            <button className="btn-disable">Publish Article</button>
            <button className="btn-disable">Draft Article</button>
          </div>
        ) : (
          <div className="button">
            <button onClick={publishArticle}>Publish Article</button>
            <button onClick={draftArticle}>Draft Article</button>
          </div>
        )}
      </div>
      {showConfirmDraft && (
        <ConfirmDraftModal
          message="Are you sure you want to draft this article?"
          onConfirm={handleConfirmDraft}
          onCancel={() => setShowConfirmDraft(false)}
          formData={formData}
          setFormData={setFormData}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
        />
      )}
      {showConfirmPublish && (
        <ConfirmPublishModal
          message="Are you sure you want to publish this article?"
          onConfirm={handleConfirmPublish}
          onCancel={() => setShowConfirmPublish(false)}
          formData={formData}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
        />
      )}
      <ToastContainer />
    </div>
  );
};

export default CreatePost;
