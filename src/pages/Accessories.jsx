import React, { useEffect, useState } from "react";

function AccessoriesPage() {
  const [accessories, setAccessories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 12;

  // Fetch data from API
  useEffect(() => {
    const fetchAccessories = async (page = 1) => {
      setLoading(true);
      try {
        const res = await fetch(
          `http://localhost:5000/api/getAccessories?page=${page}&limit=${itemsPerPage}`
        );
        const data = await res.json();

        if (data && Array.isArray(data.data)) {
          setAccessories(data.data);
          setTotalPages(data.totalPages || 1);
        } else {
          setError("Invalid response from server");
        }
      } catch (err) {
        console.error(err);
        setError("Failed to fetch accessories");
      } finally {
        setLoading(false);
      }
    };

    fetchAccessories(currentPage);
  }, [currentPage]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  if (loading)
    return <p style={{ textAlign: "center", marginTop: "40px" }}>Loading...</p>;
  if (error)
    return (
      <p style={{ textAlign: "center", marginTop: "40px", color: "red" }}>
        {error}
      </p>
    );

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
    <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "20px" }}>
      <h1
        style={{
          fontSize: "28px",
          fontWeight: "bold",
          textAlign: "center",
          margin: "30px 0",
        }}
      >
        Accessories
      </h1>

      {/* Accessories Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "20px",
        }}
      >
        {accessories.length > 0 ? (
          accessories.map((item) => (
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
                <img
                  src={item.image_url || "https://placekitten.com/300/200"}
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
              <p style={{ color: "#555", margin: "2px 0" }}>Brand: {item.brand}</p>
              <p style={{ color: "#007BFF", fontWeight: "bold", margin: "2px 0" }}>
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
            No accessories found.
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

export default AccessoriesPage;
