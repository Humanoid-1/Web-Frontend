import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import "./Login.css";
import { Link } from "react-router-dom";

function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: ""
  });

  const navigate = useNavigate();
  const location = useLocation();
  const redirectTo = location.state?.redirectTo || "/cart"; // Redirect after login

  const isValidEmail = (email) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const isValidPhone = (phone) =>
    phone === "" || /^[6-9]\d{9}$/.test(phone);

  const validatePassword = (password) => {
    const trimmed = password.trim();

    if (trimmed.length < 8) {
      toast.error("Password too short. Use at least 8 characters");
      return false;
    }

    if (trimmed.length > 12) {
      toast.error("Password too long. Limit to 12 characters");
      return false;
    }

    if (!/[A-Za-z]/.test(trimmed)) {
      toast.error("Password must include at least one letter");
      return false;
    }

    if (!/\d/.test(trimmed)) {
      toast.error("Password must include at least one number");
      return false;
    }

    if (!/[@$!%*?&]/.test(trimmed)) {
      toast.error("Password must include one special character (@$!%*?&)");
      return false;
    }

    if (/[^A-Za-z\d@$!%*?&]/.test(trimmed)) {
      toast.error("Invalid character used. Only @$!%*?& allowed");
      return false;
    }

    return true;
  };

  const toggleForm = () => {
    setIsLogin(!isLogin);
    setFormData({
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      phone: ""
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const trimmed = {
      name: formData.name.trim(),
      email: formData.email.trim(),
      password: formData.password.trim(),
      confirmPassword: formData.confirmPassword.trim(),
      phone: formData.phone.trim()
    };

    if (!isValidEmail(trimmed.email)) {
      toast.error("Invalid email format");
      setLoading(false);
      return;
    }

    if (!validatePassword(trimmed.password)) {
      setLoading(false);
      return;
    }

    if (!isValidPhone(trimmed.phone)) {
      toast.error("Invalid phone number");
      setLoading(false);
      return;
    }

    if (!isLogin && trimmed.password !== trimmed.confirmPassword) {
      toast.error("Passwords do not match");
      setLoading(false);
      return;
    }

    const endpoint = isLogin ? "login" : "register";

    const payload = {
      name: trimmed.name,
      email: trimmed.email,
      password: trimmed.password,
      phoneNumber: trimmed.phone
    };

    try {
      const res = await fetch(`http://localhost:5000/api/auth/${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(
          isLogin
            ? { email: trimmed.email, password: trimmed.password }
            : payload
        )
      });

      const result = await res.json();
      console.log("Backend response:", result);

      const errorMsg =
        result.error || result.message || result.msg || "Something went wrong";

     if (res.status === 200 || result.token) {
  if (isLogin) {
    localStorage.setItem("token", result.token);
    toast.success("Login successful! Welcome back.");
    navigate(location.state?.redirectTo || "/"); // redirect to Home
  } else {
    toast.success("Registration successful! Please login now.");
    setIsLogin(true);
    setFormData({
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      phone: ""
    });
  }
}
 else {
        toast.error(errorMsg);
      }
    } catch (err) {
      console.error("Fetch error:", err.message);
      toast.error("Server error. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <h2>{isLogin ? "Login" : "Sign Up"}</h2>
      <form onSubmit={handleSubmit} className="login-form">
        {!isLogin && (
          <>
            <input name="name" type="text" placeholder="Name" value={formData.name} onChange={handleChange} required />
            <input name="email" type="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
            <input name="phone" type="text" placeholder="Phone Number (optional)" value={formData.phone} onChange={handleChange} />
            <input name="password" type="password" placeholder="Create Password" value={formData.password} onChange={handleChange} required />
            <input name="confirmPassword" type="password" placeholder="Confirm Password" value={formData.confirmPassword} onChange={handleChange} required />
          </>
        )}

        {isLogin && (
          <>
            <input name="email" type="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
            <input name="password" type="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
          </>
        )}

        <button type="submit" disabled={loading}>
          {loading ? "Please wait..." : isLogin ? "Login" : "Register"}
        </button>
      </form>

      <p style={{ marginTop: "1rem" }}>
        {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
        <span style={{ color: "#3498db", cursor: "pointer", fontWeight: "bold" }} onClick={toggleForm}>
          {isLogin ? "Sign Up" : "Login"}
        </span>
      </p>

      {isLogin && (
        <p style={{ marginTop: "1rem" }}>
          <Link to="/forgot-password" style={{ color: "#3498db", fontWeight: "bold" }}>
            Forgot Password?
          </Link>
        </p>
      )}
    </div>
  );
}

export default Auth;
