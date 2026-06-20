import React from 'react'
import { deleteUrl, updateAlias, getQrCode } from '../../Api/urlApi';
import { Eye, Copy, Edit2, Barcode, Trash } from "iconsax-react";
// import { useState } from 'react';

const UrlTable = ({ myURLs, loadMyURLs, loadDashboardStats, showQrCode, setShowQrCode, qrImageUrl, setQrImageUrl }) => {

    // const [myURLs, setMyURLs] = useState([]);
    // const [showQrCode, setShowQrCode] = useState(false);
    // const [qrImageUrl, setQrImageUrl] = useState("");

    const copyUrl = async (url) => {
    
        try {
            await navigator.clipboard.writeText(url);
    
            alert("Copied Successfully");
        }
        catch {
            alert("Copy Failed");
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

  if(myURLs.length === 0) {
     return (
          <p>No URLs Created Yet.</p>
     ) 
  }
  
  return (

      <table className='url-table'>

          <thead>

              <tr>

                <th>Original Url</th>

                <th>Clicks</th>

                <th>Created</th>

                <th>Actions</th>

              </tr>

          </thead>

          <tbody>

              { myURLs.map((url) => (

                  <tr key={url.shortUrl} >

                      <td> {url.originalUrl} </td>

                      <td> {url.clickCount} </td>

                      <td> {url.createdDate} </td>

                      <td>

                            <div className='action-buttons'>
                                
                                <button className="action-btn open-btn" onClick={() =>
                                    window.open(url.shortUrl,"_blank")}
                                >
                                    <Eye
                                        size="18"
                                        variant="Bold"
                                        color="currentColor"
                                    />
                                </button>

                                <button className="action-btn copy-btn" onClick={() =>
                                    copyUrl(url.shortUrl)}
                                >
                                    <Copy
                                        size="18"
                                        variant="Bold"
                                        color="currentColor"
                                    />
                                </button>

                                <button className="action-btn edit-btn" onClick={() =>
                                    handleUpdateAlias(url.shortUrl)}
                                >
                                    <Edit2
                                        size="18"
                                        variant="Bold"
                                        color="currentColor"
                                    />
                                </button>

                                <button className="action-btn qr-btn" onClick={() => 
                                    handleShowQr(url.shortUrl)}
                                >
                                    <Barcode
                                        size="18"
                                        variant="Bold"
                                        color="currentColor"
                                    />
                                </button>

                                <button className="action-btn delete-btn" onClick={() => 
                                    handleDelete(url.shortUrl)}
                                >
                                    <Trash
                                        size="18"
                                        variant="Bold"
                                        color="currentColor"
                                    />
                                </button>

                            </div>

                      </td>

                  </tr>

                ))
              }

          </tbody>

      </table>
  )
}

export default UrlTable;