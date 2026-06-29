import React from 'react'
import { shortenUrl } from "../../Api/urlApi";
import { toast } from "react-toastify";
import { useState } from "react";
import { copyToClipboard } from "../../utils/helper";
import { Gift, CloseCircle } from "iconsax-react"

const CreateUrlForm = ({ loadMyURLs, loadDashboardStats, creatingUrl, setCreatingUrl }) => {
  
  const [longUrl, setLongUrl] = useState("");
  const [customAlias, setCustomAlias] = useState("");
  const [hoursToExpire, setHoursToExpire] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [showResult, setShowResult] = useState(false);
  
  const handleSubmit = async (e) => {
    
    e.preventDefault();
  
      if (!longUrl.trim()) {
        // alert("Please enter URL");
        toast.error("Please enter URL");
        return;
      }
  
      try {

        setCreatingUrl(true);

        const currentUser = JSON.parse(sessionStorage.getItem("currentUser"));
  
        const response = await shortenUrl({
          url: longUrl,
          
          customAlias: customAlias.trim() === "" ? null : customAlias,
  
          hoursToExpire: hoursToExpire === "" ? null : Number(hoursToExpire),
  
          userEmail: currentUser.email,
        });
  
        setShortUrl(response.shortUrl);
        setShowResult(true);
  
        await loadMyURLs();
  
        await loadDashboardStats();
  
      }
  
      catch (error) {
        console.error(error);
  
        if (error.response?.data?.message) {
          // alert(error.response.data.message);
          toast.error(error.response.data.message);
        } 
        else {
          // alert("Failed to create short URL");
          toast.error("Failed to create short URL");
        }
      }

      finally {
        setCreatingUrl(false);
      }

  };
  

  return (
    <>
    
      <form onSubmit={handleSubmit} className="create-url-form">

        <div className='form-group'>
          
            <label htmlFor="longUrl">Long URL</label>
          
            <input
                className="dashboard-input"
                type="text"
                placeholder="Enter Long URL"
                value={longUrl}
                onChange={(e) => setLongUrl(e.target.value)}
                required
                id="longUrl"
            />

        </div>    

        <div className='form-group'>
          
            <label htmlFor="customAlias">Custom Alias (Optional)</label>
          
            <input
                className="dashboard-input"
                type="text"
                placeholder="Custom Alias (Optional)"
                value={customAlias}
                onChange={(e) => setCustomAlias(e.target.value)}
                id="customAlias"
            />

        </div>

        <div className='form-group'>
          
            <label htmlFor="hoursToExpire">Expiry Hours (Optional)</label>
          
            <input
                className="dashboard-input"
                type="number"
                placeholder="Expiry Hours (Optional)"
                value={hoursToExpire}
                onChange={(e) => setHoursToExpire(e.target.value)}
                id="hoursToExpire"
            />

        </div>
          

          <button className="auth-button primary-btn create-button" type="submit" disabled={creatingUrl}>
            {creatingUrl ? "Creating..." : "Create Short URL"}
          </button>

      </form>

      {shortUrl && showResult && (
          <div className="success-banner">

              <div className="success-header">

                <div>

                    <h3>
                        <Gift size="32" color="currentColor" variant="Bold" style={{ marginRight: "10px" }} />
                        Short URL Created Successfully!
                    </h3>
                    <p>Your Link is ready to use!</p>
                  
                </div>

                <button className="close-success" type="button" onClick={() => setShowResult(false)}>
                    <CloseCircle size="24" color='currentColor' variant='bold'/>
                </button>  

              </div>

              <div className='success-link'>

                  <a href={shortUrl} target="_blank" rel="noreferrer">{shortUrl}</a>

              </div>
                  
              <div className="success-actions">
                      
                  <button 
                      className='auth-button'
                      type='button'
                      onClick={() => window.open(shortUrl, "_blank")}
                  >
                      Open
                  </button>

                  <button
                    className="auth-button primary-btn"
                    type="button"
                    onClick={() => copyToClipboard(shortUrl, "Short URL copied to clipboard successfully!")}
                  >
                      Copy URL
                  </button>
                  
              </div>
            
          </div>

        )}

    </>
  );
}

export default React.memo(CreateUrlForm);