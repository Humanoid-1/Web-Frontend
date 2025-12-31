import React, { useState } from "react";
import { toast } from "react-toastify";

function ForgotPassword() {
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
  e.preventDefault();
  const res = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/forgot-password`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  });

    const result = await res.json();

    if (res.status === 200) {
      toast.success(result.message || "Reset link sent!");
    } else {
      toast.error(result.error || "wrong email");
    }
  };

  return (
    <div className="auth-container">
      <h2>Forgot Password</h2>
      <form onSubmit={handleSubmit}>
        <input type="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <button type="submit">Send Reset Link</button>
      </form>
    </div>
  );
}

export default ForgotPassword;
