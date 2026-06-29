import React from 'react'
import { toast } from "react-toastify";
import "./ViewUrlModal.css";
import Modal from "../Modal/Modal.js";
import { Link21 } from "iconsax-react";
import { copyToClipboard } from "../../../utils/helper.js";

const ViewUrlModal = ({ isOpen, onClose, title="Details", description="View Complete Information", data=[] }) => {

    if (!isOpen) return null;
        
    return (
       
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title={title}
            width={620}
            footer={
                <>
                    <button type="button" className="modal-cancel-btn" onClick={onClose}>Close</button>
                    <button type="button" className="modal-copy-btn" 
                            onClick={() => copyToClipboard(data.shortUrl || "", "URL copied to clipboard successfully!")}
                    >
                        Copy URL
                    </button>
                        
                </>
            }
        >

            <div className="view-modal">

                <div className="view-icon">
                    <Link21 size="72" color="currentColor" variant="Bulk" />
                </div>

                <p className="view-description">{description}</p>

                {data.length > 0 && (

                    <div className="view-grid">

                        {data.map((item, index) => (

                            <div className="view-card" key={index}>

                                <span className="view-label">{item.label}</span>
                                <span className="view-value" title={String(item.value || "-")}>
                                    {item.value || "-"}
                                </span>

                            </div>    

                        ))}    

                    </div>
                )}

            </div>

        </Modal>


    )
}

export default ViewUrlModal
