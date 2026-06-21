import React, { useState, useEffect } from "react";
import { getMyUrls, deleteUrl, updateAlias, getDashboardStats, getQrCodeUrl, getQrCode } from "../Api/urlApi";
import "./Dashboard.css";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
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

  const [creatingUrl, setCreatingUrl] = useState(false);
  const [loadingStats, setLoadingStats] = useState(false);

  const [checkCode, setCheckCode] = useState("");

  const [dashboardStats, setDashboardStats] = useState(null);

  const [searchTerm, setSearchTerm] = useState("");

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
      // alert("Failed to load dashboard statistics");
      toast.error("Failed to load dashboard statistics");
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
  
  const filterResults = (urls, searchTerm) => {
    
    if (!searchTerm) return urls;

    return urls.filter(url =>
      url.originalUrl.toLowerCase().includes(searchTerm.toLowerCase()) 
      //  || url.shortUrl.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }


  return (
    <main className="dashboard-container">

      <Sidebar />

      <section className="dashboard-main">
        
        {/* <Navbar /> */}

        <AnalyticsCards dashboardStats={dashboardStats} />

        <div className="dashboard-grid">

          <CreateUrlForm loadMyURLs={loadMyURLs} loadDashboardStats={loadDashboardStats} creatingUrl={creatingUrl} setCreatingUrl={setCreatingUrl} />
        
         <StatisticsSection creatingUrl={creatingUrl} setCreatingUrl={setCreatingUrl} />
        
        </div>

        <div className="urls-card">

            <div className="urls-header">

               <h2>My URLs</h2>

               <span className="urls-count">

                {filterResults(myURLs, searchTerm).length} {filterResults(myURLs, searchTerm).length === 1 ? "URL" : "URLs"}

               </span>

            </div>

            <div className="urls-search">

                <input type="text" placeholder="Search Urls...." 
                    className="search-input" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} 
                />

            </div>            
      
            <UrlTable
                myURLs={filterResults(myURLs, searchTerm)}
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
