import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Lock, Sms, User } from "iconsax-react";
import AuthInput from "../components/AuthInput";
import { signupUser } from "../Api/AuthApi";
import { toast } from "react-toastify";

const specialCharacterPattern = /[^A-Za-z0-9]/;

function getPasswordStrength(password) {
  const value = password || "";
  const checks = [
    value.length >= 8 && value.length <= 20,
    /[A-Z]/.test(value),
    (value.match(/[0-9]/g) || []).length >= 2,
    specialCharacterPattern.test(value),
  ];

  const score = checks.filter(Boolean).length;

  if (score <= 1) {
    return { label: "Weak", score, className: "weak" };
  }

  if (score === 2) {
    return { label: "Intermediate", score, className: "intermediate" };
  }

  if (score === 3) {
    return { label: "Strong", score, className: "strong" };
  }

  return { label: "Very Strong", score, className: "very-strong" };
}

function getPasswordMatchStatus(password, confirmPassword) {
  const confirmValue = confirmPassword || "";

  if (!confirmValue) {
    return { label: "", className: "neutral", visible: false };
  }

  if (password === confirmValue) {
    return {
      label: "Passwords match",
      className: "match",
      visible: true,
    };
  }

  return {
    label: "Passwords do not match",
    className: "mismatch",
    visible: true,
  };
}

function Signup() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const passwordStrength = getPasswordStrength(form.password);
  const passwordMatchStatus = getPasswordMatchStatus(
    form.password,
    form.confirmPassword,
  );

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const newErrors = {};
    if (!(form.name || "").trim())
      newErrors.name = "Please enter required value";
    if (!(form.email || "").trim())
      newErrors.email = "Please enter required value";
    if (!(form.password || "").trim())
      newErrors.password = "Please enter required value";
    if (!(form.confirmPassword || "").trim())
      newErrors.confirmPassword = "Please enter required value";
    if (form.confirmPassword && form.password !== form.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }
    setErrors(newErrors);
    if (Object.keys(newErrors).length) return;

    if (passwordStrength.score < 3) {
      // alert("Make password strong");
      toast.error("Make password strong");
      return;
    }

    try{
        const response = await signupUser({
          username: form.name.trim(),
          email: form.email.trim(),
          password: form.password,
        });

        // alert(response.message);
        toast.success(response.message);

        navigate("/login");
    }
    catch(error){
        console.error(error);

        if (error.response?.data?.message) {
          // alert(error.response.data.message);
          toast.error(error.response.data.message);
        } else {
          // alert("Signup failed");
          toast.error("Signup failed");
        }
    }

    // const accountsRaw = localStorage.getItem("accounts");
    // const accounts = accountsRaw ? JSON.parse(accountsRaw) : [];

    // const emailToCheck = (form.email || "").trim().toLowerCase();
    // const exists = accounts.find(
    //   (a) => (a.email || "").trim().toLowerCase() === emailToCheck,
    // );

    // if (exists) {
    //   alert("You already have an account");
    //   navigate("/login");
    //   return;
    // }

    // // Add new account
    // accounts.push({
    //   name: form.name.trim(),
    //   email: form.email.trim(),
    //   password: form.password,
    // });
    // localStorage.setItem("accounts", JSON.stringify(accounts));

    // alert("Sign up successful");
    // navigate("/login");
  };

  return (
    <main className="auth-page">
      <section className="auth-card">
        <h1 className="auth-title">Sign Up</h1>
        <p className="auth-subtitle">Create your account to get started.</p>

        <form className="auth-form" onSubmit={handleSubmit}>
          <AuthInput
            label="Full Name"
            icon={User}
            type="text"
            name="name"
            placeholder="Enter your name"
            value={form.name}
            onChange={handleChange}
            error={errors.name}
          />

          <AuthInput
            label="Email"
            icon={Sms}
            type="email"
            name="email"
            placeholder="Enter your email"
            value={form.email}
            onChange={handleChange}
            error={errors.email}
          />

          <AuthInput
            label="Password"
            icon={Lock}
            type="password"
            name="password"
            placeholder="Create a password"
            value={form.password}
            onChange={handleChange}
            error={errors.password}
          />

          <div className="password-strength" aria-live="polite">
            <div className="password-strength-track" aria-hidden="true">
              <div
                className={`password-strength-fill ${passwordStrength.className}`}
                style={{
                  width: `${Math.max(25, passwordStrength.score * 25)}%`,
                }}
              />
            </div>
            <div className="password-strength-meta">
              <span className="password-strength-caption">
                Password strength
              </span>
              <span
                className={`password-strength-label ${passwordStrength.className}`}
              >
                {passwordStrength.label}
              </span>
            </div>
          </div>

          <AuthInput
            label="Re-enter Password"
            icon={Lock}
            type="password"
            name="confirmPassword"
            placeholder="Re-enter your password"
            value={form.confirmPassword}
            onChange={handleChange}
            error={errors.confirmPassword}
          />

          {passwordMatchStatus.visible ? (
            <div className="password-match" aria-live="polite">
              <span className="password-match-caption">
                Password match status
              </span>
              <span
                className={`password-match-label ${passwordMatchStatus.className}`}
              >
                {passwordMatchStatus.label}
              </span>
            </div>
          ) : null}

          <button className="auth-button" type="submit">
            Sign Up
          </button>
        </form>

        <div className="auth-links">
          <Link to="/login">Back to login</Link>
        </div>
      </section>
    </main>
  );
}

export default Signup;
