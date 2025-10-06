import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import './detail.css'; // ✅ Importing CSS


function AccessoryDetailPage() {
  const { id, category } = useParams();
  const navigate = useNavigate();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [mainImage, setMainImage] = useState("");

  useEffect(() => {
    const fetchAccessory = async () => {
      try {
        const res = await fetch(
          `http://localhost:5000/api/getAccessories?category=${category}&page=1&limit=1000`
        );
        const data = await res.json();

        if (data && Array.isArray(data.data)) {
          const found = data.data.find((acc) => acc._id === id);
          if (found) {
            setItem(found);
            setMainImage(found.image_url || "https://placekitten.com/600/400");
          } else {
            setError("Accessory not found");
          }
        } else {
          setError("Invalid response from server");
        }
      } catch (err) {
        console.error(err);
        setError("Failed to fetch accessory");
      } finally {
        setLoading(false);
      }
    };

    fetchAccessory();
  }, [id, category]);

  if (loading) return <p style={{ textAlign: "center" }}>Loading...</p>;
  if (error) return <p style={{ textAlign: "center", color: "red" }}>{error}</p>;

  return (
    <div className="container">
      
      {item && (
        <>
          {/* Left Section */}
          <div className="page-left">
            <img
              src={mainImage}
              alt={item.model || item.type}
              className="main-image"
            />

            <div className="thumbnail-row">
              {[item.image_url, item.image_url, item.image_url,item.image_url].map((img, i) => (
                <img
                  key={i}
                  src={img || "https://placekitten.com/100/100"}
                  alt={`thumb-${i}`}
                  className={`thumb ${mainImage === img ? 'selected' : ''}`}
                  onClick={() => setMainImage(img)}
                />
              ))}
            </div>
             <div className="product-meta">
              <h4>Product Details</h4>
              <div className="meta-details">
                <p><strong>Type:</strong> {item.type}</p>
                <p><strong>Availability:</strong> {item.availability}</p>
                <p><strong>Warranty:</strong> {item.warranty}</p>
              </div>

              <h4 style={{ marginTop: "20px" }}>Description</h4>
              <p className="gray">{item.description || "No description available."}</p>
            </div>

          </div>

          {/* Right Section */}
          <div className="page-right">
            <div className="breadcrumb">
              <a href="http://localhost:5173/#/">Home</a> /{" "}
              <a href="http://localhost:5173/accessories#/accessories/">Accessories</a> / <span>{category}</span>
            </div>

            <h1 className="product-title">{item.brand} {item.name || item.category}</h1>
            <p className="sponsored">Sponsored</p>

            <div className="brand-info">
          <p className="brand-para">{item.brand}</p>
          <a
            href={`http://localhost:5173/accessories#/accessories/${item.category}`}
            className="green-link"
          >
            Explore all products
          </a>
        </div>

            <div className="price-section">
              <span className="discounted">₹{item.price}</span>
              <span className="mrp">₹{Math.round(item.price * 1.2)}</span>
              <span className="badge">20% OFF</span>
            </div>

            <button className="buy-btn">Buy Now</button>

              <div className="why-shop">
          <h4>Why shop from humanoid maker?</h4>
          <ul>
            <li><strong>Trusted Quality</strong> – Every product is checked.</li>
            <li><strong>Fair Prices</strong> – No hidden fees.</li>
            <li><strong>Expert Support</strong> – Tech specialists ready.</li>
            <li><strong>Eco-Friendly</strong> – We recycle to cut e-waste.</li>
          </ul>
        </div>
          </div>
        </>
      )}
    </div>
  );
}

export default AccessoryDetailPage;
