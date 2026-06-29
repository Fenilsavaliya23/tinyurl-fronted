import React, { useState, useEffect } from 'react';
import { getAdminDashboard, getAllUsers } from '../Api/adminApi';
import { isAdmin } from '../utils/helper';
import Sidebar from "../components/Layout/Sidebar"
import "./Dashboard.css"

import {
  Profile2User,
  Link21,
  MouseCircle,
  ShieldSecurity,
  Activity,
} from "iconsax-react";

function AdminDashboard() {

    const [stats, setStats] = useState(null);

    const [users, setUsers] = useState([]);

    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => { loadDashboard(); loadUsers(); } , []);

    const loadDashboard = async () => {
        
        setIsLoading(true);

        try {
            const data = await getAdminDashboard();
            // console.log("ADMIN DATA =", data);
            setStats(data);
        }   
        catch (error) {
            console.error("Error fetching dashboard data:", error.response?.data || error.message);
        }
        finally{
            setIsLoading(false);
        }
    };     
    
    const loadUsers = async () => {

        try {

            const data = await getAllUsers();

            setUsers(data);
            
        }
        catch (error) {
            
            console.error(error);
            
        }

    };

    if(!stats && isLoading){ 
        
        return (
            <div className="user-loading">

                <div className="loading-spinner"></div>

                <p>Loading dashboard...</p>

            </div>
        )

    }

    if(!stats && !isLoading){
         
        return(
            <div className="user-empty">

                <Activity
                    size="70"
                    variant="Bulk"
                    color="currentColor"
                />

                <h3>No Statistics Available</h3>

                <p>Dashboard statistics will appear here.</p>

            </div>
        )
    }     

    return(

        <main className="dashboard-container">
            
            <Sidebar />

            <section className="dashboard-main">

                <div className="user-page-header">
               
                    <div className="user-header-left">

                        <div className="user-header-icon">

                            <ShieldSecurity
                                size="34"
                                variant="Bulk"
                                color="currentColor"
                            />

                        </div>

                        <div>

                            <h1>Admin Dashboard</h1>

                            <p>

                                Monitor platform activity, users, URLs and system performance.

                            </p>

                        </div>

                    </div>

                    <div className="user-page-badge">

                        Platform Overview

                    </div>

                </div>    

                <div className="user-stat-grid">

                    <div className="user-stat-card total-card">
                        
                        <div className="card-header">
                            
                            <Profile2User size="24" color="currentColor" />
                            
                            <h3>Total Users</h3>

                        </div>

                        <h2>{stats.totalUsers}</h2>

                        <p>Registered accounts</p>

                    </div>

                    <div className="user-stat-card admin-card">
                        
                        <div className="card-header">
                            
                            <Link21 size="24" color="currentColor" />
                            
                            <h3>Total URLs</h3>
                        
                        </div>

                        <h2>{stats.totalUrls}</h2>

                        <p>Shortened links</p>
                    
                    </div>

                    <div className="user-stat-card normal-card">

                        <div className="card-header">

                            <MouseCircle size="24" color="currentColor" />

                            <h3>Total Clicks</h3>

                        </div>

                        <h2>{stats.totalClicks}</h2>

                        <p>Platform Redirect</p>

                    </div>

                    <div className="user-stat-card role-card">

                        <div className="card-header">

                            <ShieldSecurity size="24" color="currentColor" />

                            <h3>Admins</h3>

                        </div>

                        <h2>{ users.filter(isAdmin).length }</h2>

                        <p>Platform Managers</p>

                    </div>

                </div>

                <div className="dashboard-grid">

                    <div className="top-urls-card">

                        <h3>Platform Summary</h3>


                        <div className="statistics-row">

                            <span>Users</span>

                            <strong>{stats.totalUsers}</strong>

                        </div>

                        <div className="statistics-row">

                            <span>URLs</span>

                            <strong>{stats.totalUrls}</strong>

                        </div>

                        <div className="statistics-row">

                            <span>Total Clicks</span>

                            <strong>{stats.totalClicks}</strong>

                        </div>

                        <div className="statistics-row">

                            <span>Average Clicks</span>

                            <strong>{stats.averageClicks}</strong>

                        </div>

                    </div>

                    <div className="top-urls-card">

                            <h3>Recent Activity</h3>

                            <div className="statistics-row">

                                <span>Newest User</span>

                                <strong>{stats.latestUser}</strong>

                            </div>

                            <div className="statistics-row">

                                <span>Newest URL</span>

                                <strong>{stats.latestUrl}</strong>

                            </div>

                            <div className="statistics-row">

                                <span>Top Creator</span>

                                <strong>{stats.topUser}</strong>

                            </div>

                            <div className="statistics-row">

                                <span>Top URL</span>

                                <strong>{stats.topUrl}</strong>

                            </div>

                    </div>        

                </div>

            </section>

        </main>        

    ) 

}    

export default AdminDashboard;