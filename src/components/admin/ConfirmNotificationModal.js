import React, { useState } from "react";
import "../../css/admin/ConfirmModal.css";
import { useNavigate } from "react-router-dom";

const ConfirmNotificationModal = ({
  message,
  onConfirm,
  onCancel,
  isOpen,
  setIsOpen,
}) => {
  const navigate = useNavigate();

  const handleConfirm = () => {
    setIsOpen(false);
    if (onConfirm) {
      onConfirm();
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

export default ConfirmNotificationModal;
