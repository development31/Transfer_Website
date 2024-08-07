import React, { useEffect } from "react";
import "./Modal.scss";

const Modal = ({ isOpen, onClose, onSubmit, children }) => {
  useEffect(() => {
    if (isOpen) {
      // Add a class to the body to prevent background scrolling
      document.body.style.overflow = 'hidden';
    } else {
      // Remove the class from the body to allow background scrolling
      document.body.style.overflow = 'auto';
    }

    // Clean up the effect by removing the class when the component unmounts
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
      <div className="modal-close" onClick={onClose}>
          &times;
        </div>
        <div className="modal-body">{children}</div>
        <button className="modal-submit" onClick={onSubmit}>
          Submit
        </button>
      </div>
    </div>
  );
};

export default Modal;
