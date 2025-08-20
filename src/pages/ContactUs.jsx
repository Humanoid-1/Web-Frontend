import React from "react";
import "./ContactUs.css";

function ContactUs() {
  return (
    <div className="contact-container">
      <h1>Contact Us - Humanoid Maker</h1>
      <p>
        Have questions about buying or selling laptops? Or need help with
        accessories? Fill out the form below and our team will reach out to you.
      </p>

      <form className="contact-form">
        <label>Name</label>
        <input type="text" placeholder="Your Name" />

        <label>Email</label>
        <input type="email" placeholder="Your Email" />

        <label>Message</label>
        <textarea placeholder="Write your message here..." rows="5"></textarea>

        <button type="submit">Send Message</button>
      </form>
      

      <div className="contact-info">
        <h2>Contact Us:</h2>
        <p>Website:<a href="https://humanoidmaker.com/">Humanoid Maker</a></p>
        <p>Phone: +91 70115 13955</p>
        <p>Address:  4/1711, Bhola Nath Nagar, Mahavir Block, Sunder Park, Shahdara, Delhi, 110032</p>
      </div>
      <div className="social-links">
        <h2 className="follow-us">Follow Us:</h2>
        <nav>
          <ul>
            <li><i class="fa-brands fa-youtube" style={{color:"red"}}></i><a href="https://www.youtube.com/channel/UCeZcSY0PpLxadeXKQjCkaSg">YouTube</a></li>
            <li><i class="fa-brands fa-facebook" style={{color:"blue"}}></i><a href="https://www.facebook.com/humanoidmaker">Facebook</a></li>
            <li><i class="fa-brands fa-instagram" style={{color:"#f12727ff"}}></i><a href="https://www.instagram.com/humanoidmaker/">Instagram</a></li>
            <li><i class="fa-brands fa-linkedin" style={{color:"#0a66c2"}}></i><a href="https://in.linkedin.com/in/humanoidmaker">LinkedIn</a></li>
          </ul>
        </nav>
      </div>
    </div>
  );
}

export default ContactUs;