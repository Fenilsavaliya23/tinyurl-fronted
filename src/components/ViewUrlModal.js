import React from 'react'
import { toast } from "react-toastify";
import "./ViewUrlModal.css";

const ViewUrlModal = ({ isOpen, onClose, url }) => {

    if (!isOpen) return null;

    const copyUrl = async (url) => {
        
            try {
                await navigator.clipboard.writeText(url);
        
                // alert("Copied Successfully");
                toast.success("Copied to clipboard!");
            }
            catch {
                // alert("Copy Failed");
                toast.error("Failed to copy!");
            }
        
        };
        

    return (
        <div className="modal-overlay">

        <div className="modal-card">

                <h2>URL-Details</h2>

                <div className="modal-section">

                    <label>Original URL</label>
                    <div className="original-url-preview">
                        {url?.originalUrl}
                    </div>

                </div>

                <div className="modal-section">
                    <label>Current Short URL</label>

                    <div className="short-url-preview">
                        {url?.shortUrl}
                    </div>

                </div>

                <div className="modal-section">
                    
                    <label> Alias</label>

                    <div className="alias-preview">
                        {url?.shortCode}
                    </div>

                </div>

                <div className="modal-section">
                    <label>Total Clicks</label>
                    <div className="clicks-preview">
                        {url?.clickCount}
                    </div>
                </div>

                <div className="modal-section">
                    <label>Created Date</label>
                    <div className="created-date-preview">
                        {url?.createdDate}
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
                        className="modal-copy-btn"
                        onClick={() => copyUrl(url?.shortUrl)}
                    >
                        Copy URL
                    </button>

                    <button
                        className="modal-open-btn"
                        onClick={() => window.open(url?.originalUrl, '_blank')}
                    >
                        Open URL
                    </button>

                </div>

            </div>

        </div>
  )
}

export default ViewUrlModal
