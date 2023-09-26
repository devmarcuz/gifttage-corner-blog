import React, { useEffect, useState } from "react";
import { Header } from "./Header";
import {
  clearAllNotifications,
  getAllNotification,
  getPosts,
} from "../../firebase/firebase_routes";
import { Link } from "react-router-dom";
import "../../css/admin/Notification.css";
import ConfirmNotificationModal from "./ConfirmNotificationModal";
import LoadingContainer from "../LoadingContainer";
import { TbBellRingingFilled } from "react-icons/tb";

const NotificationDashboard = ({
  setBarMenu,
  barMenu,
  setBarMenuResponsive,
}) => {
  const [searchInput, setSearchInput] = useState("");
  const [notifications, setNotifications] = useState([]);
  const [showNotificationModal, setShowNotificationModal] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
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
      setIsLoading(false);
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

  const checkNotification = () => {
    clearAllNotifications();
    setNotifications([]);
  };

  return (
    <div
      className={`right-section-dashboard ${
        barMenu && "display-right"
      } notification-section`}
    >
      <Header
        setBarMenu={setBarMenu}
        barMenu={barMenu}
        setSearchInput={setSearchInput}
        searchInput={searchInput}
        notificationBool={true}
        setNotifications={setNotifications}
        notifications={notifications}
        setBarMenuResponsive={setBarMenuResponsive}
      />
      <div className="notification-container">
        <div className="container-header">
          <h1>All Notifications</h1>
          <button
            onClick={() => {
              setIsModalOpen(true);
              setShowNotificationModal(true);
            }}
          >
            Clear Notifications
          </button>
        </div>
        {isLoading ? (
          <LoadingContainer />
        ) : notifications.length >= 1 ? (
          <div className="container">
            {notifications
              .filter((dt) => dt.email)
              .map((noti, index) => (
                <Notification
                  noti={noti}
                  key={index}
                  index={index}
                  getPosts={getPosts}
                />
              ))}
          </div>
        ) : (
          <div className="no-notificatoion">
            <TbBellRingingFilled />
            <h1>No Notification Here</h1>
          </div>
        )}
        {}
        {showNotificationModal && (
          <ConfirmNotificationModal
            message="Are you sure you want to clear your notifications?"
            onCancel={() => setShowNotificationModal(false)}
            isOpen={isModalOpen}
            setIsOpen={setIsModalOpen}
            onConfirm={checkNotification}
          />
        )}
      </div>
    </div>
  );
};

export const Notification = ({ noti, getPosts }) => {
  const [blog, setBlog] = useState();

  useState(() => {
    if (noti) {
      let id = noti.postId;
      if (id) {
        getPosts().then((res) => {
          let data = res.filter((dt) => dt.title).filter((dt) => dt.id === id);
          setBlog(data[0].title.toUpperCase());
        });
      }
    }
  }, [noti]);

  return (
    <div className="notification">
      <p>
        <span>{noti.name}</span> commented on {blog} article
      </p>
      <Link to={`/${blog?.toLowerCase()}`} target="_blank">
        View Comment{" "}
      </Link>
    </div>
  );
};

export default NotificationDashboard;
