import React, { useEffect } from "react";
import "./Modal.css";
import { CloseCircle } from "iconsax-react";

function Modal({
    isOpen,
    onClose,
    title,
    children,
    footer,
    width = 520, 
    height = "auto",
    showCloseButton = true,
    closeOnOverlay = true,
    className = "",
    bodyClassName = "",
    footerClassName = "",
}) {

    //   ESC KEY SUPPORT 
    useEffect(() => {

        if (!isOpen) return;

        const handleEscape = (event) => {
            if (event.key === "Escape" && isOpen) {
                onClose();
            }
        };
        
        document.addEventListener("keydown", handleEscape);

        return () => {
            document.removeEventListener("keydown", handleEscape);
        };

    },[isOpen, onClose]); 
    

    // BODY SCROLL LOCK
    useEffect(() => {

        if (!isOpen) return;

        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        
        return () => {
            document.body.style.overflow = previousOverflow;
        };

    },[isOpen]); 

    if(!isOpen) return null;

    // OVERLAY CLICK SUPPORT

    const handleOverlayClick = (event) => {
        if (closeOnOverlay && event.target === event.currentTarget) {
            onClose();
        }
    };
    
    

    return (

        <div 
            className="modal-overlay"
            onClick={handleOverlayClick}
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
        >

            <div
                className={`modal-container ${className}`}
                style={{ 
                    maxWidth: typeof width === "number" ? `${width}px` : width,
                    height: typeof height === "number" ? `${height}px` : height 
                }}
                onClick={(event) => event.stopPropagation()}
            >

                <div className="modal-header">

                    <h2 className="modal-title" id="modal-title">
                        {title}
                    </h2>

                    {showCloseButton && (
                    
                        <button
                            className="modal-close-btn"
                            onClick={onClose}
                            title="Close"
                            aria-label="Close Modal"
                            type="button"
                        >

                            <CloseCircle
                                size="24"
                                variant="Bold"
                                color="currentColor"
                            />

                        </button>
                    )}


                </div>

                <div className={`modal-body ${bodyClassName}`}>

                    {children}

                </div>

                {footer && (

                    <div className={`modal-footer ${footerClassName}`}>

                        {footer}

                    </div>

                )}

            </div>

        </div>

    );

}

export default Modal;