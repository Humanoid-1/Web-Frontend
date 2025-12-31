import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import "../pages/Detail.css";
import Cart from "./Cart";

const Detail = () => {
  const { id } = useParams();

  const [laptop, setLaptop] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState("");

  const [cartOpen, setCartOpen] = useState(false);

  const imageRef = useRef(null);
  const [lensPosition, setLensPosition] = useState({ x: 0, y: 0 });
  const [showLens, setShowLens] = useState(false);
  const [backgroundPosition, setBackgroundPosition] = useState("0% 0%");

  const DEFAULT_IMAGE = "https://via.placeholder.com/400x300?text=No+Image";

  useEffect(() => {
    const fetchLaptop = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/getLaptop/${id}`);
        const data = await res.json();

        if (data?.success && data?.data) {
          setLaptop(data.data);
          setSelectedImage(
            Array.isArray(data.data.image_url) && data.data.image_url.length > 0
              ? data.data.image_url[0]
              : DEFAULT_IMAGE
          );
        } else {
          setError("Laptop not found");
        }
      } catch {
        setError("Failed to fetch laptop");
      } finally {
        setLoading(false);
      }
    };

    fetchLaptop();
  }, [id]);

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

  const handleBuyNow = () => {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const existingItem = cart.find((item) => item._id === laptop._id);

    if (existingItem) {
      existingItem.qty += 1;
    } else {
      cart.push({ ...laptop, qty: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    window.dispatchEvent(new Event("cartUpdated"));
    setCartOpen(true);
  };

  if (loading) return <h2 style={{ textAlign: "center" }}>Loading...</h2>;
  if (error) return <h2 style={{ textAlign: "center", color: "red" }}>{error}</h2>;
  if (!laptop) return <h2 style={{ textAlign: "center" }}>Laptop not found</h2>;

  return (
    <>
      <div className={`container ${cartOpen ? "detail-blur" : ""}`}>
        {/* -------- Left Section -------- */}
        <div className="page-left">
          <div
            className="main-img-wrapper"
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setShowLens(true)}
            onMouseLeave={handleMouseLeave}
          >
            <img
              ref={imageRef}
              src={selectedImage || DEFAULT_IMAGE}
              alt={laptop.model}
              className="main-image"
            />
            {showLens && selectedImage !== DEFAULT_IMAGE && (
              <div
                className="lens"
                style={{
                  left: `${lensPosition.x - 50}px`,
                  top: `${lensPosition.y - 50}px`,
                }}
              />
            )}
          </div>

          <div className="thumbnail-row">
            {(Array.isArray(laptop.image_url) ? laptop.image_url : [laptop.image_url]).map(
              (img, index) => (
                <img
                  key={index}
                  src={img || DEFAULT_IMAGE}
                  className={`thumb ${selectedImage === img ? "selected" : ""}`}
                  onClick={() => setSelectedImage(img || DEFAULT_IMAGE)}
                />
              )
            )}
          </div>
        </div>

        {/* -------- Right Section -------- */}
        <div className="page-right">
          {/* 🔍 Zoom Overlay */}
          {showLens && selectedImage !== DEFAULT_IMAGE && (
            <div
              className="zoom-preview"
              style={{
                backgroundImage: `url(${selectedImage})`,
                backgroundPosition,
              }}
            />
          )}

          <h1 className="product-title">
            {laptop.brand} {laptop.model}
          </h1>

          <div className="price-section">
            <span className="discounted">₹{laptop.price}</span>
            <span className="mrp">₹{Math.round(laptop.price * 1.2)}</span>
            <span className="badge">20% OFF</span>
          </div>

          <button className="buy-btn" onClick={handleBuyNow}>
            Add to Cart
          </button>

          <div className="why-shop">
            <h4>Why shop from humanoid maker?</h4>
            <ul>
              <li>
                <strong>Trusted Quality</strong> – Every product is checked.
              </li>
              <li><strong>Fair Prices</strong> – No hidden fees.</li>
              <li>
                <strong>Expert Support</strong> – Tech specialists ready.
              </li>
              <li>
                <strong>Eco-Friendly</strong> – We recycle to cut e-waste.
              </li>
            </ul>
          </div>
        </div>
      </div>

      {cartOpen && <Cart onClose={() => setCartOpen(false)} />}
    </>
  );
};

export default Detail;
