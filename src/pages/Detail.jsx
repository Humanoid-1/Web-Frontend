// src/pages/Detail.jsx
import React from "react";
import { useParams } from "react-router-dom";
import laptops from "../data/laptops"; // JSON data import
import "../pages/Detail.css"; // CSS import

const Detail = () => {
  const { id } = useParams(); 
  const laptop = laptops.find((l) => l._id === id); 

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
        <p className="dell"><a href="https://www.dell.com/en-in/shop/scc/sc/storage-products?gacd=9688261-13116-5761040-271777130-0&dgc=ST&gclsrc=aw.ds&&gad_source=1&gad_campaignid=21050801659&gbraid=0AAAAAC3OuyD31Ij-WrnxyaiuTv1aigXBx&gclid=EAIaIQobChMI_sfutOu2jwMV9KNmAh3bgwoEEAAYASAAEgIsovD_BwE">visit the dell store</a></p>
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
