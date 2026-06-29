import React, { useState, useEffect } from "react";
import { getMyUrls, deleteUrl, updateAlias, getDashboardStats, getQrCodeUrl, getQrCode } from "../Api/urlApi";
import "./Dashboard.css";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import AnalyticsCards from "../components/Dashboard/AnalyticsCards";
import UrlTable from "../components/Dashboard/UrlTable";
import CreateUrlForm from "../components/Dashboard/CreateUrlForm";
import StatisticsSection from "../components/Dashboard/StatisticsSection";
// import Navbar from "../components/Layout/Navbar";
import Sidebar from "../components/Layout/Sidebar";
import { MenuBoard } from "iconsax-react";

function Dashboard() {

  const [creatingUrl, setCreatingUrl] = useState(false);

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const [dashboardStats, setDashboardStats] = useState(null);

  const [searchTerm, setSearchTerm] = useState("");

  const [showQrCode, setShowQrCode] = useState(false);

  const [qrImageUrl, setQrImageUrl] = useState("");

  const [activeSection, setActiveSection] = useState("");

  const [myURLs, setMyURLs] = useState([]);

  const location = useLocation();

  const analyticsRef = React.useRef(null);

  const myUrlsRef = React.useRef(null);

  const overviewRef = React.useRef(null);

  useEffect(() => {

    loadMyURLs();
    loadDashboardStats();

  }, []);

  useEffect(() => {

      if (sidebarOpen) {
        document.body.style.overflow = "hidden";
      } 

      else {
        document.body.style.overflow = "";
      }

      return () => {
        document.body.style.overflow = "";
      };

  }, [sidebarOpen]);

  useEffect(() => {

      const handleEscape = (event) => {

        if (event.key === "Escape") {

            setSidebarOpen(false);

        }

      };

      window.addEventListener("keydown", handleEscape);

      return () => {

        window.removeEventListener("keydown", handleEscape);

      };

  }, []);

  useEffect(() => {

      const handleResize = () => {

          if (window.innerWidth >= 992) {

              setSidebarOpen(false);

          }

      };

      window.addEventListener("resize", handleResize);

      return () => {

          window.removeEventListener("resize", handleResize);

      };

  }, []);

  useEffect(() => {

      switch (location.hash) {

          case "#analytics":

              analyticsRef.current?.scrollIntoView({

                  behavior: "smooth",

                  block: "start"

              });

              break;

          case "#my-urls":

              myUrlsRef.current?.scrollIntoView({

                  behavior: "smooth",

                  block: "start"

              });

              break;

          default:

              break;

      }

  }, [location]);


  useEffect(() => {

    const observer = new IntersectionObserver(

        (entries) => {

            entries.forEach((entry) => {

                if (entry.isIntersecting) {

                    const sectionId = entry.target.id;

                    if(sectionId === "analytics-section" || sectionId === "my-urls-section") {

                        setActiveSection(sectionId);
                    }
                    
                    else{
                        setActiveSection("");
                    }
                    
                    const hash = `#${sectionId.replace("-section", "")}`;

                    if (window.location.hash !== hash) {

                        window.history.replaceState(
                            null,
                            "",
                            hash
                        );

                    } 
                }

            });

        },

        {

            threshold: 0.35,

        }

    );

    if (overviewRef.current) {
        observer.observe(overviewRef.current);
    }

    if (analyticsRef.current) {

        observer.observe(analyticsRef.current);

    }

    if (myUrlsRef.current) {

        observer.observe(myUrlsRef.current);

    }

    return () => {

        observer.disconnect();

    };

}, []);


  const loadDashboardStats = async () => {

    try {
      
      const response = await getDashboardStats();

      setDashboardStats(response);
    }
    catch (error) {
      console.error(error);
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
    );
  }


  return (
    
    <>

      {sidebarOpen && (<div className="sidebar-overlay" onClick={() => setSidebarOpen(false)} /> )}

        
      {!sidebarOpen && (
          <button
              className="sidebar-toggle"
              onClick={() => setSidebarOpen(true)}
              aria-label="Open Sidebar"
          >
              <MenuBoard
                  size={24}
                  variant="Bold"
                  color="currentColor"
              />
          </button>
      )}
      

      <Sidebar 
          isOpen={sidebarOpen} 
          isCollapsed={sidebarCollapsed}
          onCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
          activeSection={activeSection}
          onClose={() => setSidebarOpen(false)} 
      />


      <main className="dashboard-container">

        <section ref={overviewRef} className={`dashboard-main ${sidebarCollapsed ? 'collapsed' : ''}`} id="dashboard-section">
          
          {/* <Navbar /> */}

          <section id="analytics-section" ref={analyticsRef}>
              <AnalyticsCards dashboardStats={dashboardStats} />
          </section>

          <div className="dashboard-grid">

            <CreateUrlForm loadMyURLs={loadMyURLs} loadDashboardStats={loadDashboardStats} creatingUrl={creatingUrl} setCreatingUrl={setCreatingUrl} />
          
            <StatisticsSection creatingUrl={creatingUrl} setCreatingUrl={setCreatingUrl} />
          
          </div>

          <div id="my-urls-section" ref={myUrlsRef} className="urls-card">

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

        </section>
      </main>
    </>
  );
}

export default Dashboard;
