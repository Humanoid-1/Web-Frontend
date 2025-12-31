import React, { useEffect, useState } from "react";
import AddAddress from "./AddAddress";
import "./AddressSelector.css";

const AddressSelector = ({ onClose, onSelect }) => {
  const [addresses, setAddresses] = useState([]);
  const [showAdd, setShowAdd] = useState(false);

  // Fetch saved addresses from backend
  const fetchAddresses = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("You must be logged in to see saved addresses.");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/address/user", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) {
        throw new Error("Failed to fetch addresses");
      }

      const data = await res.json();

      // Ensure data is an array
      if (Array.isArray(data)) {
        setAddresses(data);
      } else {
        setAddresses([]);
      }
    } catch (err) {
      console.error("Fetch addresses error:", err);
      alert("Could not load addresses. Please try again.");
    }
  };

  useEffect(() => {
    fetchAddresses();
  }, []);

  return (
    <div className="address-panel">
      {/* Header */}
      <div className="address-panel-header">
        <button className="back-btn" onClick={onClose}>←</button>
        <h3>Select delivery address</h3>
      </div>

      {/* Add new address button */}
      <button className="add-new-btn" onClick={() => setShowAdd(true)}>
        + Add a new address
      </button>

      <p className="saved-title">Your saved address</p>

      {/* Show addresses or empty message */}
      {addresses.length === 0 ? (
        <p>No saved addresses found.</p>
      ) : (
        addresses.map((addr) => (
          <div
            key={addr._id}
            className="address-card"
            onClick={() => onSelect(addr)}
          >
            <h4>{addr.type}</h4>
            <p>{addr.flat}{addr.street ? `, ${addr.street}` : ""}</p>
            <span>{addr.name}</span>
          </div>
        ))
      )}

      {/* Add address modal */}
      {showAdd && (
        <AddAddress
          onClose={() => {
            setShowAdd(false);
            fetchAddresses(); // Refresh list after adding new address
          }}
        />
      )}
    </div>
  );
};

export default AddressSelector;
