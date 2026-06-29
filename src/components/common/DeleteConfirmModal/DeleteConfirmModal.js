import React from "react";
import "./DeleteConfirmModal.css";
import Modal from "../Modal/Modal.js";
import { Trash } from "iconsax-react";

function DeleteConfirmModal({ 
    isOpen, onClose, onConfirm, title="Delete", message="Are you sure you want to delete this item?", 
    details=[], confirmText="Delete" }) 
{

  if (!isOpen) return null;

  return (
   
    <Modal 
        isOpen={isOpen}
        onClose={onClose}
        title={title}
        width="520px"
        footer={
            <>

                <button type="button" className="modal-cancel-btn" onClick={onClose}>Cancel</button>

                <button type="button" className="modal-danger-btn" onClick={onConfirm}>
                    {confirmText}
                </button>

            </>
        }
    >

        <div className="delete-modal">

            <div className="delete-icon-wrapper">
                <Trash size="56" color="currentColor" variant="Bulk" />
            </div>

            <p className="delete-message">{message}</p>

            {details.length > 0 && (
                <div className="delete-details">
                    
                    {details.map((item, index) => (
                        
                        <div className="delete-item" key={index}>

                            <span className="delete-label">{item.label}</span>
                            <div className="delete-value">{item.value}</div>

                        </div>

                    ))}
                
                </div>
            )}

        </div>

    </Modal>

  );
}

export default DeleteConfirmModal;