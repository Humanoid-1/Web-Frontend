// src/pages/Detail.jsx
import React from "react";
import { useParams } from "react-router-dom";
import laptops from "../data/laptops"; // JSON data import
import "../pages/Detail.css"; // CSS import

const Detail = () => {
  const { id } = useParams(); // URL se id nikali
  const laptop = laptops.find((l) => l._id === id); // sirf ek laptop find kiya

  if (!laptop) {
    return <h2>Laptop not found!</h2>;
  }

  return (
    <div className="detail-page">
      {/* Left Side Image */}
      <div className="detail-left">
        <img
          src={laptop.image_url[0]}
          alt={laptop.model}
          className="detail-img"
        />
      </div>

      {/* Right Side Description */}
      <div className="detail-right">
        <h1>{laptop.model}</h1>
        <p className="desc">{laptop.description}</p>
        <p><b>Brand:</b> {laptop.brand}</p>
        
        
        <p><b>Price:</b> ₹{laptop.price}</p>
      

       <div>
      
       </div>

        

        <div className="buttons">
          <button className="btn-buy">Buy Now</button>
          
        </div>
      </div>
    </div>
  );
};

export default Detail;
