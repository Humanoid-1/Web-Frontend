import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import "../pages/Detail.css";

const Detail = () => {
  const { id } = useParams();
  const [laptop, setLaptop] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState("");

  // Lens + Zoom states
  const imageRef = useRef(null);
  const [lensPosition, setLensPosition] = useState({ x: 0, y: 0 });
  const [showLens, setShowLens] = useState(false);
  const [backgroundPosition, setBackgroundPosition] = useState("0% 0%");

  useEffect(() => {
    fetch(`http://localhost:5000/api/getLaptop/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setLaptop(data);
        setSelectedImage(data.image_url[0]);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Fetch error:", err);
        setLoading(false);
      });
  }, [id]);

  // ✅ Zoom Handler
  const handleMouseMove = (e) => {
    const rect = imageRef.current?.getBoundingClientRect();
    if (!rect) return;

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const percentX = (x / rect.width) * 100;
    const percentY = (y / rect.height) * 100;

    setLensPosition({ x, y });
    setBackgroundPosition(`${percentX}% ${percentY}%`);
    setShowLens(true);
  };

  const handleMouseLeave = () => setShowLens(false);

  if (loading) return <h2>Loading...</h2>;
  if (!laptop) return <h2>Laptop not found</h2>;

  return (
    <div className="container">
      {/* -------- Left Side (Images + Lens + Meta) -------- */}
     <div className="page-left">
  <div
    className="main-img-wrapper"
    style={{ position: "relative" }}
    onMouseMove={handleMouseMove}
    onMouseEnter={() => setShowLens(true)}
    onMouseLeave={handleMouseLeave}
  >
    <img
      ref={imageRef}
      src={selectedImage}
      alt={laptop.model}
      className="main-image"
    />

          {/* ✅ Lens */}
          {showLens && (
            <div
              className="lens"
              style={{
                position: "absolute",
                width: "100px",
                height: "100px",
                border: "1px solid #a89e9eff",
                borderRadius: "50%",
                left: `${lensPosition.x - 50}px`,
                top: `${lensPosition.y - 50}px`,
                 
                background: "rgba(255,255,255,0.2)",
                pointerEvents: "none",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "28px",
                fontWeight: "bold",
                color: "#007bff",
              }}
            >
              
            </div>
          )}
        </div>

        {/* ✅ Thumbnails */}
        <div className="thumbnail-row">
          {laptop.image_url.map((img, index) => (
            <img
              key={index}
              src={img}
              alt={`Thumb ${index}`}
              className={`thumb ${selectedImage === img ? "selected" : ""}`}
              onClick={() => setSelectedImage(img)}
            />
          ))}
        </div>

        {/* ✅ Product Meta */}
        <div className="product-meta">
          <strong>Product Details</strong>
          <div className="meta-details">
            <p><strong>CPU:</strong> {laptop.cpu}</p>
            <p><strong>RAM:</strong> {laptop.ram}</p>
            <p><strong>Storage:</strong> {laptop.storage}</p>
            <p><strong>Warranty:</strong> {laptop.warranty}</p>
            <p><strong>Description:</strong> {laptop.description}</p> 
          </div>
        </div>
      </div>

      {/* -------- Right Side -------- */}
      <div className="page-right">
        <nav className="breadcrumb">
          <a href="http://localhost:5173/#/">Home</a> /{" "}
          <a href={`http://localhost:5173/#/brand/${laptop.brand}`}>
            Laptops
          </a>{" "}
          / {laptop.brand} {laptop.model}
        </nav>

        <h1 className="product-title">
          {laptop.brand} {laptop.model} ({laptop.cpu}, {laptop.ram},{" "}
          {laptop.storage})
        </h1>
        <p className="sponsored">Sponsored</p>

        <div className="brand-info">
          <p className="brand-para">{laptop.brand}</p>
          <a
            href={`http://localhost:5173/#/brand/${laptop.brand}`}
            className="green-link"
          >
            Explore all products
          </a>
        </div>

        <div className="price-section">
          <span className="discounted">₹{laptop.price}</span>
          <span className="mrp">₹{laptop.discount_price}</span>
          <span className="badge">58% OFF</span>
        </div>

        <button className="buy-btn">Buy Now</button>

        {/* Why Shop Section */}
        <div className="why-shop">
          <h4>Why shop from humanoid maker?</h4>
          <ul>
            <li><strong>Trusted Quality</strong> – Every product is checked.</li>
            <li><strong>Fair Prices</strong> – No hidden fees.</li>
            <li><strong>Expert Support</strong> – Tech specialists ready.</li>
            <li><strong>Eco-Friendly</strong> – We recycle to cut e-waste.</li>
          </ul>
        </div>
      </div>

      {/* -------- Zoom Result -------- */}
      {showLens && (
        <div
          className="zoom-result"
          style={{
            position: "absolute",
            left: "60px",
            top: "120px",
            width: "150px",
            height: "150px",
            pointerEvents: "none",
            border: "1px solid #ddd",
            backgroundImage: `url(${selectedImage})`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: backgroundPosition,
            
            backgroundSize: "300%",
            borderRadius: "10px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
          }}
        ></div>
      )}
    </div>
  );
};

export default Detail;
