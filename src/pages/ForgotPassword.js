import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Sms } from "iconsax-react";
import AuthInput from "../components/common/AuthInput/AuthInput.js";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (location && location.state && location.state.email) {
      setEmail(location.state.email);
    }
  }, [location]);

  const handleSubmit = (event) => {
    event.preventDefault();

    const newErrors = {};
    if (!(email || "").trim()) newErrors.email = "Please enter required value";
    setErrors(newErrors);
    if (Object.keys(newErrors).length) return;

    const accountsRaw = localStorage.getItem("accounts");
    const accounts = accountsRaw ? JSON.parse(accountsRaw) : [];

    const account = accounts.find(
      (a) => a.email.toLowerCase() === (email || "").trim().toLowerCase(),
    );

    if (!account) {
      // alert("No account found with this email");
      toast.error("No account found with this email");
      navigate("/signup");
      return;
    }

    // alert("Password reset successfully");
    toast.success("Password reset link sent to your email");
    sessionStorage.setItem(
      "currentUser",
      JSON.stringify({ name: account.name, email: account.email }),
    );
    navigate("/welcome");
  };

  return (
    <main className="auth-page">
      <section className="auth-card">
        <h1 className="auth-title">Forgot Password</h1>
        <p className="auth-subtitle">
          We will send a reset link to your email.
        </p>

        <form className="auth-form" onSubmit={handleSubmit}>
          <AuthInput
            label="Email"
            icon={Sms}
            type="email"
            name="email"
            placeholder="Enter your email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            error={errors.email}
          />

          <button className="auth-button" type="submit">
            Send Reset Link
          </button>
        </form>

        <div className="auth-links">
          <Link to="/login">Back to login</Link>
        </div>
      </section>
    </main>
  );
}

export default ForgotPassword;
