import StatusBadge from "../../common/StatusBadge/StatusBadge.js";
import ActionButton from "../../common/ActionButton/ActionButton.js";
import { ShieldSecurity, UserMinus, Trash } from "iconsax-react";
import { toast } from "react-toastify";

export const createUserManagementTableColumns = ({
    handleDelete,
    handlePromote,
    handleDemote,
    currentUser,
    openDeleteModal
}) => [
    {
        header: "Username",
        accessor: "username"
    },
    {
        header: "Email",
        accessor: "email"
    },
    {
        header: "Role",
        render: (user) => (
            <StatusBadge
                status={user.role}
            />
        )
    },
    {
        header: "URLs",
        accessor: "urlCount"
    },
    {
        header: "Actions",
        render: (user) => (
            <div className="action-buttons">
                
                {user.role === "USER" ? (
                                                
                    <ActionButton 
                        variant="promote"
                        tooltip="Promote User"
                        onClick={() => handlePromote(user.id)}
                        icon={<ShieldSecurity size="18" color="currentColor" />}
                    />

                )   :   (    

                    <ActionButton 
                        variant="demote"
                        tooltip="Demote Admin"
                        onClick={() => handleDemote(user.id)}
                        icon={<UserMinus size="18" color="currentColor" />}
                    />

                )}

                {currentUser.email === user.email ? (

                    <ActionButton 
                        variant="delete"
                        tooltip="Cannot delete yourself"
                        onClick={() => toast.error("You cannot delete yourself.")}
                        icon={<Trash size="18" color="currentColor" />}
                    />
                
                ) : (    

                    <ActionButton 
                        variant="delete"
                        tooltip="Delete User"
                        onClick={() => openDeleteModal(user)}
                        icon={<Trash size="18" color="currentColor" />}
                    />

                )}

            </div>
        )
    }
];