import { useEffect, useState } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Moon, Sun1 } from "iconsax-react";
import "./App.css";
import ForgotPassword from "./pages/ForgotPassword";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Welcome from "./pages/Welcome";
import Dashboard from "./pages/Dashboard";

function App() {
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem("theme");

    if (savedTheme === "light" || savedTheme === "dark") {
      return savedTheme;
    }

    return window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: light)").matches
      ? "light"
      : "dark";
  });

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const isDarkMode = theme === "dark";

  return (
    <BrowserRouter>
      <div className="app-shell" data-theme={theme}>
        <button
          type="button"
          className="theme-toggle"
          onClick={() => setTheme(isDarkMode ? "light" : "dark")}
          aria-label={`Switch to ${isDarkMode ? "light" : "dark"} mode`}
          title={`Switch to ${isDarkMode ? "light" : "dark"} mode`}
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
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/welcome" element={<Welcome />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
