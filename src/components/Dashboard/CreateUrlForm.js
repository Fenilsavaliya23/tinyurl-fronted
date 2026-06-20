import React from 'react'
import { shortenUrl } from "../../Api/urlApi";
import { useState } from "react";


const CreateUrlForm = ({ loadMyURLs, loadDashboardStats }) => {
  
  const [longUrl, setLongUrl] = useState("");
  const [customAlias, setCustomAlias] = useState("");
  const [hoursToExpire, setHoursToExpire] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  
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

  return (
    <>
    
      <form onSubmit={handleSubmit} className="create-url-form">

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

            <a href={shortUrl} target="_blank" rel="noreferrer">{shortUrl}</a>

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

    </>
  );
}

export default CreateUrlForm
