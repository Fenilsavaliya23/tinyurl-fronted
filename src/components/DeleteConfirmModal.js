import React from "react";
import "./DeleteConfirmModal.css";
import { Trash } from "iconsax-react";

function DeleteConfirmModal({ isOpen, onClose, onConfirm, originalUrl, shortUrl }) {

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">

        <div className="delete-modal-card">

                <div className="delete-icon">
                    <Trash size="32"  variant="Bold" color="currentColor"/>
                </div>

                <h2>Delete URL</h2>

                <p className="delete-message">
                Are you sure you want to permanently delete this URL?
                </p>

                <div className="delete-details">

                    <label>Original URL</label>

                    <div className="delete-preview">
                        {originalUrl}
                    </div>

                    <label>Short URL</label>

                    <div className="delete-preview">
                        {shortUrl}
                    </div>

                </div>

                <div className="modal-actions">

                    <button
                        className="modal-cancel-btn"
                        onClick={onClose}
                    >
                        Cancel
                    </button>

                    <button
                        className="delete-confirm-btn"
                        onClick={onConfirm}
                    >
                        Delete URL
                    </button>

                </div>

        </div>

    </div>
  );
}

export default DeleteConfirmModal;