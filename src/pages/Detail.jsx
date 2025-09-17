import React, { useRef, useState, useEffect } from "react";
import { data, useParams } from "react-router-dom";
import "../pages/Detail.css";

const Detail = () => {
  const { id } = useParams();
  const [laptop, setLaptop] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState("");

  // Zoom states
  const imageRef = useRef(null);
  const [lensPosition, setLensPosition] = useState({ x: 0, y: 0 });
  const [showLens, setShowLens] = useState(false);
  const [backgroundPosition, setBackgroundPosition] = useState("0% 0%");

  // Fetch laptop data by ID
  useEffect(() => {
    fetch(`http://localhost:5000/api/getLaptop/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error(`Server error: ${res.status}`);
        return res.json();
      })
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

  // Zoom handler
  const handleMouseMove = (e) => {
    const rect = imageRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const percentX = (x / rect.width) * 100;
    const percentY = (y / rect.height) * 100;

    setLensPosition({ x, y });
    setBackgroundPosition(`${percentX}% ${percentY}%`);
    setShowLens(true);
  };

  if (loading) return <h2>Loading...</h2>;
  if (!laptop) return <h2>Laptop not found</h2>;

  return (
    <div className="detail-page" >
      {/* Left Side - Image with zoom */}
      
     <div className="detail-left"
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setShowLens(true)}
        onMouseLeave={() => setShowLense(false)}
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

  {/* Thumbnails */}
  <div className="thumbnail-row">
    {laptop.image_url.map((img, index) => (
      <img
        key={index}
        src={img}
        alt={`Thumbnail ${index}`}
        className={`thumbnail-img ${selectedImage === img ? "selected" : ""}`}
        onClick={() => setSelectedImage(img)}
      />
    ))}
  </div>
</div>


      {/* Right Side - Zoom or Product Info */}
      {showLens ? (
        <div
          className="zoom-result"
          
          style={{
            backgroundImage: `url(${selectedImage})`,
            backgroundPosition: backgroundPosition,
            backgroundSize: "200%",

          }}
        ></div>
      ) : (
        <div className="detail-right" >
        
          <h2 className="desc" >{laptop.description}</h2>

          <p className="dell">
            <a href="http://localhost:5173/#/brand/Dell">Visit The Dell Store</a>
          </p>

          <p className="rating">
            <b>{laptop.ratings}:</b>
            <i className="fa-solid fa-star"></i>
          </p>

          <p><b>Warranty:</b> {laptop.warranty}</p>

          <p>
            <b>Brand:</b> {laptop.brand}
          </p>

          <p>
            <b>Price: ₹{laptop.price}</b>
            {laptop.original_price && (
              <span style={{ textDecoration: "line-through", marginLeft: "5px", color: "grey" }}>
                ₹{laptop.original_price}
              </span>
            )}
           
          </p>

          <button className="btn-buy">Buy Now</button>
        </div>
      )}
    </div>
  );
};

export default Detail;
