import ActionButton from "../../common/ActionButton/ActionButton.js";
import { Trash, Profile2User } from "iconsax-react";

export const createdUrlManagementTableColumns = ({
   formatDate,
   openDeleteModal,
   handleDeleteUrl
}) => [
    {
        header: "Owner",
        render: (url) => (
            <div className="table-user-info">

                <Profile2User
                    size="18"
                    variant="Bold"
                    color="currentColor"
                />

                <span>

                    {url.ownerName}

                </span>

            </div>
        )
    },

    {
        header: "Email",
        accessor: "ownerEmail"
    },

    {
        header: "Short URL",
        render: (url) => (
            <a 
                href={url.shortUrl}
                target="_blank"
                rel="noopener noreferrer"
            >
                {url.shortUrl}
            </a>
        )
    },

    {
        header: "Clicks",
        accessor: "clickCount"
    },

    {
        header: "Created",
        render: (url) => (
            <span>
                {url.createdDate ? formatDate(url.createdDate) : ""}
            </span>
        )
    },

    {
        header: "Actions",
        render: (url) => (
            <div className="action-buttons">
                 <ActionButton
                    icon={<Trash size="16" color="currentColor" />}
                    onClick={() => openDeleteModal(url)}
                    tooltip="Delete URL"
                    variant="delete"
                />   
            </div>
        )
    }

]    