import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../pages/Detail.css";

const AccessoriesDetail = () => {
  const { id } = useParams();
  const [accessory, setAccessory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState("");

  useEffect(() => {
    fetch(`http://localhost:5000/api/getAccessories/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setAccessory(data);
        setSelectedImage(data.image_url[0]);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Fetch error:", err);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <h2>Loading...</h2>;
  if (!accessory) return <h2>Accessory not found</h2>;

  return (
    <div className="container">
      {/* Left: Image Section */}
      <div className="page-left">
        <img src={selectedImage} alt={accessory.model} className="main-image" />
        <div className="thumbnail-row">
          {accessory.image_url.map((img, index) => (
            <img
              key={index}
              src={img}
              alt={`Thumb ${index}`}
              className={`thumb ${selectedImage === img ? "selected" : ""}`}
              onClick={() => setSelectedImage(img)}
            />
          ))}
        </div>

        {/* Product Details below image */}
        <div className="product-meta">
          <strong>Product Details</strong>
          <div className="meta-details">
            <p><strong>Category:</strong> {accessory.category}</p>
            <p><strong>Brand:</strong> {accessory.brand}</p>
            <p><strong>Model:</strong> {accessory.model}</p>
            <p><strong>Type:</strong> {accessory.type}</p>
            <p><strong>Description:</strong> {accessory.description}</p>
          </div>
        </div>
      </div>

      {/* Right: Info Panel */}
      <div className="page-right" style={{ fontSize: '34px' }}>
        <nav className="breadcrumb">
          <a href="http://localhost:5173/#/">Home</a> / 
          <a href={`http://localhost:5173/#/brand/${accessory.brand}`}>Accessories</a> / 
          {accessory.brand} {accessory.model}
        </nav>

        <h1 className="product-title">
          {accessory.brand} {accessory.model} ({accessory.type})
        </h1>

        <p className="sponsored">Sponsored</p>

        <div className="brand-info">
          <p className="brand-para">{accessory.brand}</p>
          <a href={`http://localhost:5173/#/brand/${accessory.brand}`} className="green-link">
            Explore all products
          </a>
        </div>

        <div className="price-section">
          <span className="discounted">₹{accessory.price}</span>
          <span className="mrp">{accessory.discount_price}</span>
          <span className="badge">58% OFF</span>
        </div>

        <button className="buy-btn">Buy Now</button>

        <div className="why-shop">
          <h4>Why shop from humanoid maker?</h4>
          <ul>
            <li><strong>Trusted Quality</strong><div><p>Every product is checked for performance and durability.</p></div></li>
            <li><strong>Fair Prices</strong><div><p>Transparent pricing — no hidden fees.</p></div></li>
            <li><strong>Expert Support</strong><div><p>Tech specialists ready to help you pick or repair.</p></div></li>
            <li><strong>Eco-Friendly</strong><div><p>We refurbish and recycle to cut down e‑waste.</p></div></li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AccessoriesDetail;
