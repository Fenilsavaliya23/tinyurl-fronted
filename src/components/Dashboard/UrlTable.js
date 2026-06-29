import React from 'react'
import { deleteUrl, updateAlias, getQrCode } from '../../Api/urlApi';
import EditAliasModal from '../common/EditAliasModal/EditAliasModal.js';
import DeleteConfirmModal from '../common/DeleteConfirmModal/DeleteConfirmModal.js';
import ViewUrlModal from '../common/ViewUrlModal/ViewUrlModal.js';
import QrCodeModal from '../common/QrCodeModal/QrCodeModal.js';
import DataTable from '../common/DataTable/DataTable.js';
import { createUrlTableColumns } from './columns/urlTableColumns.js';
import { toast } from "react-toastify";
import { useState, useMemo } from 'react';
import { formatDate, shortenUrl } from '../../utils/formatters.js';
import { MESSAGES, TABLE_MESSAGES } from '../../utils/constants.js';
// import { BASE_URL } from "../Api/AuthApi";

const UrlTable = ({ myURLs, loadMyURLs, loadDashboardStats, showQrCode, setShowQrCode, qrImageUrl, setQrImageUrl }) => {

    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [selectedUrl, setSelectedUrl] = useState(null);

    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [deleteTarget, setDeleteTarget] = useState(null);

    const [isViewModalOpen, setIsViewModalOpen] = useState(false);
    
    const copyUrl = async (url) => {
    
        try {
            await navigator.clipboard.writeText(url);
    
            // alert("Copied Successfully");
            toast.success(MESSAGES.COPY_SUCCESS);
        }
        catch {
            // alert("Copy Failed");
            toast.error(MESSAGES.COPY_ERROR);
        }
    
    };
    

    const handleShowQr = async (shortUrl) => {

        const shortCode = shortUrl.split("/").pop();

        try{

            setSelectedUrl(shortUrl);

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
  
    }  

    const openEditModal = (url) => {
        setSelectedUrl(url);
        setIsEditModalOpen(true);
    };

    const closeEditModal = () => {
        setSelectedUrl(null);
        setIsEditModalOpen(false);
    }

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

            toast.success(MESSAGES.DELETE_SUCCESS);

            setIsDeleteModalOpen(false);

            await loadMyURLs();

            await loadDashboardStats();

        } catch (error) {

            toast.error(error.response?.data?.message || MESSAGES.NETWORK_ERROR);

        }
    };
    
    const handleUpdateAlias = async (newAlias) => {
        
        if(!newAlias) return;

        try{

            // const shortCode = selectedUrl.shortUrl.split("/").pop();

            await updateAlias(selectedUrl.shortCode, newAlias);

            //   alert("Alias updated successfully");
            toast.success(`Alias ${MESSAGES.UPDATE_SUCCESS}`);

            await loadMyURLs();

            await loadDashboardStats();

            closeEditModal();   
        }
        catch (error) {
        //   alert(error.response?.data?.message || "Failed to update alias");
            toast.error(error.response?.data?.message || MESSAGES.NETWORK_ERROR);
        }
  }

//   if(myURLs.length === 0) {
//      return (
//           <p>No URLs Created Yet.</p>
//      ) 
//   }

    const columns = createUrlTableColumns({
            handleView,
            copyUrl,
            openEditModal,
            handleShowQr,
            openDeleteModal,
            formatDate,
            shortenUrl
    });        

  return (
        
        <>
            <EditAliasModal
                isOpen={isEditModalOpen}
                onClose={closeEditModal}
                onSave={handleUpdateAlias}
                title="Edit Alias"
                initialValue={selectedUrl?.shortCode}
            />

            <DeleteConfirmModal
                isOpen={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                onConfirm={handleDeleteConfirm}
                title="Delete URL"
                message="Are you sure you want to permanently delete this URL?"
                details={[]}
                confirmText="Delete URL"
            />

            <ViewUrlModal
                isOpen={isViewModalOpen}
                onClose={() => setIsViewModalOpen(false)}
                title="URL Details"
                description="View Complete Information"
                data={[
                    { label: "Original URL: ", value: selectedUrl?.originalUrl },
                    { label: "Short URL: ", value: selectedUrl?.shortUrl },
                    { label: "Clicks: ", value: selectedUrl?.clickCount },
                    { label: "Created: ", value: selectedUrl?.createdDate ? formatDate(selectedUrl.createdDate) : "" },
                ]}
            />

            <QrCodeModal
                isOpen={showQrCode}
                onClose={() => setShowQrCode(false)}
                qrImageUrl={qrImageUrl}
                shortUrl={selectedUrl?.shortUrl}

            />

            <DataTable
                columns={columns}
                data={myURLs}
                rowKey="shortCode"
                emptyMessage={TABLE_MESSAGES.NO_URLS}
            />
        
        </>

  )
}

export default UrlTable;