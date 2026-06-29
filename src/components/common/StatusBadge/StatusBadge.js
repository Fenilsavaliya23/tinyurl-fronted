import React from "react";

import "./StatusBadge.css";

function StatusBadge({
    status = "",
    label,
    icon,
    size = "medium",
    className = "" }) 
{

    const normalizedStatus = String(status)
        .trim()
        .toUpperCase();

    const statusClassMap = {

        ADMIN: "status-admin",

        USER: "status-user",

        ACTIVE: "status-active",

        INACTIVE: "status-inactive",

        EXPIRED: "status-expired",

        SUCCESS: "status-success",

        ERROR: "status-error",

        WARNING: "status-warning",

        INFO: "status-info"

    };

    const badgeClass = statusClassMap[normalizedStatus] || "status-default";

    const displayText = label || normalizedStatus || "-";

    return (

        <span
            className={`
                status-badge
                status-${size}
                ${badgeClass}
                ${className}
            `}
            title={displayText}
        >

            { icon && <span className="status-icon">{icon}</span> }

            <span>{displayText}</span>

        </span>

    );

}

export default React.memo(StatusBadge);