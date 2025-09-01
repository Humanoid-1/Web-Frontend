import React, { useRef, useState } from "react";
import { useParams } from "react-router-dom";
import laptops from "../data/laptops";
import "../pages/Detail.css";

const Detail = () => {
  const { id } = useParams();
  const laptop = laptops.find((l) => l._id === id);
  const imageRef = useRef(null);
  const [lensPosition, setLensPosition] = useState({ x: 0, y: 0 });
  const [showLens, setShowLens] = useState(false);
  const [backgroundPosition, setBackgroundPosition] = useState("0% 0%");

  if (!laptop) return <h2>Laptop not found</h2>;

  const handleMouseMove = (e) => {
    const rect = imageRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const percentX = (x / rect.width) * 100;
    const percentY = (y / rect.height) * 100;

    setLensPosition({ x, y });
    setBackgroundPosition(`${percentX}% ${percentY}%`);
  };

  return (
    <div className="detail-page">
      {/* Left: Main Image with Lens */}
      <div
        className="detail-left"
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setShowLens(true)}
        onMouseLeave={() => setShowLens(false)}
      >
        <img
          ref={imageRef}
          src={laptop.image_url[0]}
          alt={laptop.model}
          className="detail-img"
        />
        {showLens && (
          <div
            className="lens"
            style={{
              left: `${lensPosition.x - 50}px`,
              top: `${lensPosition.y - 50}px`,
            }}
          ></div>
        )}
      </div>

      {/* Right: Zoomed Image */}
{showLens && (
  <div
    className="zoom-result"
    style={{
      backgroundImage: `url(${laptop.image_url[0]})`,
      backgroundPosition: backgroundPosition,
      backgroundSize: "300%", // Adjust zoom level
    }}
  ></div>
)}


      {/* Product Info */}
      <div className="detail-right">
        <h1>{laptop.model}</h1>
        <p className="desc">{laptop.description}</p>
        <p className="dell">
          <a href="https://www.dell.com/en-in/shop">Visit The Dell Store</a>
        </p>
        <p><b>Brand:</b> {laptop.brand}</p>
        <p><b>Price:</b> ₹{laptop.price}</p>
        <button className="btn-buy">Buy Now</button>
      </div>
    </div>
  );
};

export default Detail;
