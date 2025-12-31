import React, { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./Detail.css";
import Cart from "./Cart";

function PartsDetailPage() {
  const { id, category } = useParams();
  const navigate = useNavigate();

  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [mainImage, setMainImage] = useState("");
  const [cartOpen, setCartOpen] = useState(false);

  // 🔍 Zoom states
  const imageRef = useRef(null);
  const [lensPosition, setLensPosition] = useState({ x: 0, y: 0 });
  const [showLens, setShowLens] = useState(false);
  const [backgroundPosition, setBackgroundPosition] = useState("0% 0%");

  const BASE_URL = "http://localhost:5000";
  const DEFAULT_IMAGE = "https://via.placeholder.com/400x300?text=No+Image";

  const getImageUrl = (img) => {
    if (!img) return DEFAULT_IMAGE;
    if (img.startsWith("http")) return img;
    return `${BASE_URL}/${img.replace(/^\/+/, "")}`;
  };

  useEffect(() => {
    const fetchPart = async () => {
      try {
        const res = await fetch(`${BASE_URL}/api/getPart/${id}`);
        const data = await res.json();
        if (!data) throw new Error("Part not found");
        setItem(data);
        const firstImage =
          Array.isArray(data.image_url) && data.image_url.length > 0
            ? getImageUrl(data.image_url[0])
            : DEFAULT_IMAGE;
        setMainImage(firstImage);
      } catch {
        setError("Part not found");
      } finally {
        setLoading(false);
      }
    };
    fetchPart();
  }, [id]);

  // 🔍 Zoom movement
  const handleMouseMove = (e) => {
    const rect = imageRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setLensPosition({ x, y });
    setBackgroundPosition(`${(x / rect.width) * 100}% ${(y / rect.height) * 100}%`);
    setShowLens(true);
  };
  const handleMouseLeave = () => setShowLens(false);

  // ✅ Add to cart
  const handleAddToCart = () => {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const normalizedImages = Array.isArray(item.image_url)
      ? item.image_url.map((img) => getImageUrl(img))
      : [getImageUrl(item.image_url)];

    const cartItem = { ...item, image_url: normalizedImages, qty: 1 };
    const existingItem = cart.find((c) => c._id === item._id);
    if (existingItem) existingItem.qty += 1;
    else cart.push(cartItem);
    localStorage.setItem("cart", JSON.stringify(cart));
    window.dispatchEvent(new Event("cartUpdated"));
    setCartOpen(true);
  };

  if (loading) return <p style={{ textAlign: "center" }}>Loading...</p>;
  if (error) return <p style={{ textAlign: "center", color: "red" }}>{error}</p>;

  return (
    <>
      <div className={`container ${cartOpen ? "detail-blur" : ""}`}>
        {item && (
          <>
            {/* -------- Left Section -------- */}
            <div className="page-left" style={{ position: "relative" }}>
              <div
                className="main-img-wrapper"
                onMouseMove={handleMouseMove}
                onMouseEnter={() => setShowLens(true)}
                onMouseLeave={handleMouseLeave}
              >
                <img
                  ref={imageRef}
                  src={mainImage}
                  alt={item.name || item.model}
                  className="main-image"
                  style={{ height: "350px" }}
                  onError={(e) => (e.target.src = DEFAULT_IMAGE)}
                />

                {/* Lens */}
                {showLens && (
                  <div
                    className="lens"
                    style={{
                      left: `${lensPosition.x - 50}px`,
                      top: `${lensPosition.y - 50}px`,
                    }}
                  />
                )}
              </div>

              {/* Zoom Preview (placed outside main image) */}
              {/* Zoom Preview (placed outside main image) */}
{showLens && mainImage !== DEFAULT_IMAGE && (
  <div
    className="zoom-preview"
    style={{
      top: "0",
      left: "105%",        // right of main image
      width: "500px",      // increased width
      height: "500px",     // increased height
      backgroundImage: `url(${mainImage})`,
      backgroundPosition,
      backgroundSize: "700%", // optional: increase zoom level
    }}
  />
)}


              {/* Thumbnails */}
              <div className="thumbnail-row">
                {(Array.isArray(item.image_url) ? item.image_url : [item.image_url]).map((img, i) => {
                  const fixedImg = getImageUrl(img);
                  return (
                    <img
                      key={i}
                      src={fixedImg}
                      className={`thumb ${mainImage === fixedImg ? "selected" : ""}`}
                      onClick={() => setMainImage(fixedImg)}
                    />
                  );
                })}
              </div>

              {/* Product Meta */}
              <div className="product-meta">
                <h4>Product Details</h4>
                <p><strong>Category:</strong> {item.category}</p>
                <p><strong>Brand:</strong> {item.brand}</p>
                <p className="gray">{item.description}</p>
              </div>
            </div>

            {/* -------- Right Section -------- */}
            <div className="page-right">
              <h1 className="product-title">{item.brand} {item.name || item.category}</h1>

              <div className="price-section">
                <span className="discounted">₹{item.price}</span>
                <span className="mrp">₹{Math.round(item.price * 1.2)}</span>
                <span className="badge">20% OFF</span>
              </div>

              <button className="buy-btn" onClick={handleAddToCart}>
                Add to Cart
              </button>

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
          </>
        )}
      </div>

      {cartOpen && <Cart onClose={() => setCartOpen(false)} />}
    </>
  );
}

export default PartsDetailPage;
