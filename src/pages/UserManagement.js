import React, { useEffect, useState } from "react";
import Sidebar from "../components/Layout/Sidebar";
import DeleteConfirmModal from "../components/common/DeleteConfirmModal/DeleteConfirmModal";
import { TABLE_MESSAGES, MESSAGES } from "../utils/constants";
import { createUserManagementTableColumns } from "../components/Dashboard/columns/userManagementTableColumn";
import { toast } from "react-toastify";
import { ROLES } from "../utils/constants";
import useApi from "../hooks/useApi";
import DashboardLayout from "../components/Layout/DashboardLayout";
import "./Dashboard.css";
import DataTable from "../components/common/DataTable/DataTable";

import {
    People,
    Refresh2,
    SearchNormal1
} from "iconsax-react";

import {
    getAllUsers,
    promoteUser,
    demoteUser,
    deleteUser
} from "../Api/adminApi";

function UserManagement() {

    const [users, setUsers] = useState([]);

    const [deleteModalOpen, setDeleteModalOpen] = useState(false);

    const [selectedUser, setSelectedUser] = useState(null);

    const [searchTerm, setSearchTerm] = useState("");
    
    const [roleFilter, setRoleFilter] = useState("ALL");

    const [loading, setLoading] = useState(true);

    const [actionLoading,setActionLoading]=useState(null);

    const currentUser =
    JSON.parse(
        sessionStorage.getItem("currentUser")
    );

    // const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadUsers();
    }, []);

    const openDeleteModal = (user) => {
        setSelectedUser(user);
        setDeleteModalOpen(true);
    };

    const handlePromote = async (userId) => {

        try{
            setActionLoading(userId);
            await promoteUser(userId);
            loadUsers();
            toast.success("User promoted to admin successfully");
            setActionLoading(null);
        }
        catch(err){
            console.error("Error promoting user:", err);
            toast.error("Failed to promote user");
        }
    }
    
    const handleDemote = async (userId) => {

        try{
            setActionLoading(userId);
            await demoteUser(userId);
            loadUsers();
            toast.success("Admin demoted to user successfully")
            setActionLoading(null);
        }
        catch(err){
            console.error("Error demoting user:", err);
            toast.error("Failed to demote Admin")
        }

    }
    
    const handleDelete = async (userId) => {

        // const confirmDelete = window.confirm("Are you sure you want to delete this user?");

        if(!selectedUser) return; 
            
        try {
            setActionLoading(userId);
            await deleteUser(userId);

            toast.success(`User ${MESSAGES.DELETE_SUCCESS}`);

            loadUsers();

            setActionLoading(null);
        
        } 
        catch (error) {
            
            toast.error("Error deleting user.");
        }
        finally{
            setDeleteModalOpen(false);
            setSelectedUser(null);
        } 
    }    
    
    const { execute } = useApi();

    const loadUsers = async () => {

        setLoading(true);

        try{

            const response = await execute(() => getAllUsers());
            setUsers(response);
           
        }
        catch(err){
            console.error("Error fetching users:", err);
        }
        finally{
            setLoading(false);
        }
    };
    

    const columns = createUserManagementTableColumns({
        handleDelete,
        handlePromote,
        handleDemote,
        currentUser,
        openDeleteModal
    });

    const totalUsers = users.length;

    const adminCount = users.filter(
        user => user.role === ROLES.ADMIN
    ).length;

    const normalUserCount = users.filter(
        user => user.role === ROLES.USER
    ).length;

    
    const filteredUsers = users.filter(user => {

        const keyword = searchTerm.trim().toLowerCase();

        const matchesSearch =
            user.username
                .toLowerCase()
                .includes(keyword) ||

            user.email
                .toLowerCase()
                .includes(keyword);

        const matchesRole =
            roleFilter === "ALL" ||
            user.role === roleFilter;

        return matchesSearch && matchesRole;

    });

    return (

       <DashboardLayout>

                <div className="user-page-header">

                    <div className="user-header-left">

                        <div className="user-header-icon">

                            <People size="34" variant="Bold" color="currentColor" />

                        </div>

                        <div>
                        
                            <h1>User Management</h1>
                            <p>Manage all registered users, roles and permissions.</p>

                        </div>

                    </div>

                    <div className="user-page-badge">{totalUsers} Users</div>

                </div>    

                <div className="user-stat-grid">

                    <div className="user-stat-card total-card">

                        <span>Total Users</span>

                        <h2>{totalUsers}</h2>

                        <p>All registered accounts</p>

                    </div>

                    <div className="user-stat-card admin-card">

                        <span>Admins</span>

                        <h2>{adminCount}</h2>

                        <p>Users with admin access</p>

                    </div>

                    <div className="user-stat-card normal-card">

                        <span>Users</span>

                        <h2>{normalUserCount}</h2>

                        <p>Regular platform users</p>

                    </div>

                    <div className="user-stat-card role-card">

                        <span>Your Role</span>

                        <h2>{currentUser.role}</h2>

                        <p>Access level of current account</p>

                    </div>

                </div>

                <div className="urls-card">

                    <div className="user-toolbar">

                        <SearchNormal1 size="20" variant="Linear" color="currentColor" />

                        <input

                            className="user-search"

                            placeholder="Search users..."

                            value={searchTerm}

                            onChange={(e) => setSearchTerm(e.target.value)}

                            aria-label="Search users"

                        />

                        <select

                            className="user-filter"

                            value={roleFilter}

                            onChange={(e) => setRoleFilter(e.target.value)}

                            aria-label="Filter users by role"

                        >

                            <option value="ALL">All</option>

                            <option value="ADMIN">Admins</option>

                            <option value="USER">Users</option>

                        </select>

                        <button

                            className="user-refresh-btn"

                            onClick={loadUsers}

                            disabled={loading}

                            title="Reload Users"

                        >
                            <Refresh2 size="20" variant="Linear" color="currentColor" />
                            Refresh

                        </button>

                    </div>
                    
                    {loading ? (
                       
                       <div className="user-loading">

                            <div className="loading-spinner"></div>

                            <p>Loading users...</p>

                        </div>

                    ) : filteredUsers.length === 0 ? (

                        <div className="user-empty">

                            <People size="70" variant="Bulk" color="currentColor" />

                            <h3>No Users Found</h3>

                            <p>

                                Try changing the search or role filter.

                            </p>

                        </div>

                    ) : (

                        <div className="user-table-card">

                            <DataTable 
                                columns={columns}
                                data={filteredUsers}
                                rowKey="id"
                                emptyMessage={TABLE_MESSAGES.NO_USERS}
                            />

                        </div>    
                    
                    )}

                </div>
  

            <DeleteConfirmModal
                isOpen={deleteModalOpen}
                onClose={() => setDeleteModalOpen(false)}
                onConfirm={() => handleDelete(selectedUser.id)}
                title="Delete User"
                message="Are you sure you want to permanently delete this user?"
                details={[
                    {

                        label:"Username",

                        value:selectedUser?.username

                    },

                    {

                        label:"Email",

                        value:selectedUser?.email

                    },

                    {

                        label:"Role",

                        value:selectedUser?.role

                    }
                ]}
                confirmText="Delete User"
            />        

                    
        </DashboardLayout>

    )

}

export default UserManagement;