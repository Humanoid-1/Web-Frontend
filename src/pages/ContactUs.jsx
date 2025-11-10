import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { submitContactForm } from "../services/contactService";
import 'react-toastify/dist/ReactToastify.css';
import "./ContactUs.css";

function ContactUs() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePhoneChange = (e) => {
    const input = e.target.value.replace(/\D/g, "");
    if (input.length <= 10) {
      setFormData((prev) => ({ ...prev, phone: input }));
    }
  };

  const validatePhone = () => {
    const trimmed = formData.phone.trim();
    if (!/^[6-9]\d{9}$/.test(trimmed)) {
      toast.error("Please enter a valid 10-digit mobile number");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const trimmedData = {
      name: formData.name.trim(),
      email: formData.email.trim(),
      phone: formData.phone.trim(),
      message: formData.message.trim()
    };

    console.log("Submitting contact form:", trimmedData);

    const result = await submitContactForm(trimmedData);

    if (result.message) {
      toast.success(result.message, {
        position: "top-right",
        autoClose: 3000,
        style: {
          backgroundColor: "#007bff",
          color: "#fff",
          fontWeight: "bold"
        }
      });
      setFormData({
        name: "",
        email: "",
        phone: "",
        message: ""
      });
    } else {
      toast.error(result.error || "Something went wrong.");
    }

    setLoading(false);
  };

  return (
    <div className="contact-container">
      <h1>Contact Us</h1>
      <p>"Need help? We’re just a form away!"</p>

      <form className="contact-form" onSubmit={handleSubmit}>
        <label>Name</label>
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <div className="inline-inputs">
          <div className="input-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <label>Mobile Number</label>
            <input
              type="tel"
              name="phone"
              placeholder="Enter Mobile Number"
              value={formData.phone}
              onChange={handlePhoneChange}
              onBlur={validatePhone}
              maxLength={10}
              required
            />
          </div>
        </div>
        <label>Message</label>
        <textarea
          name="message"
          placeholder="Write your message here..."
          rows="5"
          value={formData.message}
          onChange={handleChange}
          required
        />

        <button type="submit" disabled={loading}>
          {loading ? "Sending..." : "Send Message"}
        </button>
      </form>

      <ToastContainer />
      <div className="contact-info">
        <h2>Contact Us:</h2>
        <p>Website: <a href="https://humanoidmaker.com/">Humanoid Maker</a></p>
        <p>Phone: +91 70115 13955</p>
        <p>Address: 4/1711, Bhola Nath Nagar, Mahavir Block, Sunder Park, Shahdara, Delhi, 110032</p>
      </div>

      <div className="social-links">
        <h2 className="follow-us">Follow Us:</h2>
        <nav>
          <ul>
            <li><i className="fa-brands fa-youtube" style={{ color: "red" }}></i><a href="https://www.youtube.com/channel/UCeZcSY0PpLxadeXKQjCkaSg">YouTube</a></li>
            <li><i className="fa-brands fa-facebook" style={{ color: "blue" }}></i><a href="https://www.facebook.com/humanoidmaker">Facebook</a></li>
            <li><i className="fa-brands fa-instagram" style={{ color: "#f12727ff" }}></i><a href="https://www.instagram.com/humanoidmaker/">Instagram</a></li>
            <li><i className="fa-brands fa-linkedin" style={{ color: "#0a66c2" }}></i><a href="https://in.linkedin.com/in/humanoidmaker">LinkedIn</a></li>
          </ul>
        </nav>
      </div>
    </div>
  );
}

export default ContactUs;
