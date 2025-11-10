import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import "../pages/Detail.css";

const Detail = () => {
  const { id, brand } = useParams();
  const [laptop, setLaptop] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState("");

  const imageRef = useRef(null);
  const [lensPosition, setLensPosition] = useState({ x: 0, y: 0 });
  const [showLens, setShowLens] = useState(false);
  const [backgroundPosition, setBackgroundPosition] = useState("0% 0%");

  // ✅ Default fallback image (can be any local or hosted image)
  const DEFAULT_IMAGE = "https://via.placeholder.com/400x300?text=No+Image";

  useEffect(() => {
    const fetchLaptop = async () => {
      try {
        const res = await fetch(
          `http://localhost:5000/api/getLaptopsByBrand/${brand}?page=1&limit=1000`
        );
        const data = await res.json();

        if (data && Array.isArray(data.data)) {
          const found = data.data.find((lap) => lap._id === id);
          if (found) {
            setLaptop(found);

            // ✅ Fix: don't prepend localhost again; use directly
            if (Array.isArray(found.image_url) && found.image_url.length > 0) {
              setSelectedImage(found.image_url[0]);
            } else if (found.image_url) {
              setSelectedImage(found.image_url);
            } else {
              // ✅ Fallback if no image
              setSelectedImage(DEFAULT_IMAGE);
            }
          } else {
            setError("Laptop not found");
          }
        } else {
          setError("Invalid response from server");
        }
      } catch (err) {
        console.error(err);
        setError("Failed to fetch laptop");
      } finally {
        setLoading(false);
      }
    };

    fetchLaptop();
  }, [id, brand]);

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

  if (loading) return <h2 style={{ textAlign: "center" }}>Loading...</h2>;
  if (error) return <h2 style={{ textAlign: "center", color: "red" }}>{error}</h2>;
  if (!laptop) return <h2 style={{ textAlign: "center" }}>Laptop not found</h2>;

  return (
    <div className="container">
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
            src={selectedImage || DEFAULT_IMAGE} // ✅ Safe fallback
            alt={laptop.model || "Laptop"}
            className="main-image"
          />

          {showLens && selectedImage && selectedImage !== DEFAULT_IMAGE && (
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
              }}
            />
          )}
        </div>

        <div className="thumbnail-row">
          {(Array.isArray(laptop.image_url)
            ? laptop.image_url
            : [laptop.image_url]
          ).map((img, index) => (
            <img
              key={index}
              src={img || DEFAULT_IMAGE} // ✅ Default image for missing URLs
              alt={`Thumb ${index}`}
              className={`thumb ${selectedImage === img ? "selected" : ""}`}
              onClick={() => setSelectedImage(img || DEFAULT_IMAGE)}
            />
          ))}
        </div>

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

      <div className="page-right">
        <nav className="breadcrumb">
          <a href="/">Home</a> /{" "}
          <a href={`/brand/${laptop.brand}`}>Laptops</a> /{" "}
          {laptop.brand} {laptop.model}
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
          <span className="mrp">₹{Math.round(laptop.price * 1.2)}</span>
          <span className="badge">20% OFF</span>
        </div>

        <button className="buy-btn">Buy Now</button>

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

      {showLens && selectedImage && selectedImage !== DEFAULT_IMAGE && (
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
