import React, { useState } from "react";
import "./AddAddress.css";

const AddAddress = ({ onClose }) => {
  const [type, setType] = useState("Other");
  const [flat, setFlat] = useState("");
  const [street, setStreet] = useState("");
  const [name, setName] = useState("");
  const [postalCode, setPostalCode] = useState("");

  const saveAddress = async () => {
    if (!flat || !name || !type || !postalCode) {
      alert("Please fill all required fields");
      return;
    }

    const token = localStorage.getItem("token");

    const res = await fetch(
      `${import.meta.env.VITE_API_URL}/api/address/add`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          type,
          flat,
          street,
          name,
          postalCode,
        }),
      }
    );


    const data = await res.json();

    if (res.ok) {
      alert("Address saved successfully!");
      onClose(); // close modal
    } else {
      alert(data.message);
    }
  };

  // Close modal when clicking on overlay
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) { // more reliable than class check
      onClose();
    }
  };

  return (
    <div className="address-overlay" onClick={handleOverlayClick}>
      <div className="address-container">
        <div className="address-header">
          <h3>Enter complete address</h3>
          <button className="close-btn" onClick={onClose}>
            ✕
          </button>
        </div>

        <p className="subtitle">Save address as </p>

        <div className="type-buttons">
          {["Home", "Office", "Hotel", "Other"].map((item) => (
            <button
              key={item}
              className={type === item ? "active" : ""}
              onClick={() => setType(item)}
            >
              {item}
            </button>
          ))}
        </div>

        <div className="input-wrapper required">
          <input
            type="text"
            placeholder="Flat / House no / Building name"
            value={flat}
            onChange={(e) => setFlat(e.target.value)}
          />
        </div>

        <div className="input-wrapper">
          <input
            type="text"
            placeholder="Street / Society / Landmark"
            value={street}
            onChange={(e) => setStreet(e.target.value)}
          />
        </div>

        <div className="input-wrapper required">
          <input
            type="text"
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="input-wrapper required">
          <input
            type="text"
            placeholder="Postal Code"
            value={postalCode}
            onChange={(e) => setPostalCode(e.target.value)}
          />
        </div>

        <button className="save-btn" onClick={saveAddress}>
          Save address
        </button>
      </div>
    </div>
  );
};

export default AddAddress;
