import React from 'react'
import { useNavigate } from 'react-router-dom';
import { Home, Chart, Link21, Logout } from 'iconsax-react';

const Sidebar = () => {
  
   const navigate = useNavigate();

   const handleLogout = () => {

    sessionStorage.removeItem("jwtToken");

    sessionStorage.removeItem("currentUser");

    navigate("/");
  };
  
  return (
    
    <aside className='sidebar'>

        <div className="sidebar-logo">
            
          <h2>TinyURL</h2>
          
          <p>URL shortener</p>
        
        </div>

        <nav className="sidebar-menu">
          
          <button className="sidebar-item active">
            
            <Home size="20" variant="Bold" color="currentColor" /> 
            
            <span>Dashboard</span>
            
          </button>

          <button className="sidebar-item">
            
            <Chart size="20" variant="Bold" color="currentColor" /> 
            
            <span>Analytics</span>
          
          </button>

          <button className="sidebar-item">
          
            <Link21 size="20" variant="Bold" color="currentColor" /> 
          
            <span>My URLs</span>
          
          </button>

        </nav>

        <button onClick={handleLogout} className="sidebar-logout">
        
          <Logout size="20" variant="Bold" color="currentColor" /> 
        
          <span>Logout</span>
        
        </button>

    </aside>

  );
}

export default Sidebar
