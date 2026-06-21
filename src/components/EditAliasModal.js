import React, { useState, useEffect } from "react";
import "./EditAliasModal.css";

function EditAliasModal({ isOpen, onClose, onSave, currentAlias, shortUrl, originalURL }) {

  const [alias, setAlias] = useState("");

  useEffect(() => {
    setAlias(currentAlias || "");
  }, [currentAlias]);

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">

      <div className="modal-card">

            <h2>Edit Alias</h2>

            <div className="modal-section">

                <label>Original URL</label>
                <div className="original-url-preview">
                    {originalURL}
                </div>

            </div>

            <div className="modal-section">
                <label>Current Short URL</label>

                <div className="short-url-preview">
                    {shortUrl}
                </div>

            </div>

            <div className="modal-section">
                
                <label>New Alias</label>

                <input
                    type="text"
                    value={alias}
                    onChange={(e) => setAlias(e.target.value)}
                    placeholder="Enter new alias"
                />
            </div>

            <div className="modal-actions">

                <button
                    className="modal-cancel-btn"
                    onClick={onClose}
                >
                    Cancel
                </button>

                <button
                    className="modal-save-btn"
                    onClick={() => onSave(alias)}
                >
                    Update Alias
                </button>

            </div>

        </div>

    </div>
  );
}

export default EditAliasModal;