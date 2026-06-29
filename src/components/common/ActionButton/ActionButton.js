import React from "react";

import "./ActionButton.css";

function ActionButton({

    variant = "primary",

    icon,

    tooltip = "",

    size = "medium",

    fullWidth = false,

    disabled = false,

    loading = false,

    className = "",

    onClick,

    type = "button"

}) {

    return (

        <button

            type={type}

            className={`
                action-btn
                action-${variant}
                action-${size}
                ${fullWidth ? "action-full-width" : ""}
                ${className}
            `}

            onClick={onClick}

            disabled={disabled || loading}

            title={tooltip}

            aria-label={tooltip || variant}

        >

            { loading ? <span className="action-loader"></span> : icon}

        </button>

    );

}

export default React.memo(ActionButton);