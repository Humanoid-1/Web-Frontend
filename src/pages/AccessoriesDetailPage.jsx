import React, { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./Detail.css";
import Cart from "./Cart";

function AccessoryDetailPage() {
  const { id, accessories: category } = useParams();
  const navigate = useNavigate();

  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [mainImage, setMainImage] = useState("");

  const [cartOpen, setCartOpen] = useState(false);

  const imageRef = useRef(null);
  const [lensPosition, setLensPosition] = useState({ x: 0, y: 0 });
  const [showLens, setShowLens] = useState(false);
  const [backgroundPosition, setBackgroundPosition] = useState("0% 0%");

  const BASE_URL = import.meta.env.VITE_API_URL;

  const DEFAULT_IMAGE = "https://via.placeholder.com/400x300?text=No+Image";

  const getImageUrl = (img) => {
    if (!img) return DEFAULT_IMAGE;
    if (img.startsWith("http")) return img;
    return `${BASE_URL}/${img.replace(/^\/+/, "")}`;
  };

  useEffect(() => {
    const fetchAccessory = async () => {
      try {
        const res = await fetch(`${BASE_URL}/api/getAccessory/${id}`);
        const json = await res.json();
        const data = json.data || json;

        if (!data) throw new Error("Accessory not found");

        setItem(data);

        const firstImage =
          Array.isArray(data.image_url) && data.image_url.length > 0
            ? getImageUrl(data.image_url[0])
            : DEFAULT_IMAGE;

        setMainImage(firstImage);
      } catch (err) {
        setError("Accessory not found");
      } finally {
        setLoading(false);
      }
    };

    fetchAccessory();
  }, [id]);

  const handleMouseMove = (e) => {
    const rect = imageRef.current?.getBoundingClientRect();
    if (!rect) return;

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setLensPosition({ x, y });
    setBackgroundPosition(
      `${(x / rect.width) * 100}% ${(y / rect.height) * 100}%`
    );
    setShowLens(true);
  };

  const handleMouseLeave = () => setShowLens(false);

  const handleAddToCart = () => {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    const normalizedImages = Array.isArray(item.image_url)
      ? item.image_url.map((img) => getImageUrl(img))
      : [getImageUrl(item.image_url)];

    const cartItem = {
      ...item,
      image_url: normalizedImages,
      qty: 1,
    };

    const existingItem = cart.find((c) => c._id === item._id);

    if (existingItem) {
      existingItem.qty += 1;
    } else {
      cart.push(cartItem);
    }

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
            <div className="page-left">
              <div
                className="main-img-wrapper"
                onMouseMove={handleMouseMove}
                onMouseEnter={() => setShowLens(true)}
                onMouseLeave={handleMouseLeave}
              >
                <img
                  ref={imageRef}
                  src={mainImage}
                  alt={item.name}
                  className="main-image"
                  onError={(e) => (e.target.src = DEFAULT_IMAGE)}
                />

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

              <div className="thumbnail-row">
                {(Array.isArray(item.image_url)
                  ? item.image_url
                  : [item.image_url]
                ).map((img, i) => {
                  const fixedImg = getImageUrl(img);
                  return (
                    <img
                      key={i}
                      src={fixedImg}
                      className={`thumb ${
                        mainImage === fixedImg ? "selected" : ""
                      }`}
                      onClick={() => setMainImage(fixedImg)}
                    />
                  );
                })}
              </div>

              <div className="product-meta">
                <h4>Product Details</h4>
                <p>
                  <strong>Category:</strong> {item.category}
                </p>
                <p>
                  <strong>Availability:</strong>{" "}
                  {item.inStock ? "In Stock" : "Out of Stock"}
                </p>
                <p className="gray">{item.description}</p>
              </div>
            </div>

            {/* -------- Right Section -------- */}
            <div className="page-right">
              {/* Normal content (hidden on hover) */}
              <div className={`right-content ${showLens ? "hidden" : ""}`}>
                <h1 className="product-title">
                  {item.brand} {item.name}
                </h1>

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
                    <li>
                      <strong>Trusted Quality</strong> – Every product is checked.
                    </li>
                    <li>
                      <strong>Fair Prices</strong> – No hidden fees.
                    </li>
                    <li>
                      <strong>Expert Support</strong> – Tech specialists ready.
                    </li>
                    <li>
                      <strong>Eco-Friendly</strong> – We recycle to cut e-waste.
                    </li>
                  </ul>
                </div>
              </div>

              {/* Zoom overlay (shows only on hover) */}
              {showLens && (
                <div
                  className="zoom-preview overlay"
                  style={{
                    backgroundImage: `url(${mainImage})`,
                    backgroundPosition,
                  }}
                />
              )}
            </div>
          </>
        )}
      </div>

      {cartOpen && <Cart onClose={() => setCartOpen(false)} />}
    </>
  );
}

export default AccessoryDetailPage;
