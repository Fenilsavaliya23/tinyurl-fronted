import React, { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom';
import StatusBadge from '../common/StatusBadge/StatusBadge';
import { isAdmin } from '../../utils/helper';
import { Home, Chart, Link21, Logout, ProfileCircle, 
  ArrowDown2, Setting3, User, ShieldSecurity, People, Activity, MenuBoard } from 'iconsax-react';

const Sidebar = ({ isOpen, onClose, isCollapsed, onCollapse, activeSection }) => {
  
    
    
    const navigate = useNavigate();
    
    const location = useLocation();
    const [showProfileMenu, setShowProfileMenu] = useState(false);
    
    const [showDashboardMenu, setShowDashboardMenu] = useState(  location.pathname === "/dashboard");

    const isDashboardPage = location.pathname === "/dashboard";

    const isAnalyticsActive = activeSection === "analytics-section";

    const isMyUrlsActive = activeSection === "my-urls-section";
    
    const currentUser = JSON.parse(sessionStorage.getItem("currentUser"));
    
    const username = currentUser?.username || "Guest";
    
    const email = currentUser?.email || "";
    
    const role = currentUser?.role || "";
    
    const isActive = (path) => {
        if (path === "/dashboard#analytics") {

            return( 
                (location.pathname === "/dashboard" && location.hash === "#analytics")
                || activeSection === "analytics-section"
            );

        }

        if (path === "/dashboard#my-urls") {

            return( 
                (location.pathname === "/dashboard" && location.hash === "#my-urls")
                || activeSection === "my-urls-section"
            );

        }

        if(path === "/dashboard"){
            return( 
                location.pathname === "/dashboard" && 
                activeSection !== "analytics-section" && activeSection !== "my-urls-section"
            );
        }

        return location.pathname === path;
    }

    
    const handleLogout = () => {
        sessionStorage.removeItem("jwtToken");

        sessionStorage.removeItem("currentUser");

        onClose();

        navigate("/");
    };  


    const handleNavigation = (path) => {

            if(path.startsWith("/dashboard#")){
                navigate(path);
                if(window.innerWidth < 992){
        
                    onClose();
        
                }
                return;
            }

            navigate(path);

            if(window.innerWidth < 992){

                onClose();
        
            }

    };
  
  return (
    
    <aside className={`sidebar ${isCollapsed ? 'collapsed' : ''}  ${isOpen ? 'open' : 'closed'}`}>

        <div className={`sidebar-top ${isCollapsed ? 'collapsed' : ''}`}>

           <button
              className="sidebar-collapse-btn"
              onClick={onCollapse}
              data-tooltip={isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
              aria-label={isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
            >
                
                <div className="sidebar-icon">     
                    <MenuBoard
                        size={isCollapsed ? 24 : 22}
                        variant="Outline"
                        color="currentColor"
                    />
                </div>    

            </button>

        </div>

        <div className={`sidebar-logo ${isCollapsed ? 'collapsed' : ''}`}>
            
            {!isCollapsed && 
                <h2>TinyURL</h2>
            }
            
        </div>

        <div className={`sidebar-profile ${isCollapsed ? 'collapsed' : ''}`} 
            onClick={() => setShowProfileMenu(!showProfileMenu)} data-tooltip="Account Menu" aria-label="Account Menu"
        >

            <div className="sidebar-icon">     
                <ProfileCircle size={isCollapsed ? 48 : 40} variant="Bold" color="currentColor" />
            </div>

            <div className="sidebar-profile-info">
                {!isCollapsed && (
                    <>
                        <h3>{username}</h3>
                        <StatusBadge status={role} />
                        <p>{email}</p>
                    </>
                )}
            </div>
            
            {!isCollapsed && (
                <div className="sidebar-icon">
                    <ArrowDown2 size="20" variant="Bold" color="currentColor" className={showProfileMenu ? "profile-arrow-rotate" : "profile-arrow"} />
                </div>
            )}

        </div>  
       
        {!isCollapsed && showProfileMenu && (

          <div className='profile-dropdown'>

              <button className='profile-dropdown-item' data-tooltip="Profile" aria-label="Profile">
                  <div className="sidebar-icon">
                      <User size={isCollapsed ? 24 : 20} variant="Bold" color="currentColor" />
                  </div>
                  <span>Profile</span>
              </button>

              <button className='profile-dropdown-item' data-tooltip="Settings" aria-label="Settings">
                  <div className="sidebar-icon">
                      <Setting3 size={isCollapsed ? 24 : 20} variant="Bold" color="currentColor" />
                  </div>
                  <span>Settings</span>
              </button>

              <button className='profile-dropdown-item' data-tooltip="Logout" aria-label="Logout" onClick={handleLogout}>
                  <div className="sidebar-icon">
                      <Logout size={isCollapsed ? 24 : 20} variant="Bold" color="currentColor" />
                  </div>
                  <span>Logout</span>
              </button>

          </div>

        
        )}

        <nav className="sidebar-menu">
          
            <div className="sidebar-dashboard-group">

                <button className={isDashboardPage ? "sidebar-item active" : "sidebar-item"} 
                    onClick={() => setShowDashboardMenu(!showDashboardMenu)} data-tooltip="Dashboard" aria-label="Dashboard"
                >
                    
                    <div className="sidebar-icon">
                        <Home size={isCollapsed ? 24 : 20} variant="Bold" color="currentColor" /> 
                    </div>

                    {!isCollapsed && ( 

                        <>
                            <span>Dashboard</span> 

                            <div style={{ marginLeft: "auto" }}>
                                <ArrowDown2
                                    size="20"
                                    className={
                                        showDashboardMenu
                                            ? "profile-arrow-rotate"
                                            : "profile-arrow"
                                    }
                                    color="currentColor"
                                />
                            </div>

                        </>
                    )}
                
                </button>

                {!isCollapsed && showDashboardMenu && (

                    <div className="sidebar-submenu">

                        <button
                            className={
                                isAnalyticsActive
                                    ? "sidebar-subitem active"
                                    : "sidebar-subitem"
                            }
                            onClick={() => handleNavigation("/dashboard#analytics")}
                            data-tooltip="Analytics" aria-label="Analytics"
                        >
                            <Chart size={isCollapsed ? 24 : 20} variant="Bold" color="currentColor" />
                            Analytics
                        </button>

                        <button
                            className={
                                isMyUrlsActive
                                    ? "sidebar-subitem active"
                                    : "sidebar-subitem"
                            }
                            onClick={() => handleNavigation("/dashboard#my-urls")}
                            data-tooltip="My URLs" aria-label="My URLs"
                        >
                            <Link21 size={isCollapsed ? 24 : 20} variant="Bold" color="currentColor" />
                            My URLs
                        </button>

                    </div>

                )}

            </div>


          {isAdmin(currentUser) && (
              <>
                    <button className={isActive("/admin") ? "sidebar-item active" : "sidebar-item"} 
                            onClick={() => handleNavigation("/admin")} data-tooltip="Admin Dashboard" aria-label="Admin Dashboard"
                    >
                        <div className="sidebar-icon">
                            <ShieldSecurity size={isCollapsed ? 24 : 20} variant="Bold" color="currentColor" />
                        </div>
                        {!isCollapsed && ( <span>Admin Dashboard</span> )}
                    </button>

                    <button className={isActive("/admin/users") ? "sidebar-item active" : "sidebar-item"} 
                        onClick={() => handleNavigation("/admin/users")} data-tooltip="User Management" aria-label="User Management"
                    >
                        <div className="sidebar-icon">
                            <People size={isCollapsed ? 24 : 20} variant="Bold" color="currentColor" />
                        </div>
                        {!isCollapsed && ( <span>User Management</span> )}
                    </button>

                    <button className={isActive("/admin/urls") ? "sidebar-item active" : "sidebar-item"} 
                        onClick={() => handleNavigation("/admin/urls")} data-tooltip="URL Management" aria-label="URL Management"
                    >
                        <div className="sidebar-icon">
                            <Link21 size={isCollapsed ? 24 : 20} variant="Bold" color="currentColor" />
                        </div>
                        {!isCollapsed && ( <span>URL Management</span> )}
                    </button>

                    <button className={isActive("/admin/analytics") ? "sidebar-item active" : "sidebar-item"} 
                        onClick={() => handleNavigation("/admin/analytics")} data-tooltip="System Analytics" aria-label="System Analytics"
                    >
                        <div className="sidebar-icon">
                            <Activity size={isCollapsed ? 24 : 20} variant="Bold" color="currentColor" />
                        </div>
                        {!isCollapsed && ( <span>System Analytics</span> )}
                    </button>

              </>    
          )}

        </nav>

        <button onClick={handleLogout} className="sidebar-logout" aria-label="Logout" data-tooltip="Logout">
        
          <div className="sidebar-icon">
            <Logout size="20" variant="Bold" color="currentColor" /> 
          </div>
        
          {!isCollapsed && ( <span>Logout</span> )}
        
        </button>

    </aside>

  );
}

export default React.memo(Sidebar)
