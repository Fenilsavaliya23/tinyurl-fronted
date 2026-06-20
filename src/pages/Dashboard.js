import React, { useState, useEffect } from "react";
import { getMyUrls, deleteUrl, updateAlias, getDashboardStats, getQrCodeUrl, getQrCode } from "../Api/urlApi";
import "./Dashboard.css";
import { useNavigate } from "react-router-dom";
import AnalyticsCards from "../components/Dashboard/AnalyticsCards";
import UrlTable from "../components/Dashboard/UrlTable";
import QrModel from "../components/Dashboard/QrModel";
import CreateUrlForm from "../components/Dashboard/CreateUrlForm";
import StatisticsSection from "../components/Dashboard/StatisticsSection";
// import Navbar from "../components/Layout/Navbar";
import Sidebar from "../components/Layout/Sidebar";

function Dashboard() {
  // const [longUrl, setLongUrl] = useState("");
  // const [customAlias, setCustomAlias] = useState("");
  // const [hoursToExpire, setHoursToExpire] = useState("");

  // const [shortUrl, setShortUrl] = useState("");
  // const [selectedQrCodeUrl, setSelectedQrCodeUrl] = useState("");

  const [checkCode, setCheckCode] = useState("");

  const [dashboardStats, setDashboardStats] = useState(null);


  const [showQrCode, setShowQrCode] = useState(false);

  const [qrImageUrl, setQrImageUrl] = useState("");

  const [myURLs, setMyURLs] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {

    loadMyURLs();
    loadDashboardStats();

  }, []);


  const loadDashboardStats = async () => {

    try {
      const response = await getDashboardStats();

      setDashboardStats(response);
    }
    catch (error) {
      console.error(error);
      alert("Failed to load dashboard statistics");
    }

  } 

  const loadMyURLs = async () => {
    
    try {
      // const currentUser = JSON.parse(sessionStorage.getItem("currentUser"));

      const data = await getMyUrls();

      setMyURLs(data);
    } 
    catch (error) {
      console.error(error);
    }
  };
  


  return (
    <main className="dashboard-container">

      <Sidebar />

      <section className="dashboard-main">
        
        {/* <Navbar /> */}

        <AnalyticsCards dashboardStats={dashboardStats} />

        <div className="dashboard-grid">

          <CreateUrlForm loadMyURLs={loadMyURLs} loadDashboardStats={loadDashboardStats} />
        
         <StatisticsSection />
        
        </div>

        <div className="url-section">

            <h2>My URLs</h2>

            <UrlTable
                myURLs={myURLs}
                loadMyURLs={loadMyURLs}
                loadDashboardStats={loadDashboardStats}
                showQrCode={showQrCode}
                setShowQrCode={setShowQrCode}
                qrImageUrl={qrImageUrl}
                setQrImageUrl={setQrImageUrl}
            />
          
        </div>

        <QrModel showQrCode={showQrCode} qrImageUrl={qrImageUrl} setShowQrCode={setShowQrCode} />

      </section>
    </main>
  );
}

export default Dashboard;
