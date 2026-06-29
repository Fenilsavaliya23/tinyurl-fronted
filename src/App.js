import { useEffect, useState, Suspense, lazy } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Moon, Sun1 } from "iconsax-react";
import "./App.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ForgotPassword from "./pages/ForgotPassword";
import Welcome from "./pages/Welcome";
import PageLoader from "./components/common/PageLoader/PageLoader";

import SystemAnalytics from "./pages/SystemAnalytics";
import { THEMES } from "./utils/constants";

function App() {
    
  const Login = lazy(() => import("./pages/Login"));

  const Signup = lazy(() => import("./pages/Signup"));

  const Dashboard = lazy(() => import("./pages/Dashboard"));

  const AdminDashboard = lazy(() => import("./pages/AdminDashboard"));

  const UserManagement = lazy(() => import("./pages/UserManagement"));

  const UrlManagement = lazy(() => import("./pages/UrlManagement"));

  
  const [theme, setTheme] = useState(() => {
  
    const savedTheme = localStorage.getItem("theme");

    if (savedTheme === THEMES.LIGHT || savedTheme === THEMES.DARK) {
      return savedTheme;
    }

    return window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: light)").matches
      ? THEMES.LIGHT
      : THEMES.DARK;
  });

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const isDarkMode = theme === THEMES.DARK;

  return (
    
    <BrowserRouter>
      <div className="app-shell" data-theme={theme}>
        <button
          type="button"
          className="theme-toggle"
          onClick={() => setTheme(isDarkMode ? THEMES.LIGHT : THEMES.DARK)}
          aria-label={`Switch to ${isDarkMode ? THEMES.LIGHT : THEMES.DARK} mode`}
          title={`Switch to ${isDarkMode ? THEMES.LIGHT : THEMES.DARK} mode`}
        >
          <span
            key={theme}
            className={`theme-toggle-icon ${isDarkMode ? "theme-toggle-icon--sun" : "theme-toggle-icon--moon"}`}
          >
            {isDarkMode ? (
              <Sun1 size={18} color="currentColor" />
            ) : (
              <Moon size={18} color="currentColor" />
            )}
          </span>
          <span className="theme-toggle-label">
            {isDarkMode ? "Light" : "Dark"}
          </span>
        </button>
       
        <Suspense fallback={<PageLoader />}>
        
          <Routes>
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/welcome" element={<Welcome />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="admin/urls" element={<UrlManagement />} />
            <Route path="/admin/users" element={<UserManagement />} />
            <Route path="/admin/analytics" element={<SystemAnalytics />} />
          </Routes>

        </Suspense>  

        <ToastContainer
          position="top-right"
          autoClose={2000}
          theme={theme}
        /> 

        {/* <TestBadge /> */}
      </div>  
    </BrowserRouter> 

    
  );
}

export default App;
