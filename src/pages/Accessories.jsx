import { useEffect, useState, useRef } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";


function AccessoriesPage() {
  const { accessories: categoryParam } = useParams();
  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);

  const [accessories, setAccessories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 12;

  const categoryRef = useRef();
  const brandRef = useRef();
  const [categoryOpen, setCategoryOpen] = useState(false);
  const [brandOpen, setBrandOpen] = useState(false);

  // 🔹 SAME FIX AS BRAND PAGE
  const reorderWithSelectedFirst = (allItems, selectedItems) => {
    const selected = allItems.filter(i => selectedItems.includes(i));
    const unselected = allItems.filter(i => !selectedItems.includes(i));
    return [...selected, ...unselected];
  };

  // Fetch categories
 useEffect(() => {
  fetch(`${import.meta.env.VITE_API_URL}/api/getAccessoryCategories`)
    .then(res => res.json())
    .then(
      data =>
        data.success &&
        Array.isArray(data.categories) &&
        setCategories(data.categories)
    );
}, []);

// Fetch brands
useEffect(() => {
  fetch(`${import.meta.env.VITE_API_URL}/api/getAccessoryBrands`)
    .then(res => res.json())
    .then(
      data =>
        data.success &&
        Array.isArray(data.brands) &&
        setBrands(data.brands)
    );
}, []);


  // Fetch accessories
  useEffect(() => {
    const fetchAccessories = async () => {
      setLoading(true);
      setError(null);
      try {
        let query = `page=${currentPage}&limit=${itemsPerPage}`;
        const categoryQuery = selectedCategories.length
          ? selectedCategories.join(",")
          : categoryParam || "";
        query += `&category=${encodeURIComponent(categoryQuery)}`;

        if (selectedBrands.length) {
          query += `&brand=${encodeURIComponent(selectedBrands.join(","))}`;
        }

        const res = await fetch(
  `${import.meta.env.VITE_API_URL}/api/getAccessories?${query}`
);
const data = await res.json();

        setAccessories(Array.isArray(data.data) ? data.data : []);
        setTotalPages(data.totalPages || 1);
      } catch {
        setAccessories([]);
        setError("Failed to fetch accessories");
      } finally {
        setLoading(false);
      }
    };
    fetchAccessories();
  }, [categoryParam, selectedCategories, selectedBrands, currentPage]);

  // Close dropdowns
  useEffect(() => {
    const closeDropdowns = (e) => {
      if (categoryRef.current && !categoryRef.current.contains(e.target)) setCategoryOpen(false);
      if (brandRef.current && !brandRef.current.contains(e.target)) setBrandOpen(false);
    };
    document.addEventListener("mousedown", closeDropdowns);
    return () => document.removeEventListener("mousedown", closeDropdowns);
  }, []);

  const toggleSelection = (item, selected, setSelected) => {
    if (item === "All") setSelected([]);
    else {
      setSelected(prev =>
        prev.includes(item) ? prev.filter(x => x !== item) : [...prev, item]
      );
    }
    setCurrentPage(1);
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

  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "20px" }}>
      <h1 style={{ marginBottom: "32px", fontSize: "2.5rem", fontWeight: "700", color: "#22223b", textAlign: "center" }}>
        Accessories
      </h1>

      {/* Filters */}
      <div style={{ display: "flex", justifyContent: "center", gap: "20px", flexWrap: "wrap", marginBottom: "20px" }}>
        
        {/* Category */}
        <div ref={categoryRef} style={{ position: "relative" }}>
          <div style={{ padding: "8px 14px", borderRadius: "6px", border: "1px solid #ccc", cursor: "pointer", fontWeight: 600 }}
               onClick={() => setCategoryOpen(!categoryOpen)}>
            Select Category
          </div>
          {categoryOpen && (
            <div style={{ position: "absolute", background: "#fff", border: "1px solid #ccc", padding: "10px", marginTop: "6px", zIndex: 20, borderRadius: "6px", boxShadow: "0 6px 16px rgba(0,0,0,0.1)", maxHeight: "200px", overflowY: "auto" }}>
              {["All", ...reorderWithSelectedFirst(categories, selectedCategories)].map(c => (
                <label key={c} style={{ display: "block" }}>
                  <input
                    type="checkbox"
                    checked={c === "All" ? !selectedCategories.length : selectedCategories.includes(c)}
                    onChange={() => toggleSelection(c, selectedCategories, setSelectedCategories)}
                  />{" "}
                  {c}
                </label>
              ))}
            </div>
          )}
        </div>

        {/* Brand */}
        <div ref={brandRef} style={{ position: "relative" }}>
          <div style={{ padding: "8px 14px", borderRadius: "6px", border: "1px solid #ccc", cursor: "pointer", fontWeight: 600 }}
               onClick={() => setBrandOpen(!brandOpen)}>
            Select Brand
          </div>
          {brandOpen && (
            <div style={{ position: "absolute", background: "#fff", border: "1px solid #ccc", padding: "10px", marginTop: "6px", zIndex: 20, borderRadius: "6px", boxShadow: "0 6px 16px rgba(0,0,0,0.1)", maxHeight: "200px", overflowY: "auto" }}>
              {["All", ...reorderWithSelectedFirst(brands, selectedBrands)].map(b => (
                <label key={b} style={{ display: "block" }}>
                  <input
                    type="checkbox"
                    checked={b === "All" ? !selectedBrands.length : selectedBrands.includes(b)}
                    onChange={() => toggleSelection(b, selectedBrands, setSelectedBrands)}
                  />{" "}
                  {b}
                </label>
              ))}
            </div>
          )}
        </div>
      </div>

      {loading && <p style={{ textAlign: "center" }}>⏳ Loading...</p>}
      {error && <p style={{ textAlign: "center", color: "red" }}>{error}</p>}

      {/* Accessories Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "20px" }}>
        {accessories.length ? accessories.map(item => {
          const imageSrc = Array.isArray(item.image_url) ? item.image_url[0] : item.image_url || "";
          return (
            <Link key={item._id} to={`/accessories/${categoryParam}/${item._id}`} style={{ textDecoration: "none", color: "inherit" }}>
              <div style={{ background: "white", borderRadius: "15px", boxShadow: "0 4px 10px rgba(0,0,0,0.1)", padding: "16px", textAlign: "center" }}>
               <img src={`${import.meta.env.VITE_API_URL}/${imageSrc}`}alt={item.type} style={{ maxWidth: "100%", height: "160px", objectFit: "contain" }} />
                <h3>{item.category || item.type}</h3>
                <p><b>Brand:</b> {item.brand}</p>
              </div>
            </Link>
          );
        }) : (
          <p style={{ gridColumn: "1 / -1", textAlign: "center", color: "#777" }}>No accessories found.</p>
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

export default AccessoriesPage;
