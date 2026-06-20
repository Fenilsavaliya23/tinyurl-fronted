import React from 'react'
import { useNavigate } from 'react-router-dom';

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
          
          <button>Dashboard</button>

          <button>Analytics</button>

          <button>My URLs</button>

        </nav>

        <button onClick={handleLogout} className="sidebar-logout">Logout</button>

    </aside>

  );
}

export default Sidebar
