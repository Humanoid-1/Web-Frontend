// src/pages/PartsPage.jsx
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

function PartsPage() {
  const { category: categoryParam } = useParams();
  const navigate = useNavigate();

  const [category, setCategory] = useState(categoryParam || "RAM");
  const [brand, setBrand] = useState("All");
  const [parts, setParts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 12;

  const categories = [
    "RAM",
    "SSD",
    "Hard Disk",
    "Laptop Body",
    "Internal Keyboard",
    "Battery",
    "Touchpad",
    "USB Port",
    "HDMI Port",
    "Hinge",
    "Display",
    "Speaker",
    "Wi-Fi Card",
    "Bluetooth Card",
    "Power Button",
    "Trackpoint Buttons",
  ];

  const brands = [
    "All",
    "Dell",
    "HP",
    "Lenovo",
    "Asus",
    "Acer",
    "Apple",
    "MSI",
    "Samsung",
    "LG",
    "Huawei",
    "Google",
    "Microsoft",
    "Sony",
  ];

  useEffect(() => {
    if (categoryParam) {
      const decoded = decodeURIComponent(categoryParam);
      setCategory(decoded.charAt(0).toUpperCase() + decoded.slice(1));
      setCurrentPage(1);
    } else {
      setCategory("RAM");
    }
  }, [categoryParam]);

  useEffect(() => {
    const fetchParts = async () => {
      setLoading(true);
      setError(null);
      try {
        const apiCategory = encodeURIComponent(category.toLowerCase());
        const brandPart = brand !== "All" ? `&brand=${encodeURIComponent(brand)}` : "";
        const res = await fetch(
          `http://localhost:5000/api/getParts?category=${apiCategory}${brandPart}&page=${currentPage}&limit=${itemsPerPage}`
        );
        const data = await res.json();
        if (data && Array.isArray(data.data)) {
          setParts(data.data);
          setTotalPages(data.totalPages || 1);
        } else {
          setParts([]);
          setError("Invalid response from server");
        }
      } catch (err) {
        console.error(err);
        setParts([]);
        setError("Failed to fetch parts");
      } finally {
        setLoading(false);
      }
    };
    fetchParts();
  }, [brand, category, currentPage]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  const handleCategoryClick = (cat) => {
    navigate(`/parts/${encodeURIComponent(cat.toLowerCase())}`);
  };

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

  if (loading)
    return <p style={{ textAlign: "center", marginTop: "40px" }}>Loading...</p>;
  if (error)
    return (
      <p style={{ textAlign: "center", marginTop: "40px", color: "red" }}>
        {error}
      </p>
    );

  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "20px" }}>
      <h1
        style={{
          marginBottom: "32px",
          fontSize: "2.5rem",
          fontWeight: "700",
          color: "#22223b",
          textAlign: "center",
        }}
      >
        Parts
      </h1>

      {/* Brand Dropdown */}
      <div style={{ marginBottom: "20px", textAlign: "center" }}>
        <label htmlFor="brand" style={{ marginRight: "10px", fontWeight: "600" }}>
          Filter by Brand:
        </label>
        <select
          id="brand"
          value={brand}
          onChange={(e) => {
            setBrand(e.target.value);
            setCurrentPage(1);
          }}
          style={{ padding: "8px 14px", borderRadius: "6px", border: "1px solid #ccc" }}
        >
          {brands.map((b) => (
            <option key={b} value={b}>
              {b}
            </option>
          ))}
        </select>
      </div>

      {/* Category Buttons */}
      <div
        style={{
          marginBottom: 32,
          display: "flex",
          flexWrap: "wrap",
          gap: 14,
          justifyContent: "center",
        }}
      >
        {categories.map((c) => (
          <button
            key={c}
            onClick={() => handleCategoryClick(c)}
            className={`brand-btn${category === c ? " selected" : ""}`}
            style={{
              padding: "10px 22px",
              border: "none",
              borderRadius: "20px",
              background: category === c ? "#007BFF" : "#f0f0f0",
              color: category === c ? "#fff" : "#333",
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            {c}
          </button>
        ))}
      </div>

      {/* Parts Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "20px",
        }}
      >
        {parts.length > 0 ? (
          parts.map((item) => {
            const imageSrc = Array.isArray(item.image_url)
              ? item.image_url[0]
              : item.image_url || "";

            return (
              <Link
                key={item._id}
                to={`/parts/${category}/${item._id}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <div
                  style={{
                    background: "white",
                    borderRadius: "15px",
                    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
                    padding: "16px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    textAlign: "center",
                  }}
                >
                  <div
                    style={{
                      width: "100%",
                      height: "160px",
                      background: "#f0f0f0",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      borderRadius: "10px",
                      marginBottom: "12px",
                      overflow: "hidden",
                    }}
                  >
                    <img
                      src={`http://localhost:5000/${imageSrc}`}
                      alt={item.model || item.type}
                      style={{
                        maxHeight: "100%",
                        maxWidth: "100%",
                        objectFit: "contain",
                      }}
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "https://placekitten.com/300/200";
                      }}
                    />
                  </div>

                  <h1
                    style={{
                      fontSize: "23px",
                      fontWeight: "600",
                      marginBottom: "5px",
                    }}
                  >
                    {item.category || item.type}
                  </h1>
                  <p style={{ color: "#555", margin: "2px 0" }}>
                    Brand: {item.brand}
                  </p>
                  <p
                    style={{
                      color: "#007BFF",
                      fontWeight: "bold",
                      margin: "2px 0",
                    }}
                  >
                    ₹{item.price}
                  </p>
                  <p style={{ color: "#555", margin: "2px 0" }}>
                    Availability: {item.availability || "N/A"}
                  </p>
                  <p style={{ color: "#555", margin: "2px 0" }}>
                    Warranty: {item.warranty || "N/A"}
                  </p>

                  <div style={{ fontSize: "14px", color: "#666", marginTop: "8px" }}>
                    <p>Type: {item.type || "N/A"}</p>
                  </div>

                  <Link to={`/partdetail/${item._id}`}>
                    <button
                      style={{
                        marginTop: "12px",
                        background: "#007BFF",
                        color: "white",
                        border: "none",
                        padding: "10px 16px",
                        borderRadius: "8px",
                        cursor: "pointer",
                        transition: "0.3s",
                        width: "100%",
                      }}
                      onMouseOver={(e) =>
                        (e.target.style.background = "#0056b3")
                      }
                      onMouseOut={(e) =>
                        (e.target.style.background = "#007BFF")
                      }
                    >
                      See Details
                    </button>
                  </Link>
                </div>
              </Link>
            );
          })
        ) : (
          <p style={{ gridColumn: "1 / -1", textAlign: "center", color: "#777" }}>
            No parts found.
          </p>
        )}
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
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
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

export default PartsPage;
