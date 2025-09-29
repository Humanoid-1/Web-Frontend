import React from "react";
import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import "../pages/Detail.css";
import { Link } from "react-router-dom";

const AccessoriesDetail = () => {
  const { id } = useParams();
  const [accessory, setAccessory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState("");
  const imageRef = useRef(null);

  useEffect(() => {
    fetch(`http://localhost:5000/api/getAccessory/${id}`)
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
  }
, [id]);

  if (loading) return <h2>Loading...</h2>;
  if (!accessory) return <h2>Accessory not found</h2>;
  return (
    <div className="container">
      <div className="page-left">
        <div className="main-img-wrapper" style={{ position: "relative" }}>
          <img
            src={selectedImage}
            alt="Accessory"
            className="main-img"
            ref={imageRef}
            style={{ width: "100%", height: "auto" }}
          />
          <div className="thumbnail-row">
            {accessory.image_url.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`Thumbnail ${index + 1}`}
                className={`thumbnail ${selectedImage === img ? "selected" : ""}`}
                onClick={() => setSelectedImage(img)}
                style={{ cursor: "pointer", width: "60px", height: "60px", objectFit: "cover", marginRight: "8px" }}
              />
            ))}
          </div>
        </div>
      </div>
      <div className="page-right">
        <h2>{accessory.name}</h2>
        <p>{accessory.description}</p>
        <div className="specs">
          <p>Brand: {accessory.brand || "N/A"}</p>
          <p>Category: {accessory.category || "N/A"}</p>
          <p>Type: {accessory.type || "N/A"}</p>
        </div>
        <div className="price-section">
          <span className="discounted">₹{accessory.price}</span>
          <span className="mrp">₹{accessory.discount_price}</span>
        </div>
        <button className="buy-btn">Buy Now</button>
        <Link to="/accessories" style={{ textDecoration: 'none', marginLeft: '16px' }}>
          <button className="back-btn">Back to Accessories</button>
        </Link>
      </div>
    </div>
  );
}
export default AccessoriesDetail;