import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

function BrandPage() {
  const { brand: brandParam } = useParams();   // <-- brand from /brand/:brand
  const navigate = useNavigate();

  const [brand, setBrand] = useState(brandParam || "Dell");
  const [laptops, setLaptops] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 12;

  const brands = [
    "Dell", "HP", "Lenovo", "Asus", "Acer", "Apple", "MSI", "Samsung",
    "Microsoft", "Sony", "Google", "LG", "Huawei"
  ];

  // 🔹 Whenever the URL param changes, update our state and reset page
  useEffect(() => {
    if (brandParam) {
      setBrand(brandParam);
      setCurrentPage(1);
    }
  }, [brandParam]);

  // 🔹 Fetch laptops whenever brand OR page changes
  useEffect(() => {
    const fetchLaptops = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(
          `http://localhost:5000/api/getLaptopsByBrand/${brand}?page=${currentPage}&limit=${itemsPerPage}`
        );
        const data = await response.json();
        setLaptops(Array.isArray(data.data) ? data.data : []);
        setTotalPages(data.totalPages || 1);
      } catch (err) {
        setError(err.message || "Error fetching laptops");
      } finally {
        setLoading(false);
      }
    };
    fetchLaptops();
  }, [brand, currentPage]);

  // 🔹 Scroll top when page changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  // brand button click
  const handleBrandClick = (b) => {
    navigate(`/brand/${b}`); // this will update brandParam automatically
  };

   // Pagination logic
      const getPageNumbers = () => {
        const pages = [];
        const delta = 2; // Show current ±2 pages
        let left = Math.max(2, currentPage - delta);
        let right = Math.min(totalPages - 1, currentPage + delta);
    
        // Always show first page
        pages.push(1);
    
        if (left > 2) pages.push("left-ellipsis");
    
        for (let i = left; i <= right; i++) pages.push(i);
    
        if (right < totalPages - 1) pages.push("right-ellipsis");
    
        if (totalPages > 1) pages.push(totalPages);
    
        return pages;
      };

  return (
    <div className="brand-page">
      <style>{`
        .brand-page {
          padding: 32px;
          background: linear-gradient(120deg, #f9fafc 0%, #eef1f6 100%);
          min-height: 100vh;
          font-family: 'Segoe UI', 'Roboto', Arial, sans-serif;
        }
        .brand-title {
          margin-bottom: 32px;
          font-size: 2.5rem;
          font-weight: 700;
          color: #22223b;
          text-align: center;
        }
        .brand-buttons {
          margin-bottom: 32px;
          display: flex;
          flex-wrap: wrap;
          gap: 14px;
          justify-content: center;
        }
        .brand-btn {
          padding: 10px 22px;
          border: none;
          border-radius: 20px;
          background: #f0f0f0;
          color: #333;
          font-weight: 600;
          cursor: pointer;
          font-size: 0.95rem;
          box-shadow: 0 3px 10px rgba(0,0,0,0.08);
          transition: all 0.25s ease-in-out;
        }
        .brand-btn.selected,
        .brand-btn:hover {
          background: linear-gradient(90deg, #3498db, #0056b3);
          color: #fff;
          box-shadow: 0 6px 20px rgba(0,123,255,0.2);
          transform: translateY(-3px) scale(1.05);
        }
        .laptop-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 28px;
        }
        .laptop-card {
          border-radius: 16px;
          padding: 20px;
          background: #fff;
          box-shadow: 0 6px 16px rgba(0,0,0,0.08);
          display: flex;
          flex-direction: column;
          align-items: center;
          position: relative;
          overflow: hidden;
          transform: scale(0.97);
          opacity: 0;
          animation: fadeInUp 0.6s forwards;
        }
        .laptop-card:hover {
          box-shadow: 0 10px 28px rgba(0,0,0,0.15);
          transform: scale(1.02) translateY(-4px);
        }
        .laptop-img {
          max-width: 200px;
          height: 130px;
          object-fit: contain;
          margin-bottom: 15px;
          border-radius: 12px;
          background: #f9f9f9;
          box-shadow: inset 0 2px 6px rgba(0,0,0,0.05);
        }
        .laptop-title {
          font-size: 1.2rem;
          font-weight: 600;
          color: #222;
          margin-bottom: 6px;
          text-align: center;
        }
        .laptop-brand {
          font-size: 0.95rem;
          color: #666;
        }
        .laptop-price {
          margin: 12px 0;
          font-size: 1.3rem;
          font-weight: 700;
          color: #000;
        }
        .laptop-specs {
          font-size: 0.9rem;
          color: #444;
          width: 100%;
          background: #f8f9fa;
          border-radius: 8px;
          padding: 10px 14px;
          margin-bottom: 10px;
        }
        .details-btn {
          margin-top: auto;
          padding: 10px 0;
          border: none;
          border-radius: 8px;
          background: linear-gradient(90deg, #3498db, #2a82bdff);
          color: #fff;
          font-weight: 600;
          cursor: pointer;
          width: 100%;
          text-align: center;
          text-decoration: none;
          font-size: 1rem;
          transition: all 0.25s ease;
          box-shadow: 0 3px 10px rgba(40,167,69,0.2);
        }
        .details-btn:hover {
          background: linear-gradient(90deg, #2a82bdff, #2a82bdff);
          box-shadow: 0 6px 18px rgba(40,167,69,0.25);
          transform: translateY(-2px);
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px) scale(0.95); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        @media (max-width: 600px) {
          .brand-title { font-size: 1.7rem; }
          .laptop-card { padding: 14px; }
          .laptop-img { max-width: 140px; height: 90px; }
        }
      `}</style>

      <h1 className="brand-title">Laptops by Brand</h1>

      {/* Brand Buttons */}
      <div className="brand-buttons">
        {brands.map((b) => (
          <button
            key={b}
            onClick={() => handleBrandClick(b)}
            className={`brand-btn${brand === b ? " selected" : ""}`}
          >
            {b}
          </button>
        ))}
      </div>

      {/* Loading / Error */}
      {loading && <p style={{ textAlign: "center", fontSize: "1.1rem" }}>⏳ Loading...</p>}
      {error && <p style={{ color: "#d90429", textAlign: "center", fontWeight: "bold" }}>{error}</p>}
      {!loading && laptops.length === 0 && (
        <p style={{ textAlign: "center", fontSize: "1.1rem" }}>
          No laptops found for <b>{brand}</b>.
        </p>
      )}

      {/* Laptop Grid */}
      <div className="laptop-grid">
        
        {laptops.map((laptop, index) => (
          <Link to={`/Detail/${laptop._id}`}>
          <div
            key={laptop._id || index}
            className="laptop-card"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            {laptop.image_url?.length > 0 && (
              <img
                src={laptop.image_url[0]}
                alt={laptop.model}
                className="laptop-img"
              />
            )}
            <h3 className="laptop-title">{laptop.model}</h3>
            <p className="laptop-brand">
              Brand: <b>{laptop.brand}</b>
            </p>
            <p className="laptop-price">₹{laptop.price}</p>
            <div className="laptop-specs">
              <p><b>CPU:</b> {laptop.cpu}</p>
              <p><b>RAM:</b> {laptop.ram}</p>
              <p><b>Storage:</b> {laptop.storage}</p>
              
            </div>
            
            <button className="details-btn">See Details</button>

           
          </div>
         </Link>
        ))}
      </div>
       {/* Pagination */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "30px",
          gap: "6px",
          flexWrap: "wrap",
        }}
      >
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          style={{
            padding: "6px 12px",
            border: "1px solid #ccc",
            borderRadius: "6px",
            background: currentPage === 1 ? "#eee" : "white",
            cursor: currentPage === 1 ? "not-allowed" : "pointer",
          }}
        >
          Prev
        </button>

        {getPageNumbers().map((page, index) =>
          page === "left-ellipsis" || page === "right-ellipsis" ? (
            <span key={index} style={{ padding: "6px 12px" }}>
              ...
            </span>
          ) : (
            <button
              key={index}
              onClick={() => setCurrentPage(page)}
              style={{
                padding: "6px 12px",
                border: "1px solid #ccc",
                borderRadius: "6px",
                background: currentPage === page ? "#007BFF" : "white",
                color: currentPage === page ? "white" : "black",
                cursor: "pointer",
              }}
            >
              {page}
            </button>
          )
        )}

        <button
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
          style={{
            padding: "6px 12px",
            border: "1px solid #ccc",
            borderRadius: "6px",
            background: currentPage === totalPages ? "#eee" : "white",
            cursor: currentPage === totalPages ? "not-allowed" : "pointer",
          }}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default BrandPage;
