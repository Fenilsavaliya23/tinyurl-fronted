import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Lock, Sms } from "iconsax-react";
import AuthInput from "../components/common/AuthInput/AuthInput.js";
import { loginUser } from "../Api/AuthApi";
import { toast } from "react-toastify";

function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // validation
    const newErrors = {};
    if (!(form.email || "").trim())
      newErrors.email = "Please enter required value";
    if (!(form.password || "").trim())
      newErrors.password = "Please enter required value";
    setErrors(newErrors);
    if (Object.keys(newErrors).length) return;

    try {

      const response = await loginUser({
        email: form.email.trim(),
        password: form.password,
      });

      sessionStorage.setItem(
        "currentUser",
        JSON.stringify({
          username: response.username,
          email: response.email,
          role: response.role
        })
      );

      sessionStorage.setItem("jwtToken", response.token);

      // console.log(
      //   JSON.parse(
      //     sessionStorage.getItem("currentUser")
      //   )
      // );

      // alert(response.message);
      toast.success(response.message);

      navigate("/welcome");

    } 
    catch (error) {

      console.error(error);

      if (error.response?.data?.message) {
        // alert(error.response.data.message);
        toast.error(error.response.data.message);
      } else {
        // alert("Login failed");
        toast.error("Login failed");
      }

    }

    // const accountsRaw = localStorage.getItem("accounts");
    // const accounts = accountsRaw ? JSON.parse(accountsRaw) : [];

    // const account = accounts.find(
    //   (a) => a.email.toLowerCase() === (form.email || "").trim().toLowerCase(),
    // );

    // if (account && account.password === form.password) {
    //   sessionStorage.setItem(
    //     "currentUser",
    //     JSON.stringify({ name: account.name, email: account.email }),
    //   );
    //   alert("Login successfully");
    //   navigate("/welcome");
    //   return;
    // }

    // if (account && account.password !== form.password) {
    //   alert("You entered wrong password");
    //   navigate("/forgot-password", { state: { email: form.email } });
    //   return;
    // }

    // alert("Invalid credentials");
  };

  return (
    <main className="auth-page">
      <section className="auth-card">
        <h1 className="auth-title">Login</h1>
        <p className="auth-subtitle">Enter your credentials to continue.</p>

        <form className="auth-form" onSubmit={handleSubmit}>
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
            placeholder="Enter your password"
            value={form.password}
            onChange={handleChange}
            error={errors.password}
          />

          <button className="auth-button" type="submit">
            Login
          </button>
        </form>

        <div className="auth-links">
          <Link to="/signup">Create account</Link>
          <Link to="/forgot-password">Forgot password?</Link>
        </div>
      </section>
    </main>
  );
}

export default Login;
