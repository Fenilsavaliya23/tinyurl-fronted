import React from 'react'
import { useState } from 'react';
import { getUrlStats } from "../../Api/urlApi";
import { toast } from "react-toastify";
// import "./StatisticsSection.css";

function StatisticsSection({ creatingUrl, setCreatingUrl }) {

    const [checkCode, setCheckCode] = useState("");
    const [stats, setStats] = useState(null);

    const handleStats = async () => {
        try {
            setCreatingUrl(true);

            const response = await getUrlStats(checkCode);
        
            setStats(response);
        } 
        catch (error) {
            console.error(error);
        
            if (error.response?.data?.message) {
                // alert(error.response.data.message);
                toast.error(error.response.data.message);
            } 
            else {
                // alert("Statistics not found");
                toast.error("Statistics not found");
            }
        }
        finally {
            setCreatingUrl(false);
        }
    };

    return (

        <>

            <div className="statistics-section">

                <h2>Check URL Statistics</h2>

                <input
                    className="dashboard-input"
                    type="text"
                    placeholder="Enter Short Code"
                    value={checkCode}
                    onChange={(e) => setCheckCode(e.target.value)}
                />

                <div className="statistics-button">

                    <button className="auth-button primary-btn" type="button" onClick={handleStats} disabled={creatingUrl}>
                        {creatingUrl ? "Fetching..." : "Get Statistics"}
                    </button>

                </div>

            </div>

            {stats && (

                <div className="stats-card">

                    <h3>Statistics</h3>

                    <p> <strong> Original URL: </strong>{" "}{stats.originalUrl} </p>

                    <p> <strong> Short URL: </strong>{" "}{stats.shortUrl} </p>

                    <p> <strong> Total Clicks: </strong>{" "}{stats.clickCount} </p>

                    <p> <strong> Created Date: </strong>{" "}{stats.createdDate} </p>

                    <p> <strong> Last Accessed: </strong>{" "}{stats.lastAccessedAt || "Never"} </p>

                    <p> <strong> Expiration Date: </strong>{" "}{stats.expirationDate || "No Expiry"} </p>

                </div>

                )

            }

        </>

    );
}

export default StatisticsSection;