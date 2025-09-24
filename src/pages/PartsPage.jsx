import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

function PartsPage() {
  const { category } = useParams(); // category from URL
  const navigate = useNavigate();

  const [parts, setParts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 12;

  // filters
  const [brandFilter, setBrandFilter] = useState("");
  const [categoryFilter, setCategoryFilter] = useState(category || "");

  // whenever the URL param changes, update our filter & reset page
  useEffect(() => {
    setCategoryFilter(category || "");
    setCurrentPage(1);
  }, [category]);

  // fetch data
  useEffect(() => {
    const fetchParts = async () => {
      setLoading(true);
      setError(null);
      try {
        const query = new URLSearchParams({
          page: currentPage,
          limit: itemsPerPage,
          ...(brandFilter && { brand: brandFilter }),
          ...(categoryFilter && { category: categoryFilter }),
        }).toString();

        const res = await fetch(`http://localhost:5000/api/getParts?${query}`);
        const data = await res.json();

        if (data && Array.isArray(data.data)) {
          setParts(data.data);
          setTotalPages(data.totalPages || 1);
        } else {
          setError("Invalid response from server");
        }
      } catch (err) {
        console.error(err);
        setError("Failed to fetch parts");
      } finally {
        setLoading(false);
      }
    };

    fetchParts();
  }, [currentPage, brandFilter, categoryFilter]);

  // scroll to top when page changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

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
          fontSize: "28px",
          fontWeight: "bold",
          textAlign: "center",
          margin: "30px 0",
        }}
      >
        Parts
      </h1>

      {/* Category Pills */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "10px",
          marginBottom: "20px",
        }}
      >
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => {
              if (categoryFilter === cat) {
                navigate("/parts"); // go back to all parts
              } else {
                navigate(`/parts/${cat}`); // go to category
              }
            }}
            style={{
              padding: "8px 14px",
              borderRadius: "20px",
              border: "1px solid #ccc",
              background: categoryFilter === cat ? "#007BFF" : "white",
              color: categoryFilter === cat ? "white" : "#333",
              cursor: "pointer",
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Brand filter dropdown */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginBottom: "20px",
        }}
      >
        <select
          value={brandFilter}
          onChange={(e) => setBrandFilter(e.target.value)}
          style={{ padding: "8px 12px", borderRadius: "6px" }}
        >
          <option value="">All Brands</option>
          <option value="Dell">Dell</option>
          <option value="HP">HP</option>
          <option value="Lenovo">Lenovo</option>
          <option value="Asus">Asus</option>
          <option value="Acer">Acer</option>
          <option value="Apple">Apple</option>
          <option value="MSI">MSI</option>
          <option value="Samsung">Samsung</option>
          <option value="LG">LG</option>
          <option value="Huawei">Huawei</option>
          <option value="Google">Google</option>
          <option value="Microsoft">Microsoft</option>
          <option value="Sony">Sony</option>
        </select>
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
          parts.map((item) => (
            <div
              key={item._id}
              style={{
                background: "white",
                borderRadius: "15px",
                boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
                padding: "16px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
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
                {item.image_url && (
                  <img
                    src={item.image_url}
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
                )}
              </div>
<<<<<<< HEAD
              <h1
                style={{ fontSize: "24px", fontWeight: "bold", textAlign: "center" }}
              >
=======
              <h1 style={{ fontSize: "24px", fontWeight: "bold", textAlign: "center" }}>
>>>>>>> a29321732f799b6ecf6d3d1e176b8b4c307ee127
                {item.category}
              </h1>

              <h2
                style={{
                  fontSize: "18px",
                  fontWeight: "600",
                  marginBottom: "5px",
                  textAlign: "center",
                }}
              >
                {item.model || item.type}
              </h2>
<<<<<<< HEAD
              <h3
                style={{
=======
              <h3  style={{
>>>>>>> a29321732f799b6ecf6d3d1e176b8b4c307ee127
                  fontSize: "18px",
                  fontWeight: "600",
                  marginBottom: "5px",
                  textAlign: "center",
<<<<<<< HEAD
                }}
              >
                Specs: {item.name}
              </h3>
              <p style={{ color: "#555", margin: "2px 0" }}>
                Brand: {item.brand}
              </p>
              <p
                style={{ color: "#007BFF", fontWeight: "bold", margin: "2px 0" }}
              >
=======
                }}>Specs: {item.name}</h3>
              <p style={{ color: "#555", margin: "2px 0" }}>Brand: {item.brand}</p>
              <p style={{ color: "#007BFF", fontWeight: "bold", margin: "2px 0" }}>
>>>>>>> a29321732f799b6ecf6d3d1e176b8b4c307ee127
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
                }}
                onMouseOver={(e) => (e.target.style.background = "#0056b3")}
                onMouseOut={(e) => (e.target.style.background = "#007BFF")}
              >
                See Details
              </button>
            </div>
          ))
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
