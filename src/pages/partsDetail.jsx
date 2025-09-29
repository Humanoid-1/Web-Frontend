import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../pages/Detail.css";

function PartsDetail() {
  const { id, category } = useParams();
  const navigate = useNavigate();

  const [items, setItems] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null); // for image switch

  useEffect(() => {
    const fetchPart = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/getParts?category=${category}&page=1&limit=1000`
        );
        const data = await response.json();

        if (data && Array.isArray(data.data)) {
          const foundPart = data.data.find((part) => part._id === id);
          if (foundPart) {
            setItems(foundPart);
            setSelectedImage(foundPart.image_url); // set main image
          } else {
            setError("Part not found");
          }
        } else {
          setError("Invalid data format received from server");
        }
      } catch (error) {
        setError("Error fetching part data");
      } finally {
        setLoading(false);
      }
    };

    fetchPart();
  }, [id, category]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="container">
      <div className="page-left">
        <img
          src={selectedImage}
          alt={items.model}
          className="main-image"
        />

        {/* Thumbnail row - if you have multiple images later */}
        <div className="thumbnail-row">
          <img
            src={items.image_url}
            alt="Thumb"
            className={`thumb ${selectedImage === items.image_url ? "selected" : ""}`}
            onClick={() => setSelectedImage(items.image_url)}
          />
          {/* Add more thumbnails if needed */}
        </div>

        <div className="why-shop">
          <h4>Why shop with us?</h4>
          <ul>
            <li>✅ 100% Original & Verified Parts</li>
            <li>✅ Easy Returns & Warranty Support</li>
            <li>✅ Fast Delivery</li>
            <li>✅ Secure Payments</li>
          </ul>
        </div>
      </div>

      <div className="page-right">
        <div className="breadcrumb">
          <a href="#" onClick={() => navigate(-1)}>
            Parts
          </a>{" "}
          / {items.category}
        </div>

        <h1 className="product-title">{items.name}</h1>
        <p className="sponsored">Sponsored</p>

        <div className="brand-info">
          <img
            src="https://cdn-icons-png.flaticon.com/512/69/69906.png"
            alt="brand"
            className="brand-icon"
          />
          <span className="brand-para">Brand: {items.brand}</span>
        </div>

        <div className="price-section">
          <span className="discounted">₹{items.price}</span>
          <span className="mrp">₹{Math.round(items.price * 1.2)}</span>
          <span className="badge">20% OFF</span>
        </div>

        <button className="buy-btn">Buy Now</button>

        <div className="product-meta">
            <h3>Product Details</h3>
          <p>Warranty: {items.warranty || "N/A"}</p>
          <p>Stock: {items.stock || "Available"}</p>
          <p>Category: {items.category}</p>
          <p>Brand: {items.brand}</p>
          
        </div>

        {items.description && (
          <div className="meta-details">
            <h4>Description</h4>
            <p>{items.description}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default PartsDetail;
