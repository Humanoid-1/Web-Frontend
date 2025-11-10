import React, { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./detail.css"; // ✅ Importing CSS

function PartsDetailPage() {
  const { id, category } = useParams();
  const navigate = useNavigate();

  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [mainImage, setMainImage] = useState("");

  // 🔍 Lens + Zoom States
  const imageRef = useRef(null);
  const [lensPosition, setLensPosition] = useState({ x: 0, y: 0 });
  const [showLens, setShowLens] = useState(false);
  const [backgroundPosition, setBackgroundPosition] = useState("0% 0%");

  useEffect(() => {
    const fetchPart = async () => {
      try {
        const res = await fetch(
          `http://localhost:5000/api/getParts?category=${category}&page=1&limit=1000`
        );
        const data = await res.json();

        if (data && Array.isArray(data.data)) {
          const found = data.data.find((part) => part._id === id);
          if (found) {
            setItem(found);

            // ✅ Fix main image URL
            if (Array.isArray(found.image_url)) {
              setMainImage(`http://localhost:5000/${found.image_url[0]}`);
            } else {
              setMainImage(`http://localhost:5000/${found.image_url}`);
            }
          } else {
            setError("Part not found");
          }
        } else {
          setError("Invalid response from server");
        }
      } catch (err) {
        console.error(err);
        setError("Failed to fetch part data");
      } finally {
        setLoading(false);
      }
    };

    fetchPart();
  }, [id, category]);

  // 🧭 Lens Movement Handler
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

  if (loading) return <p style={{ textAlign: "center" }}>Loading...</p>;
  if (error) return <p style={{ textAlign: "center", color: "red" }}>{error}</p>;

  return (
    <div className="container">
      {item && (
        <>
          {/* -------- Left Section -------- */}
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
                src={mainImage}
                alt={item.name || item.model}
                  style={{
                  width: "90%",
                  borderRadius: "8px",
                  objectFit: "fill",
                  border: "1px solid #eee",
                  height: "350px",
                }}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "https://placekitten.com/400/400";
                }}
              />

              {/* 🔍 Lens Effect */}
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
                  }}
                ></div>
              )}
            </div>

            {/* Thumbnail Row */}
            <div className="thumbnail-row">
              {(Array.isArray(item.image_url)
                ? item.image_url
                : [item.image_url]
              ).map((img, i) => (
                <img
                  key={i}
                  src={`http://localhost:5000/${img}`}
                  alt={`thumb-${i}`}
                  className={`thumb ${
                    mainImage === `http://localhost:5000/${img}` ? "selected" : ""
                  }`}
                  onClick={() => setMainImage(`http://localhost:5000/${img}`)}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "https://placekitten.com/100/100";
                  }}
                />
              ))}
            </div>

            {/* Product Meta Info */}
            <div className="product-meta">
              <h4>Product Details</h4>
              <div className="meta-details">
                <p><strong>Category:</strong> {item.category}</p>
                <p><strong>Brand:</strong> {item.brand}</p>
                <p><strong>Stock:</strong> {item.stock || "Available"}</p>
                <p><strong>Warranty:</strong> {item.warranty || "N/A"}</p>
              </div>

              <h4 style={{ marginTop: "20px" }}>Description</h4>
              <p className="gray">{item.description || "No description available."}</p>
            </div>
          </div>

          {/* -------- Right Section -------- */}
          <div className="page-right">
            <div className="breadcrumb">
              <a href="http://localhost:5173/#/">Home</a> /{" "}
              <a href="#" onClick={() => navigate(-1)}>
                Parts
              </a>{" "}
              / <span>{category}</span>
            </div>

            <h1 className="product-title">
              {item.brand} {item.name || item.category}
            </h1>
            <p className="sponsored">Sponsored</p>

            <div className="brand-info">
              <p className="brand-para">{item.brand}</p>
              <a
                href={`http://localhost:5173/#/parts/${item.category}`}
                className="green-link"
              >
                Explore all products
              </a>
            </div>

            <div className="price-section">
              <span className="discounted">₹{item.price}</span>
              <span className="mrp">₹{Math.round(item.price * 1.2)}</span>
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

          {/* -------- Zoom Result Box -------- */}
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
                backgroundImage: `url(${mainImage})`,
                backgroundRepeat: "no-repeat",
                backgroundPosition: backgroundPosition,
                backgroundSize: "650%",
                borderRadius: "10px",
                boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
              }}
            ></div>
          )}
        </>
      )}
    </div>
  );
}

export default PartsDetailPage;
