import React, { useRef, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "../pages/Detail.css";
import logo from "../../public/Dell-logo.png";

const Detail = () => {
  const { id } = useParams();
  const [laptop, setLaptop] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState("");

  // Zoom lens states
  const imageRef = useRef(null);
  const [lensPosition, setLensPosition] = useState({ x: 0, y: 0 });
  const [showLens, setShowLens] = useState(false);
  const [backgroundPosition, setBackgroundPosition] = useState("0% 0%");

  // Fetch data
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

  // ✅ Zoom Lens Move Handler
  const handleMouseMove = (e) => {
    const imageRect = imageRef.current?.getBoundingClientRect();
    const descRect = document.querySelector(".detail-right")?.getBoundingClientRect();

    if (!imageRect || !descRect) return;

    // ✅ Description area me gaya toh lens & zoom chhupa do
    const isInDescription =
      e.clientX >= descRect.left &&
      e.clientX <= descRect.right &&
      e.clientY >= descRect.top &&
      e.clientY <= descRect.bottom;

    if (isInDescription) {
      setShowLens(false);
      return;
    }

    // ✅ Mouse image ke andar hai, toh lens move kare
    const x = e.clientX - imageRect.left;
    const y = e.clientY - imageRect.top;

    const percentX = (x / imageRect.width) * 100;
    const percentY = (y / imageRect.height) * 100;

    // Optional safety check


    setLensPosition({ x, y });
    setBackgroundPosition(`${percentX}% ${percentY}%`);
    setShowLens(true);
  };

  

  // ✅ Mouse leave kar gaya image se
  const handleMouseLeave = () => {
    setShowLens(false);
  };

  if (loading) return <h2>Loading...</h2>;
  if (!laptop) return <h2>Laptop not found</h2>;

  return (
    <div className="detail-page">
      {/* ---------------- Left Side (Image + Thumbnails) ---------------- */}
      <div
        className="detail-left"
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setShowLens(true)}
        onMouseLeave={handleMouseLeave}
      >
        <img
          ref={imageRef}
          src={selectedImage}
          alt={laptop.model}
          className="detail-img"
        />

        {/* ✅ Lens Glass */}
        {showLens && (
          <div
            className="lens"
            style={{
              left: `${lensPosition.x - 50}px`,
              top: `${lensPosition.y - 50}px`,
            }}
          ></div>
        )}

        {/* ✅ Thumbnail images */}
        <div className="thumbnail-row">
          {laptop.image_url.map((img, index) => (
            <img
              key={index}
              src={img}
              alt={`Thumbnail ${index}`}
              className={`thumbnail-img ${
                selectedImage === img ? "selected" : ""
              }`}
              onClick={() => setSelectedImage(img)}
            />
          ))}
        </div>
      </div>

      {/* ---------------- Right Side (Zoomed Image OR Info) ---------------- */}
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
        <div className="detail-right">
          <h2 className="desc">{laptop.model}</h2>
          <div  className="dell">
         <img src={logo} alt="Dell Logo" style={{ width: '45px', height: '30px' }} />
            <p>
               <a style={{color:"green"}} href="http://localhost:5173/#/brand/Dell">
                explore all dell laptops</a>
          </p>
         <div className="unit">
  <h2>Select Cpu</h2>

  <div className="cpu-options">
    <div className="ram">
      <button>{laptop.cpu} Price:{laptop.price}</button>
    </div>

    <div className="ram">
      <button>{laptop.cpu} Price:{laptop.price}</button>
    </div>
  </div>
</div>

          </div>
       

          <p className="rating">
            <b>{laptop.ratings}:</b>
            <i className="fa-solid fa-star"></i>
          </p>

          <p><b>Warranty:</b> {laptop.warranty}</p>

          <p><b>Brand:</b> {laptop.brand}</p>

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
