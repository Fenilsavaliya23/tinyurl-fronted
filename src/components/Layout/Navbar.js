import React from 'react'
import { useNavigate } from 'react-router-dom';

const Navbar = () => {

  const navigate = useNavigate();

  const handleLogout = () => {

    sessionStorage.removeItem("jwtToken");

    sessionStorage.removeItem("currentUser");

    navigate("/");
  };

  return (

    <div className="dashboard-navbar">
    
      <div>

        <h1>TinyURL Dashboard</h1>

        <p>Create, track and manage your shortened URLs</p>

      </div>

      <button className="auth-button" onClick={handleLogout}>
        Logout
      </button>

    </div>
  )
}

export default Navbar
