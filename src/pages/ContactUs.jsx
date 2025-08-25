import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import "./ContactUs.css";

function ContactUs() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Here you can handle form submission, e.g., send data to an API
    console.log("Form Data Submitted:", formData);

    // Success toast with green tick
    toast.success("Thank you for contacting us!", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
        style: {
    backgroundColor: "#007bff",
    color: "#fff",
    fontWeight: "bold"
  }
    });

    // Form reset
    setFormData({
      name: "",
      email: "",
      message: "",
    });
  };

  return (
    <div className="contact-container">
      <h1>Contact Us - Humanoid Maker</h1>
      <p>
        Have questions about buying or selling laptops? Or need help with
        accessories? Fill out the form below and our team will reach out to you.
      </p>

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

        <label>Email</label>
        <input
          type="email"
          name="email"
          placeholder="Your Email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <label>Message</label>
        <textarea
          name="message"
          placeholder="Write your message here..."
          rows="5"
          value={formData.message}
          onChange={handleChange}
          required
        ></textarea>

        <button type="submit">Send Message</button>
      </form>

      {/* ToastContainer जहाँ toast notifications दिखेंगे */}
      <ToastContainer/>

<div className="contact-info">
  <h2>Contact Us:</h2>
  <p>
    Website: <a href="https://humanoidmaker.com/">Humanoid Maker</a>
  </p>
  <p>Phone: +91 70115 13955</p>
  <p>
    Address: 4/1711, Bhola Nath Nagar, Mahavir Block, Sunder Park,
    Shahdara, Delhi, 110032
  </p>
</div>

      <div className="social-links">
        <h2 className="follow-us">Follow Us:</h2>
        <nav>
          <ul>
            <li>
              <i
                className="fa-brands fa-youtube"
                style={{ color: "red" }}
              ></i>
              <a href="https://www.youtube.com/channel/UCeZcSY0PpLxadeXKQjCkaSg">
                YouTube
              </a>
            </li>
            <li>
              <i
                className="fa-brands fa-facebook"
                style={{ color: "blue" }}
              ></i>
              <a href="https://www.facebook.com/humanoidmaker">Facebook</a>
            </li>
            <li>
              <i
                className="fa-brands fa-instagram"
                style={{ color: "#f12727ff" }}
              ></i>
              <a href="https://www.instagram.com/humanoidmaker/">
                Instagram
              </a>
            </li>
            <li>
              <i
                className="fa-brands fa-linkedin"
                style={{ color: "#0a66c2" }}
              ></i>
              <a href="https://in.linkedin.com/in/humanoidmaker">LinkedIn</a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}

export default ContactUs;
