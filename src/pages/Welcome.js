import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Welcome() {
  const [name, setName] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const raw = sessionStorage.getItem("currentUser");
    if (!raw) {
      navigate("/login");
      return;
    }

    try {
      const user = JSON.parse(raw);
      setName(user.name || user.email || "User");
    } catch (error) {
      navigate("/login");
    }
  }, [navigate]);

  const handleLogout = () => {
    sessionStorage.removeItem("currentUser");
    navigate("/login", { replace: true });
  };

  return (
    <main className="welcome-page">
      <section className="welcome-content">
        <p className="welcome-badge">Login successful</p>
        <h1 className="welcome-title">Welcome back</h1>
        <h2 className="welcome-name">{name}</h2>
        <p className="welcome-subtitle">
          Glad to see you again. Your dashboard is ready whenever you are.
        </p>
        <div
          style={{
            display: "flex",
            gap: "15px",
            justifyContent: "center",
            marginTop: "20px",
          }}
        >

          <button
            className="welcome-logout-button"
            type="button"
            onClick={() => navigate("/dashboard")}
          >
            Go To Dashboard
          </button>

          <button
            className="welcome-logout-button"
            type="button"
            onClick={handleLogout}
          >
            Logout
          </button>

        </div>
      </section>
    </main>
  );
}

export default Welcome;
