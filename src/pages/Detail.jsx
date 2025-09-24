import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../pages/Detail.css";

const Detail = () => {
  const { id } = useParams();
  const [laptop, setLaptop] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState("");
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    fetch(`http://localhost:5000/api/getLaptop/${id}`)
      .then((res) => res.json())
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
    <div className="container">
      {/* Left: Image Section */}
      <div className="page-left">
        <img src={selectedImage} alt={laptop.model} className="main-image" />
        <div className="thumbnail-row">
          {laptop.image_url.map((img, index) => (
            <img
              key={index}
              src={img}
              alt={`Thumb ${index}`}
              className={`thumb ${selectedImage === img ? "selected" : ""}`}
              onClick={() => setSelectedImage(img)}
            />
          ))}
        </div>

        {/* Product Details below image (like macOS shown below images) */}
        <div className="product-meta">
          <strong>Product Details</strong>
          
            <div className="meta-details">
              <p><strong>CPU:</strong> {laptop.cpu}</p>
              <p><strong>RAM:</strong> {laptop.ram}</p>
              <p><strong>Storage:</strong> {laptop.storage}</p>
              <p><strong>Warranty:</strong> {laptop.warranty}</p>
              <p><strong>Description:</strong> {laptop.description}</p>
            </div>
          
        </div>
      </div>

      {/* Right: Info Panel */}
      <div className="page-right" style={{fontSize: '34px'}}>
        <nav className="breadcrumb">Home / Appliances / {laptop.brand} {laptop.model}</nav>
        <h1 className="product-title">
          {laptop.brand}  {laptop.model} ({laptop.cpu},{laptop.connectivity}{laptop.ram}, {laptop.storage})
        </h1>
        <p className="sponsored">Sponsored</p>

        <div className="brand-info">
          
          <p className="brand-para">{laptop.brand}</p>
          
          <a href={`http://localhost:5173/#/brand/${laptop.brand}`} className="green-link">Explore all products</a>
        </div>

        <div className="price-section">
          <span className="discounted">₹{laptop.price}</span>
          <span className="mrp">{laptop.discount_price}</span>
          <span className="badge">5% OFF</span>
        </div>

        <button className="buy-btn">Buy Now</button>

        <div className="why-shop">
          <h4>Why shop from humanoid maker ?</h4>
          <ul>
            
            <li><strong>Trusted Quality</strong> 
           <div> <p>Every product is checked for performance and durability.</p></div>
            </li>
            <li> <strong>Fair Prices</strong>
               <div> <p>Transparent pricing — no hidden fees.</p></div></li>
            <li>  <strong>Expert Support</strong>
               <div><p>Tech specialists ready to help you pick or repair.</p></div></li>
                <li>
                   <strong>Eco-Friendly</strong>
               <div> <p>We refurbish and recycle to cut down e‑waste.</p></div>
                </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Detail;
