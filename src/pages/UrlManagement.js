import React, { useEffect, useState } from "react";
import { getAllUrls, deleteAdminUrl } from "../Api/adminApi";
import DeleteConfirmModal from "../components/common/DeleteConfirmModal/DeleteConfirmModal.js";
import { toast } from "react-toastify";
import Sidebar from "../components/Layout/Sidebar";
import { createdUrlManagementTableColumns } from "../components/Dashboard/columns/urlManagementTableColumns.js";
import { formatDate } from "../utils/formatters.js";
import { TABLE_MESSAGES } from "../utils/constants.js";
import DataTable from "../components/common/DataTable/DataTable.js";
import useApi from "../hooks/useApi.js";
import "./Dashboard.css";
// import  StatusBadge  from "../components/common/StatusBadge/StatusBadge";
import {
    Link21,
    People,
    Refresh2,
    SearchNormal1,
} from "iconsax-react";

function UrlManagement() {
    // console.log("UrlManagement Rendered");

    const [urls, setUrls] = useState([]);

    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    
    const [selectedUrl, setSelectedUrl] = useState([]);

    const [loading, setLoading] = useState(true);

    const [searchTerm, setSearchTerm] = useState("");

    const [clickFilter, setClickFilter] = useState("ALL");

    useEffect(() => {
        loadUrls();
    }, []);

    const openDeleteModal = (url) => {
        console.log("Selected URL:", url);
        setSelectedUrl(url);
        setDeleteModalOpen(true);
    };

    const handleDeleteUrl = async (urlId) => {

        // const confirmDelete = window.confirm("Are you sure you want to delete this URL?");

        if(!selectedUrl) return;

        if(!urlId) {
            toast.error("Invalid URL ID");
            return;
        }

        try{
            await deleteAdminUrl(urlId);
            toast.success("URL deleted successfully");
            loadUrls();
        }
        catch(err){
            console.error("Error deleting url:", err);
            toast.error("Failed to delete URL");
        }

    }    
    
    const { execute } = useApi();

    const loadUrls = async () => {

        setLoading(true);

        try{

            const response = await execute(() => getAllUrls());
            setUrls(response);
            // setLoading(false);
        }
        catch(err){
            console.error("Error fetching urls:", err);
        }
        finally{
            setLoading(false);
        }
    };

    const columns = createdUrlManagementTableColumns({
        formatDate,
        openDeleteModal,
        handleDeleteUrl
    });

    const filteredUrls = urls.filter(url=>{

        const keyword = searchTerm.trim().toLowerCase();

        const matchesSearch =

            url.originalUrl.toLowerCase().includes(keyword)
            || url.shortUrl.toLowerCase().includes(keyword)
            || url.ownerEmail.toLowerCase().includes(keyword);

        const matchesFilter =

            clickFilter==="ALL"
            || (clickFilter==="POPULAR" && url.clickCount>=50)
            || (clickFilter==="LOW" && url.clickCount<50);

        return matchesSearch && matchesFilter;

    });

    const totalUrls = urls.length;

    const totalClicks = urls.reduce(

        (sum,url)=>sum+url.clickCount,

        0
    );

    const activeOwners =

        new Set(

            urls.map(url=>url.ownerEmail)

        ).size;

    return (

        <main className="dashboard-container">

            <Sidebar />

            <section className="dashboard-main">


                <div className="user-page-header">

                    <div className="user-header-left">

                        <div className="user-header-icon">

                            <Link21 
                                size="28"
                                color="currentColor"
                            />

                        </div>    

                        <div>

                            <h1>URL Management</h1>

                            <p>Manage every shortened URL on the platform.</p>
                        
                        </div>


                    </div>

                    <div className="user-page-badge">

                        {totalUrls} URLs

                    </div>

                </div>

                <div className="user-stat-grid">

                    <div className="user-stat-card total-card">

                        <span>Total URLs</span>

                        <h2>{totalUrls}</h2>

                        <p>Shortened links</p>

                    </div>

                    <div className="user-stat-card admin-card">

                        <span>Total Clicks</span>

                        <h2 className="click-count">{totalClicks}</h2>

                        <p>Across all URLs</p>

                    </div>

                    <div className="user-stat-card normal-card">

                        <span>Owners</span>

                        <h2>{activeOwners}</h2>

                        <p>Registered creators</p>

                    </div>

                    <div className="user-stat-card role-card">

                        <span>Average Clicks</span>

                        <h2>

                            {totalUrls ? Math.round( totalClicks/totalUrls):0}

                        </h2>

                        <p>Per shortened URL</p>

                    </div>

                </div>

                <div className="urls-card">

                    <div className="user-toolbar">

                        <SearchNormal1

                            size="18"

                            variant="Linear"

                            color="currentColor"

                        />

                        <input

                            className="user-search"

                            placeholder="Search URL..."

                            value={searchTerm}

                            onChange={

                                e=>setSearchTerm(e.target.value)

                            }

                            aria-label="Url-Search-Input"

                        />


                        <select

                            className="user-filter"

                            value={clickFilter}

                            onChange={

                                e=>setClickFilter(e.target.value)

                            }

                        >

                            <option value="ALL">

                                All URLs

                            </option>

                            <option value="POPULAR">

                                Popular

                            </option>

                            <option value="LOW">

                                Low Clicks

                            </option>

                        </select>

                        <button

                            className="user-refresh-btn"

                            onClick={loadUrls}

                            disabled={loading}

                        >
                            <Refresh2 size="20" variant="Linear" color="currentColor" />
                            Refresh

                        </button>
                    
                    </div>

                    {loading ? (

                        <div className="user-loading">

                            <div className="loading-spinner"></div>

                            <p>Loading URLs...</p>

                        </div>
                    
                    ) : !filteredUrls.length ? (

                        <div className="user-empty">

                            <People size="70" variant="Bulk" color="currentColor" />
                            
                            <h3>No URLs Found</h3>

                            <p>

                                Try changing the search or role filter.

                            </p>

                        </div>
                    
                    ) :  (

                        <div className="user-table-card">

                            <DataTable 
                                loading={loading}
                                columns={columns}
                                data={filteredUrls}
                                rowKey="urlId"
                                emptyMessage={TABLE_MESSAGES.NO_URLS_FOUND}
                            />

                        </div>

                    )}     
                       
                </div>


            </section>   

            <DeleteConfirmModal
                isOpen={deleteModalOpen}
                onClose={() => setDeleteModalOpen(false)}
                onConfirm={() => handleDeleteUrl(selectedUrl?.urlId)}
                title="Delete URL"
                message="Are you sure you want to permanently delete this URL?"
                details={[
                    {
                        label: "Original URL",
                        value: selectedUrl?.originalUrl
                    },
                    {
                        label: "Short URL",
                        value: selectedUrl?.shortUrl
                    }
                ]}
                confirmText="Delete URL"
            /> 

        </main>

    )

}

export default UrlManagement;