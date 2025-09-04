import React, { useRef, useState } from "react";
import { useParams } from "react-router-dom";
import laptops from "../data/laptops";
import "../pages/Detail.css";
import { MdModeFanOff } from "react-icons/md";

const Detail = () => {
  const { id } = useParams();
  const laptop = laptops.find((l) => l._id === id);
  const imageRef = useRef(null);
  const [lensPosition, setLensPosition] = useState({ x: 0, y: 0 });
  const [showLens, setShowLens] = useState(false);
  const [backgroundPosition, setBackgroundPosition] = useState("0% 0%");
  const [selectedImage, setSelectedImage] = useState(laptop.image_url[0]);

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
          src={selectedImage}
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
      <div className="thumbnails">
  {laptop.image_url.map((img, index) => (
    <img
      key={index}
      src={img}
      alt="thumbnail"
      className={`thumb-img ${selectedImage === img ? "active" : ""}`}
      onClick={() => setSelectedImage(img)}
    />
  ))}
</div>


      {/* Right: Zoom box OR Product Info */}
      {showLens ? (
        <div
          className="zoom-result"
          style={{
            backgroundImage: `url(${selectedImage})`,
            backgroundPosition: backgroundPosition,
            backgroundSize: "350%", // zoom level
          }}
        ></div>
      ) : (
        <div className="detail-right">
          <h1>{laptop.model}</h1>
          <p className="desc">{laptop.description}</p>
        
          <p className="dell">
            <a href="https://www.dell.com/en-in/shop">Visit The Dell Store</a>
          </p>
            <p className="rating"><b>4.0:</b>
            <i class="fa-solid fa-star"></i>
             <i class="fa-solid fa-star"></i>
              <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
          </p>
          <p>
            <b>Brand:{laptop.brand}</b> 
          </p>
          <p>
            <b>Price:₹{laptop.price}</b> 
            {laptop.original_price && (
              <span style={{ textDecoration: "line-through", marginLeft: "5px", color:"grey" }}>
                ₹{laptop.original_price}
              </span>
            )}
            <b style={{color:"darkgreen"}}> {laptop.discount} </b>
          </p>


        
          <button className="btn-buy">Buy Now</button>
        </div>
      )}
    </div>
  );           
};

export default Detail;
