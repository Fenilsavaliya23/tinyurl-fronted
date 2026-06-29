import React, { useEffect, useState } from "react";
import { getTopUsers, getTopUrls } from "../Api/adminApi";

import Sidebar from "../components/Layout/Sidebar";
import "./Dashboard.css";

import { Activity, Crown1, Profile2User, Link21 } from "iconsax-react";

function SystemAnalytics() {
    
    const [topUsers, setTopUsers] = useState([]);
    const [topUrls, setTopUrls] = useState([]);

    useEffect(() => { loadAnalytics() },[]);

    const loadAnalytics = async () => {
        
        try{
            const users = await getTopUsers();
            setTopUsers(users);

            const urls = await getTopUrls();
            setTopUrls(urls);
        }
        catch(error){
            console.error("Error fetching analytics data:", error);
        }    
    }    
    
    return(

        <main className="dashboard-container">

            <Sidebar />

            <section className="dashboard-main">

                <div className="analytics-section">

                    <div className="card-header">

                        <Activity size="32" color="currentColor" variant="Bold" />

                        <h2>System Analytics</h2>

                    </div>

                </div>

                <div className="dashboard-grid">

                    <div className="top-urls-card">

                        <div className="top-urls-header">

                            <Profile2User size="32" color="currentColor" variant="Bold" />

                            <h3>Top Users</h3>

                        </div>

                        {topUsers.map((user, index) => (
                                
                                <div key={index} className="top-url-item"> 

                                    <div className="top-url-left">

                                        <span className="top-rank">
                                            {index + 1}
                                        </span>

                                        <span>
                                            {user.username}
                                        </span>

                                    </div>    

                                    <div className="top-clicks">

                                        {user.urlCount} URLs

                                    </div>

                                </div>

                        ))}
                    
                    </div>

                    <div className="top-urls-card">

                        <div className="top-urls-header">

                            <Crown1
                                size="24"
                                color="currentColor"
                            />

                            <h3>Top URLs</h3>

                        </div>

                        {topUrls.map((url, index) => (

                            <div key={index} className="top-url-item">

                                <div className="top-url-left">

                                    <span className="top-rank">
                                        {index + 1}
                                    </span>

                                    <span>
                                        {url.shortUrl}
                                    </span>

                                </div>

                                <div className="top-clicks">
                                    {url.clickCount} clicks
                                </div>

                            </div>
                        
                        ))}

                    </div>


                </div>

            </section>


        </main>

    )

}

export default SystemAnalytics;