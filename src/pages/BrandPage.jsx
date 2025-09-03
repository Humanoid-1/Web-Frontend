import React, { useEffect, useState } from "react";
import DetailPage from "./Detail";
import { Link } from 'react-router-dom';

function BrandPage() {
  const [laptops, setLaptops] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [brand, setBrand] = useState(null); // Default brand
  
  // ✅ Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12; // ek page me kitne laptops dikhane hain

  useEffect(() => {
    const fetchLaptops = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(
          `http://localhost:5000/api/getLaptopsByBrand/${brand}`
        );
        const data = await response.json();
        setLaptops(Array.isArray(data.data) ? data.data : []);
        setCurrentPage(1); // ✅ brand change hone par hamesha first page pe le aao
      } catch (err) {
        setError(err.message || "Error fetching laptops");
        setLaptops([]);
      } finally {
        setLoading(false);
      }
    };

    fetchLaptops();
  }, [brand]);

  const brands = [
    "Dell",
    "HP",
    "Lenovo",
    "Asus",
    "Acer",
    "Apple",
    "MSI",
    "Samsung",
    "Microsoft",
    "Sony",
    "LG",
    "Huawei",
    "Google"
  ];

  // ✅ Pagination Logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentLaptops = laptops.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(laptops.length / itemsPerPage);

  // ✅ AccessoriesPage wali Pagination logic (with ellipses)
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
          color: #333;
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
        .details-btn{
          text-align: center;
          margin-top: auto;
          padding: 10px 0;
          border: none;
          border-radius: 8px;
          background: linear-gradient(90deg, #3498db, #2a82bdff);
          color: #fff;
          font-weight: 600;
          cursor: pointer;
          width: 100%;
          font-size: 1rem;
          transition: all 0.25s ease;
          box-shadow: 0 3px 10px rgba(40,167,69,0.2);
        }
        .details-btn:hover {
          background: linear-gradient(90deg, #2a82bdff, #2a82bdff);
          box-shadow: 0 6px 18px rgba(40,167,69,0.25);
          transform: translateY(-2px);
        }
        /* Pagination */
        .pagination {
          display: flex;
          justify-content: center;
          margin-top: 24px;
          gap: 6px;
          flex-wrap: wrap;
        }
        .pagination button {
          padding: 6px 12px;
          border: 1px solid #ccc;
          border-radius: 6px;
          background: white;
          cursor: pointer;
          font-weight: 600;
          transition: all 0.2s ease-in-out;
        }
        .pagination button.active {
          background: #007BFF;
          color: white;
        }
        .pagination button:disabled {
          background: #eee;
          cursor: not-allowed;
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px) scale(0.95); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
      `}</style>

      <h1 className="brand-title"> Laptops by Brands</h1>

      {/* Brand Filter Buttons */}
      <div className="brand-buttons">
        {brands.map((b) => (
          <button
            key={b}
            onClick={() => setBrand(b)}
            className={`brand-btn${brand === b ? " selected" : ""}`}
          >
            {b}
          </button>
        ))}
      </div>

      {/* Loading / Error */}
      {loading && <p style={{ textAlign: "center" }}>⏳ Loading...</p>}
      {error && (
        <p style={{ color: "red", textAlign: "center" }}>{error}</p>
      )}
      {!loading && laptops.length === 0 && (
        <p style={{ textAlign: "center" }}>
          No laptops found for <b>{brand}</b>.
        </p>
      )}

      {/* Laptop Grid */}
      <div className="laptop-grid">
        {currentLaptops.map((laptop, index) => (
          <div
            key={laptop._id}
            className="laptop-card"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            {laptop.image_url && (
              <img
                src={laptop.image_url[0]}
                alt={laptop.model}
                className="laptop-img"
              />
            )}
            <h3 className="laptop-title">{laptop.model}</h3>
            <p className="laptop-brand">Brand: <b>{laptop.brand}</b></p>
            <p className="laptop-price">₹{laptop.price}</p>
            <div className="laptop-specs">
              <p><b>CPU:</b> {laptop.CPU}</p>
              <p><b>RAM:</b> {laptop.RAM}</p>
              <p><b>Storage:</b> {laptop.Storage}</p>
              <p><b>GPU:</b> {laptop.GPU}</p>
            </div>

          <div className="details-btn">
            <Link to={`/Detail/${laptop._id}`} style={{ color: '#fff', textDecoration: 'none' }}>View details</Link>
              
            </div>          
          </div>
        ))}
      </div>

      {/* ✅ AccessoriesPage wali Pagination */}
      {totalPages > 1 && (
        <div className="pagination">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            Prev
          </button>

          {getPageNumbers().map((page, index) =>
            page === "left-ellipsis" || page === "right-ellipsis" ? (
              <span key={index} style={{ padding: "6px 12px" }}>...</span>
            ) : (
              <button
                key={index}
                onClick={() => setCurrentPage(page)}
                className={currentPage === page ? "active" : ""}
              >
                {page}
              </button>
            )
          )}

          <button
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}

export default BrandPage;
