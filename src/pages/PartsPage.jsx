import { useEffect, useState, useRef } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

function PartsPage() {
  const { category: categoryParam } = useParams();
  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);

  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);

  const [parts, setParts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 12;

  const categoryDropdownRef = useRef();
  const brandDropdownRef = useRef();
  const [categoryOpen, setCategoryOpen] = useState(false);
  const [brandOpen, setBrandOpen] = useState(false);

  useEffect(() => {
    fetch("http://localhost:5000/api/getPartCategories")
      .then(res => res.json())
      .then(data => {
        if (data.success && Array.isArray(data.categories)) {
          setCategories(data.categories);
        }
      });
  }, []);

  useEffect(() => {
    fetch("http://localhost:5000/api/getPartBrands")
      .then(res => res.json())
      .then(data => {
        if (data.success && Array.isArray(data.brands)) {
          setBrands(["All", ...data.brands]);
        }
      });
  }, []);

  useEffect(() => {
    const fetchParts = async () => {
      setLoading(true);
      setError(null);
      try {
     let query = `page=${currentPage}&limit=${itemsPerPage}`;

// Send empty string for "All" so backend returns all items
query += `&category=${selectedCategories.length ? selectedCategories.join(",") : ""}`;
query += `&brand=${selectedBrands.length ? selectedBrands.join(",") : ""}`;

const res = await fetch(`http://localhost:5000/api/getParts?${query}`);
const data = await res.json();

setParts(Array.isArray(data.data) ? data.data : []);
setTotalPages(data.totalPages || 1);

      } catch {
        setError("Failed to fetch parts");
      } finally {
        setLoading(false);
      }
    };
    fetchParts();
  }, [selectedCategories, selectedBrands, currentPage]);

  useEffect(() => {
    const close = (e) => {
      if (categoryDropdownRef.current && !categoryDropdownRef.current.contains(e.target))
        setCategoryOpen(false);
      if (brandDropdownRef.current && !brandDropdownRef.current.contains(e.target))
        setBrandOpen(false);
    };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);

  const toggleCategory = (c) => {
    if (c === "All") setSelectedCategories([]);
    else setSelectedCategories(p => p.includes(c) ? p.filter(x => x !== c) : [...p, c]);
    setCurrentPage(1);
  };

  const toggleBrand = (b) => {
    if (b === "All") setSelectedBrands([]);
    else setSelectedBrands(p => p.includes(b) ? p.filter(x => x !== b) : [...p, b]);
    setCurrentPage(1);
  };

  // Pagination helper similar to AccessoriesPage
  const getPageNumbers = () => {
    const pages = [];
    const delta = 2;
    let left = Math.max(2, currentPage - delta);
    let right = Math.min(totalPages - 1, currentPage + delta);

    pages.push(1);
    if (left > 2) pages.push("left-ellipsis");
    for (let i = left; i <= right; i++) pages.push(i);
    if (right < totalPages - 1) pages.push("right-ellipsis");
    if (totalPages > 1) pages.push(totalPages);
    return pages;
  };

  if (loading) return <p style={{ textAlign: "center", marginTop: 40 }}>⏳ Loading...</p>;
  if (error) return <p style={{ textAlign: "center", marginTop: 40, color: "red" }}>{error}</p>;

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
        .filter-row {
          display: flex;
          justify-content: center;
          gap: 20px;
          margin-bottom: 32px;
        }
        .dropdown-box {
          padding: 10px 25px;
          border-radius: 6px;
          border: 1px solid #ccc;
          background: #fff;
          cursor: pointer;
          font-weight: 600;
        }
        .dropdown-menu {
          position: absolute;
          background: #fff;
          border: 1px solid #ccc;
          padding: 10px;
          margin-top: 6px;
          z-index: 20;
          border-radius: 6px;
          box-shadow: 0 6px 16px rgba(0,0,0,0.1);
        }
        .laptop-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
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
          text-align: center;
          transition: 0.3s ease;
          animation: fadeInUp 0.6s forwards;
        }
        .laptop-card:hover {
          transform: translateY(-6px) scale(1.02);
          box-shadow: 0 10px 28px rgba(0,0,0,0.15);
        }
        .laptop-img {
          width: 100%;
          height: 160px;
          background: #f5f5f5;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 14px;
        }
        .details-btn {
          margin-top: auto;
          padding: 10px;
          width: 100%;
          border-radius: 8px;
          border: none;
          background: linear-gradient(90deg, #3498db, #2a82bdff);
          color: #fff;
          font-weight: 600;
          cursor: pointer;
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

      `}</style>

      <h1 className="brand-title">Parts</h1>

      {/* Filters */}
      <div className="filter-row">
        <div ref={categoryDropdownRef} style={{ position: "relative" }}>
          <div className="dropdown-box" onClick={() => setCategoryOpen(!categoryOpen)}>
            Select Category
          </div>
          {categoryOpen && (
            <div className="dropdown-menu">
              {["All", ...categories].map(c => (
                <label key={c} style={{ display: "block" }}>
                  <input
                    type="checkbox"
                    checked={c === "All" ? !selectedCategories.length : selectedCategories.includes(c)}
                    onChange={() => toggleCategory(c)}
                  />{" "}
                  {c}
                </label>
              ))}
            </div>
          )}
        </div>

        <div ref={brandDropdownRef} style={{ position: "relative" }}>
          <div className="dropdown-box" onClick={() => setBrandOpen(!brandOpen)}>
            Select Brand
          </div>
          {brandOpen && (
            <div className="dropdown-menu">
              {["All", ...brands].map(b => (
                <label key={b} style={{ display: "block" }}>
                  <input
                    type="checkbox"
                    checked={b === "All" ? !selectedBrands.length : selectedBrands.includes(b)}
                    onChange={() => toggleBrand(b)}
                  />{" "}
                  {b}
                </label>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Grid */}
      <div className="laptop-grid">
        {parts.map((item, index) => {
          const img = Array.isArray(item.image_url) ? item.image_url[0] : item.image_url;
          return (
            <Link key={item._id} to={`/parts/all/${item._id}`} style={{ textDecoration: "none", color: "inherit" }}>
              <div className="laptop-card" style={{ animationDelay: `${index * 0.08}s` }}>
                <div className="laptop-img">
                  <img
                    src={`http://localhost:5000/${img}`}
                    alt={item.category}
                    style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain" }}
                  />
                </div>
                <h3>{item.category}</h3>
                <p>Brand: {item.brand}</p>
                <button className="details-btn">See Details</button>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Pagination (from AccessoriesPage) */}
      <div style={{ display: "flex", justifyContent: "center", marginTop: "30px", gap: "6px", flexWrap: "wrap" }}>
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          style={{
            padding: "6px 12px",
            border: "1px solid #ccc",
            borderRadius: "6px",
            background: currentPage === 1 ? "#eee" : "white",
            cursor: currentPage === 1 ? "not-allowed" : "pointer"
          }}
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
              style={{
                padding: "6px 12px",
                border: "1px solid #ccc",
                borderRadius: "6px",
                background: currentPage === page ? "#007BFF" : "white",
                color: currentPage === page ? "white" : "black",
                cursor: "pointer"
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
            cursor: currentPage === totalPages ? "not-allowed" : "pointer"
          }}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default PartsPage;
