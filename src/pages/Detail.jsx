import React, { useRef, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "../pages/Detail.css";

const Detail = () => {
  const { id } = useParams();
  const [laptop, setLaptop] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState("");
  const [showDescription, setShowDescription] = useState(false);

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
    if (!imageRect) return;

    const x = e.clientX - imageRect.left;
    const y = e.clientY - imageRect.top;

    const percentX = (x / imageRect.width) * 100;
    const percentY = (y / imageRect.height) * 100;

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
        <div className="main-img-wrapper">
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
        </div>

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
    

      {/* ---------------- Right Side ---------------- */}
      <div className="detail-right">
        
        <h2><b>{laptop.brand} {laptop.model}</b>
          <p className="rating"><b>{laptop.ratings} ✰</b> 
        </p>
        
        </h2>
        <ul>
          <li className="highlight">CPU: {laptop.cpu}</li>
          <li className="highlight">RAM: {laptop.ram}</li>
          <li className="highlight">Category: {laptop.category}</li>
          <li style={{listStyle:"none",color:"Blue",fontWeight:"bold"}}>{laptop.availability}</li>
        </ul>
       <div>
  <p style={{ fontSize: "15px", fontWeight: "bold", color: "green", marginTop: "5px" }}>
  {laptop.brand}{" "}
  <a href={`http://localhost:5173/explore/dell-laptops#/brand/${laptop.brand}`} style={{ color: "green", textDecoration: "none", fontWeight: "bold", fontSize: "15px",display: "inline-block"}}>
    Explore all products
  </a>
</p>

</div>
        <div>
            <button className="btn-buy">Buy Now</button>
            
        </div>
           <div className="detail-header">
            <br />
        <h3>Product Details</h3>
         {/* View More Details Button */}
        <button
          className="btn-more"
          onClick={() => setShowDescription(!showDescription)}
        >
          {showDescription ? "Hide details" : "View more details"}
        </button>

        {/* Description Toggle */}
        {showDescription && (
          <div className="description">
               <h3>Specifications:</h3>
               <ul className="highlights">
          <li>CPU: {laptop.cpu}</li>
          <li>RAM: {laptop.ram}</li>  
          <li>Brand: {laptop.brand}</li>
          <li>Warranty: {laptop.storage}</li>
          <li>Storage: {laptop.warranty}</li>
          
        </ul>
            <h4>Description</h4>
            <p>{laptop.description}</p>
          </div>
        )}
      </div>

  

    
     

         
      </div>

      {showLens && (
        <div
          className="zoom-result"
          style={{
            backgroundImage: `url(${selectedImage})`,
            backgroundPosition: backgroundPosition,
            backgroundSize: "500%",
          }}
        ></div>
      )}
    </div>
  );
};

export default Detail;
