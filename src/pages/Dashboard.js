import React, { useState, useEffect } from "react";
import { shortenUrl, getUrlStats, getMyUrls, deleteUrl, updateAlias, getDashboardStats, getQrCodeUrl, getQrCode } from "../Api/urlApi";
import "./Dashboard.css";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const [longUrl, setLongUrl] = useState("");
  const [customAlias, setCustomAlias] = useState("");
  const [hoursToExpire, setHoursToExpire] = useState("");

  const [shortUrl, setShortUrl] = useState("");
  const [checkCode, setCheckCode] = useState("");

  const [stats, setStats] = useState(null);

  const [dashboardStats, setDashboardStats] = useState(null);

  const [selectedQrCodeUrl, setSelectedQrCodeUrl] = useState("");

  const [showQrCode, setShowQrCode] = useState(false);

  const [qrImageUrl, setQrImageUrl] = useState("");

  const [myURLs, setMyURLs] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {

    loadMyURLs();
    loadDashboardStats();

  }, []);

  const handleLogout = () => {

    sessionStorage.removeItem("jwtToken");

    sessionStorage.removeItem("currentUser");

    navigate("/");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!longUrl.trim()) {
      alert("Please enter URL");
      return;
    }

    try {
      const currentUser = JSON.parse(sessionStorage.getItem("currentUser"));

      const response = await shortenUrl({
        url: longUrl,

        customAlias: customAlias.trim() === "" ? null : customAlias,

        hoursToExpire: hoursToExpire === "" ? null : Number(hoursToExpire),

        userEmail: currentUser.email,
      });

      setShortUrl(response.shortUrl);

      await loadMyURLs();

      await loadDashboardStats();

    } 
    
    catch (error) {
      console.error(error);

      if (error.response?.data?.message) {
        alert(error.response.data.message);
      } 
      else {
        alert("Failed to create short URL");
      }
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shortUrl);

      alert("Short URL copied");
    } 
    catch {
      alert("Copy failed");
    }
  };

  const copyUrl = async (url) => {

    try {

        await navigator.clipboard.writeText(url);

        alert("Copied Successfully");
    }
    catch {
        alert("Copy Failed");
    }

};

  const handleStats = async () => {
    try {
      const response = await getUrlStats(checkCode);

      setStats(response);
    } 
    catch (error) {
      console.error(error);

      if (error.response?.data?.message) {
        alert(error.response.data.message);
      } 
      else {
        alert("Statistics not found");
      }
    }
  };

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

  const handleShowQr = async (shortUrl) => {

    const shortCode = shortUrl.split("/").pop();

    try{
        const blob = await getQrCode(shortCode);

        const imageUrl = URL.createObjectURL(blob);

        setQrImageUrl(imageUrl);

        setShowQrCode(true);
    }
    catch(error){
        console.error(error);
        alert(error.response?.data?.message || "Failed to fetch QR code");
    }

    // setSelectedQrCodeUrl(getQrCodeUrl(shortCode));

    // setShowQrCode(true);
  
  }  


  const handleDelete = async (shortUrl) => {

    const shortCode = shortUrl.split("/").pop();

    if(!window.confirm("Are you sure you want to delete this URL?")) return;

    try {
      await deleteUrl(shortCode);

      alert("URL deleted successfully");

      await loadMyURLs();

      await loadDashboardStats();
    }
    catch (error) {
      console.error(error);
      alert(`error.response?.data?.message || "Failed to delete URL"`);
    }
  }

  const handleUpdateAlias = async (shortUrl) => {

    const shortCode = shortUrl.split("/").pop();
    
    const newAlias = prompt("Enter New Alias");

    if(!newAlias) return;

    try{

      await updateAlias(shortCode, newAlias);

      alert("Alias updated successfully");

      await loadMyURLs();

      await loadDashboardStats();
    }
    catch (error) {
      console.error(error);

      alert(error.response?.data?.message || "Failed to update alias");
    }
  }  


  return (
    <main className="dashboard-container">
      <section className="dashboard-card">
        <div className="dashboard-header">
          <h1>TinyURL Dashboard</h1>

          <p>Create, track and manage your shortened URLs</p>
        </div>

        <button className="auth-button" onClick={handleLogout} style={{ alignSelf:"flex-end" }}>
          Logout
        </button>

        <form
          onSubmit={handleSubmit}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "15px",
            marginTop: "25px",
          }}
        >
          <input
            className="dashboard-input"
            type="text"
            placeholder="Enter Long URL"
            value={longUrl}
            onChange={(e) => setLongUrl(e.target.value)}
            required
          />

          <input
            className="dashboard-input"
            type="text"
            placeholder="Custom Alias (Optional)"
            value={customAlias}
            onChange={(e) => setCustomAlias(e.target.value)}
          />

          <input
            type="number"
            className="dashboard-input"
            placeholder="Expiry Hours (Optional)"
            value={hoursToExpire}
            onChange={(e) => setHoursToExpire(e.target.value)}
          />

          <button className="auth-button" type="submit">
            Shorten URL
          </button>
        </form>

        {shortUrl && (
          <div className="result-card">
            <h3>Your Short URL</h3>

            <a href={shortUrl} target="_blank" rel="noreferrer">
              {shortUrl}
            </a>

            <div style={{ marginTop: "15px" }}>
              <button
                className="auth-button"
                type="button"
                onClick={copyToClipboard}
              >
                Copy URL
              </button>
            </div>
          </div>
        )}

        <div style={{ marginTop: "40px" }}>
          <h2>Check URL Statistics</h2>

          <input
            className="dashboard-input"
            type="text"
            placeholder="Enter Short Code"
            value={checkCode}
            onChange={(e) => setCheckCode(e.target.value)}
          />

          <div style={{ marginTop: "10px" }}>
            <button className="auth-button" type="button" onClick={handleStats}>
              Get Statistics
            </button>
          </div>
        </div>

        {stats && (
          <div className="stats-card">
            <h3>Statistics</h3>

            <p>
              <strong>Original URL:</strong> {stats.originalUrl}
            </p>

            <p>
              <strong>Short URL:</strong> {stats.shortUrl}
            </p>

            <p>
              <strong>Total Clicks:</strong> {stats.clickCount}
            </p>

            <p>
              <strong>Created Date:</strong> {stats.createdDate}
            </p>

            <p>
              <strong>Last Accessed:</strong> {stats.lastAccessedAt || "Never"}
            </p>

            <p>
              <strong>Expiration Date:</strong>{" "}
              {stats.expirationDate || "No Expiry"}
            </p>
          </div>
        )}

        <div
            className="stats-card"
            style={{ marginTop: "40px" }}
        >

        { dashboardStats && (
            <div style={{ marginBottom:"30px" }}>
                
                <h2>Analytics Dashboard</h2> 

                <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit, minmax(180px, 1fr))", gap:"20px", marginTop:"20px" ,flexWrap:"wrap" }}>

                    <div className="stats-card">
                        <h3>Total URLs</h3>
                        <h2>{dashboardStats.totalUrls}</h2>
                    </div>

                    <div className="stats-card">
                        <h3>Total Clicks</h3>
                        <h2>{dashboardStats.totalClicks}</h2>
                    </div>

                    <div className="stats-card">
                        <h3>Active URLs</h3>
                        <h2>{dashboardStats.activeUrls}</h2>
                    </div>

                    <div className="stats-card">
                        <h3>Expired URLs</h3>
                        <h2>{dashboardStats.expiredUrls}</h2>
                    </div>

                </div>

                <div className="stats-card" style={{ marginTop:"20px" }}>
                    <h3>Most Clicked URL</h3>
                    <p>{dashboardStats.mostClickedUrl || "No clicks yet"}</p>
                    <p>Clicks: {dashboardStats.mostClickedCount}</p>
                </div>
                
            </div>
        )}


        <h2>My URLs</h2>

        {
            myURLs.length === 0
            ? (
                <p>
                    No URLs Created Yet
                </p>
            ): (
                <table style={{ width:"100%", borderCollapse:"collapse" }}>

                    <thead>

                        <tr>

                            <th> Original URL </th>

                            <th> Clicks </th>

                            <th> Created </th>

                            <th> Actions </th>

                        </tr>

                    </thead>

                    <tbody>

                        { myURLs.map((url,index) => (

                            <tr key={index} >

                                <td> {url.originalUrl} </td>

                                <td> {url.clickCount} </td>

                                <td> {url.createdDate} </td>

                                <td>
                                
                                    <button onClick={() =>
                                        window.open(url.shortUrl,"_blank")}
                                    >
                                        Open
                                    </button>

                                    <button onClick={() =>
                                        copyUrl(url.shortUrl)}
                                    >
                                        Copy
                                    </button>

                                    <button onClick={() =>
                                        handleUpdateAlias(url.shortUrl)}
                                    >
                                        Edit Alias
                                    </button>

                                    <button onClick={() => 
                                        handleShowQr(url.shortUrl)}
                                    >
                                        Show QR Code
                                    </button>

                                    <button onClick={() => 
                                        handleDelete(url.shortUrl)}
                                    >
                                        Delete
                                    </button>
                                    

                                </td>

                            </tr>

                            ))
                        }

                    </tbody>

                </table>

            )
        }

        </div>

        { showQrCode && (
            <div
                style={{ 
                    position:"fixed",
                    top:0,
                    left:0,
                    width:"100%",
                    height:"100%",
                    background:
                      "rgba(0,0,0,0.6)",
                    display:"flex",
                    justifyContent:"center",
                    alignItems:"center",
                    zIndex:9999   
                }}
            >

                <div 
                    style={{
                        background:"#fff",
                        padding:"30px",
                        borderRadius:"8px",
                        textAlign:"center"
                    }}
                >
                    <h2>QR Code</h2>
                    <img src={qrImageUrl} alt="QR Code" style={{ width:"250px", height:"250px", marginTop:"20px" }} />

                    <div style={{ marginTop:"20px", display:"flex", justifyContent:"center", gap:"15px" }}>
                        
                        <a href="{qrImageUrl}" download="qr-code.png">
                            <button>
                                Download
                            </button>
                        </a>

                        <button onClick={() => setShowQrCode(false)}>
                            Close
                        </button>
                    
                    </div>
                
                </div>
            
            </div>
        
        )}

      </section>
    </main>
  );
}

export default Dashboard;
