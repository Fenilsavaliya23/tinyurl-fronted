import ActionButton from "../../common/ActionButton/ActionButton.js";
import { Eye, Copy, Edit2, Barcode, Trash } from "iconsax-react";

export const createUrlTableColumns = ({
    handleView,
    copyUrl,
    openEditModal,
    handleShowQr,
    openDeleteModal,
    formatDate,
    shortenUrl
}) => [
    {
        header: "Original URL",
        render: (url) => (
            <span title={url.originalUrl}>
                {shortenUrl(url.originalUrl)}
            </span>
        )
    },

    {
        header: "Clicks",
        accessor: "clickCount"
    },
    
    {
        header: "Created",
        render: (url) => (
            formatDate(url.createdDate)
        )
    },

    {
        header: "Actions",
        render: (url) => (

            <div className="action-buttons">

                <ActionButton
                    variant="view"
                    tooltip="View URL"
                    onClick={() => handleView(url)}
                    icon={<Eye size="18" variant="Bold" color="currentColor" />}
                />

                <ActionButton
                    variant="copy"
                    tooltip="Copy URL"
                    onClick={() => copyUrl(url.shortUrl)}
                    icon={<Copy size="18" variant="Bold" color="currentColor" />}
                />

                <ActionButton
                    variant="edit"
                    tooltip="Edit URL"
                    onClick={() => openEditModal(url)}
                    icon={<Edit2 size="18" variant="Bold" color="currentColor" />}
                />

                <ActionButton
                    variant="qr"
                    tooltip="Show QR Code"
                    onClick={() => handleShowQr(url.shortUrl)}
                    icon={<Barcode size="18" variant="Bold" color="currentColor" />}
                />

                <ActionButton
                    variant="delete"
                    tooltip="Delete URL"
                    onClick={() => openDeleteModal(url)}
                    icon={<Trash size="18" variant="Bold" color="currentColor" />}
                />

            </div>

        )
    }
];