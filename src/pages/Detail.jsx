import React, { useRef, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "../pages/Detail.css";
import axios from "axios";
import { MdModeFanOff } from "react-icons/md";

const Detail = () => {
  const { id } = useParams();
  const [laptop, setLaptop] = useState(null);
  const [loading, setLoading] = useState(true);

  const imageRef = useRef(null);
  const [lensPosition, setLensPosition] = useState({ x: 0, y: 0 });
  const [showLens, setShowLens] = useState(false);
  const [backgroundPosition, setBackgroundPosition] = useState("0% 0%");
  const [selectedImage, setSelectedImage] = useState("");

  // Fetch laptop by id
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



  if (loading) return <h2>Loading...</h2>;
  if (!laptop) return <h2>Laptop not found</h2>;

return (
   

  <div className="detail-container">
     
     
    <div className="detail-image-container">
      <img 
        src={selectedImage} 
        alt={laptop.model} 
        className="detail-image" 
      />
    </div>

   
    
    <div className="detail-info">
      <h3><strong>{laptop.description}</strong></h3>
      
      <p><strong>Ratings:</strong>{laptop.ratings } ⭐</p>
      <p><strong>model:</strong> {laptop.model}</p>
      <p><strong>warranty:</strong> {laptop.warranty}</p>
      <p><strong>Price:</strong> ₹{laptop.price}</p>
      
      
    </div>
    <div>
      <button className="btn">Buy Now</button>
      
    </div>
   
  </div>
);

};

export default Detail;
