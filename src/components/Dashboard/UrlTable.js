import React from 'react'
import { deleteUrl, updateAlias, getQrCode } from '../../Api/urlApi';
import EditAliasModal from '../EditAliasModal';
import DeleteConfirmModal from '../DeleteConfirmModal';
import ViewUrlModal from '../ViewUrlModal';
import { Eye, Copy, Edit2, Barcode, Trash } from "iconsax-react";
import { toast } from "react-toastify";
import { useState } from 'react';
// import { BASE_URL } from "../Api/AuthApi";

const UrlTable = ({ myURLs, loadMyURLs, loadDashboardStats, showQrCode, setShowQrCode, qrImageUrl, setQrImageUrl }) => {

    // const [myURLs, setMyURLs] = useState([]);
    // const [showQrCode, setShowQrCode] = useState(false);
    // const [qrImageUrl, setQrImageUrl] = useState("");

    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [selectedUrl, setSelectedUrl] = useState(null);

    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [deleteTarget, setDeleteTarget] = useState(null);

    const [isViewModalOpen, setIsViewModalOpen] = useState(false);
    
    const copyUrl = async (url) => {
    
        try {
            await navigator.clipboard.writeText(url);
    
            // alert("Copied Successfully");
            toast.success("Copied to clipboard!");
        }
        catch {
            // alert("Copy Failed");
            toast.error("Failed to copy!");
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
            // alert(error.response?.data?.message || "Failed to fetch QR code");
            toast.error(error.response?.data?.message || "Failed to fetch QR code");
        }

        // setSelectedQrCodeUrl(getQrCodeUrl(shortCode));

        // setShowQrCode(true);
  
  }  


//   const handleDelete = async (shortUrl) => {

//     // const shortCode = shortUrl.split("/").pop();

//     if(!window.confirm("Are you sure you want to delete this URL?")) return;

//     try {
//         await deleteUrl(selectedUrl.shortCode);

//         toast.success("URL deleted successfully");

//         await loadMyURLs();

//         await loadDashboardStats();
//     }
//     catch (error) {
//       console.error(error);
//     //   alert(`error.response?.data?.message || "Failed to delete URL"`);
//         toast.error(error.response?.data?.message || "Failed to delete URL");
//     }
//   }

    const openEditModal = (url) => {
        setSelectedUrl(url);
        setIsEditModalOpen(true);
    };

    const openDeleteModal = (url) => {
        setDeleteTarget(url);
        setIsDeleteModalOpen(true);
    };

    const handleView = (url) => {

        setSelectedUrl(url);

        setIsViewModalOpen(true);
    };

    const handleDeleteConfirm = async () => {

        try {

            await deleteUrl(deleteTarget.shortCode);

            toast.success("URL deleted successfully");

            setIsDeleteModalOpen(false);

            await loadMyURLs();

            await loadDashboardStats();

        } catch (error) {

            console.error(error);

            toast.error(error.response?.data?.message || "Failed to delete URL");

        }
    };
    
    const handleUpdateAlias = async (newAlias) => {
        
        console.log("Selected URL =", selectedUrl);
        console.log("Short Code =", selectedUrl?.shortCode);
        
      if(!newAlias.trim()) return;

        // const shortCode = shortUrl.split("/").pop();
        
        // const newAlias = prompt("Enter New Alias");


        try{

            // const shortCode = selectedUrl.shortUrl.split("/").pop();

            await updateAlias(selectedUrl.shortCode, newAlias);

            setIsEditModalOpen(false);

            //   alert("Alias updated successfully");
                toast.success("Alias updated successfully");

            await loadMyURLs();

            await loadDashboardStats();
        }
        catch (error) {
        console.error(error);

        //   alert(error.response?.data?.message || "Failed to update alias");
            toast.error(error.response?.data?.message || "Failed to update alias");
        }
  }

//   if(myURLs.length === 0) {
//      return (
//           <p>No URLs Created Yet.</p>
//      ) 
//   }

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return " " + date.toLocaleTimeString("en-IN", 
            { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true, timeZone: 'Asia/Kolkata', day: "numeric", month: "short", year:"numeric" });
  }

  const shortenUrl = (url) => {
    if(url.length > 60){
        return url.substring(0, 60);
    }
    return url;
  }
  
  return (

      <table className='url-table'>
          
          <EditAliasModal
              isOpen={isEditModalOpen}
              onClose={() => setIsEditModalOpen(false)}
              onSave={handleUpdateAlias}
              currentAlias={selectedUrl?.shortCode}
              shortUrl={selectedUrl?.shortUrl}
              originalURL={selectedUrl?.originalUrl}
          />

          <DeleteConfirmModal
            isOpen={isDeleteModalOpen}
            onClose={() => setIsDeleteModalOpen(false)}
            onConfirm={handleDeleteConfirm}
            originalUrl={deleteTarget?.originalUrl}
            shortUrl={deleteTarget?.shortUrl}
        />

        <ViewUrlModal
            isOpen={isViewModalOpen}
            onClose={() => setIsViewModalOpen(false)}
            url={selectedUrl}
        />

          <thead>

              <tr>

                <th>Original Url</th>

                <th>Clicks</th>

                <th>Created</th>

                <th>Actions</th>

              </tr>

          </thead>

          <tbody>

              {myURLs.length===0 ? (

                    <tr>

                    <td colSpan="4" className="no-urls">No URLs Found</td>

                    </tr>

                ) : ( myURLs.map((url) => (

                    <tr key={url.shortUrl} >

                        <td title={url.originalUrl}> {shortenUrl(url.originalUrl)} </td>

                        <td> {url.clickCount} </td>

                        <td> {formatDate(url.createdDate)} </td>

                        <td>

                                <div className='action-buttons'>
                                    
                                    <button className="action-btn open-btn" onClick={() => handleView(url) }>
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
                                        openEditModal(url)}
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
                                        openDeleteModal(url)}
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

                )))
              }

          </tbody>

      </table>


  )
}

export default UrlTable;