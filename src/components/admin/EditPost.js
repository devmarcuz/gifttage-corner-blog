import React, { useEffect, useState } from "react";
import { Header } from "./Header";
import { useNavigate, useParams } from "react-router-dom";
import ConfirmDraftModal from "./ConfirmDraftModal";
import ConfirmPublishModal from "./CofirmPublishModal";
import {
  addPost,
  getAllNotification,
  getPosts,
  updatePost,
} from "../../firebase/firebase_routes";
import { Timestamp } from "firebase/firestore";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TextEditEditor from "./textEditEditor";
import LoadingContainer from "../LoadingContainer";

const EditPost = ({ setBarMenu, barMenu }) => {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    value: "",
    draft: false,
    comments: 0,
    views: 2,
    mainHTML: "",
    category: ["lifestyle"],
  });
  const [load, setLoad] = useState(false);
  const [showConfirmDraft, setShowConfirmDraft] = useState(false);
  const [showConfirmPublish, setShowConfirmPublish] = useState(false);
  const [isOpen, setIsOpen] = useState(true);
  const [update, setUpdate] = useState(false);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    setLoad(true);
    getPosts()
      .then(() => setLoad(false))
      .catch(() => setLoad(false));
  }, []);

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

  const params = useParams();

  const navigate = useNavigate();

  const handleConfirmDraft = () => {
    setFormData({ ...formData, draft: true });
  };

  const handleConfirmPublish = () => {
    navigate("/gifttage/blog/admin");
  };

  const publishArticle = () => {
    setShowConfirmPublish(true);
    setShowConfirmDraft(false);
    setIsOpen(true);
    setFormData({ ...formData });
    setUpdate(true);
  };

  const draftArticle = () => {
    setUpdate(true);
    setIsOpen(true);
    setShowConfirmDraft(true);
    setShowConfirmPublish(false);
    setFormData({
      ...formData,
      draft: true,
    });
  };

  return (
    <div className={`right-section-dashboard ${barMenu && "display-right"} `}>
      <Header
        setBarMenu={setBarMenu}
        barMenu={barMenu}
        setNotifications={setNotifications}
        notifications={notifications}
      />
      {load ? (
        <LoadingContainer />
      ) : (
        <div className="create-post-container">
          <div className="create-header">
            <h1>Edit Article</h1>
            <h1>Preview</h1>
          </div>
          <TextEditEditor
            formData={formData}
            setFormData={setFormData}
            paramId={params.id}
          />
          <div className="button">
            <button onClick={publishArticle}>Update Article</button>
            <button onClick={draftArticle}>Draft Article</button>
          </div>
        </div>
      )}
      {showConfirmDraft && (
        <ConfirmDraftModal
          message="Are you sure you want to draft this article?"
          onConfirm={handleConfirmDraft}
          onCancel={() => setShowConfirmDraft(false)}
          formData={formData}
          setFormData={setFormData}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          update={update}
          paramId={params.id}
        />
      )}
      {showConfirmPublish && (
        <ConfirmPublishModal
          message="Are you sure you want to update this article?"
          onConfirm={handleConfirmPublish}
          onCancel={() => setShowConfirmPublish(false)}
          formData={formData}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          update={update}
          paramId={params.id}
        />
      )}
      <ToastContainer />
    </div>
  );
};

export default EditPost;
