import React, { useState, useEffect } from "react";
import Modal from "../Modal/Modal.js";
import AuthInput from "../AuthInput/AuthInput.js";
import { Edit2 } from "iconsax-react";
import { VALIDATION } from "../../../utils/constants.js";
import "./EditAliasModal.css";

function EditAliasModal({ isOpen, onClose, onSave,
    title="Edit Alias" , initialValue="" }) 
{
        
    const [alias, setAlias] = useState("");
    const [error, setError] = useState("");
    
    
    useEffect(() => {
        
        if(isOpen) {
            
            setAlias(initialValue || "");
            setError("");
        }    
        
    }, [isOpen, initialValue]);
    
    if (!isOpen) return null;

    const validateAlias = (value) => {

        const trimmedValue = value.trim();

        if(!trimmedValue) return "Alias cannot be empty.";

        if(trimmedValue.length > 30) return "Alias cannot exceed 30 characters.";


        if(!VALIDATION.ALIAS_REGEX.test(trimmedValue)) return "Alias can only contain letters, numbers, underscores(_), and hyphens(-).";

        return ""; // No error

    }
    
    const handleChange = (event) => {

        const value = event.target.value;

        setAlias(value);

        setError(validateAlias(value));

    }


    const handleSave = () => {

        const validationError = validateAlias(alias);

        if(validationError) {
            setError(validationError);
            return;
        }

        onSave(alias.trim());

    }    


    return (
        
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title={title}
            width={540}
            footer={
                <>
                    <button type="button" className="modal-cancel-btn" onClick={onClose}>Cancel</button>

                    <button type="button" className="modal-primary-btn" onClick={handleSave}>
                        Save Changes
                    </button>
                </>
            }        
        >

            <div className="edit-alias-modal">

                <div className="edit-alias-icon">
                    <Edit2 size="56" color="currentColor" variant="Bulk" />
                </div>    

                <p className="edit-alias-description">
                    Update your custom alias for this short URL.
                </p>

                <div className="edit-alias-form"> 

                    <AuthInput 
                        label="Custom Alias"
                        placeHolder="Enter your custom alias"
                        value={alias}
                        onChange={handleChange}
                    />

                    <small className="edit-alias-helper"> Allowed characters: A-Z, a-z, 0-9, "-" and "_"</small>

                    { error && (

                        <p className="edit-alias-error">{error}</p>

                    )}

                </div>

            </div>   


        </Modal> 

    );
}

export default EditAliasModal;