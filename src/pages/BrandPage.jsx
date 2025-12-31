import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

function BrandPage({ cartOpen }) {
  const navigate = useNavigate();

  const [brands, setBrands] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);

  const [cpus, setCpus] = useState([]);
  const [selectedCpus, setSelectedCpus] = useState([]);

  const [rams, setRams] = useState([]);
  const [selectedRams, setSelectedRams] = useState([]);

  const [storages, setStorages] = useState([]);
  const [selectedStorages, setSelectedStorages] = useState([]);

  const [laptops, setLaptops] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 12;

  const brandRef = useRef();
  const cpuRef = useRef();
  const ramRef = useRef();
  const storageRef = useRef();

  const [brandOpen, setBrandOpen] = useState(false);
  const [cpuOpen, setCpuOpen] = useState(false);
  const [ramOpen, setRamOpen] = useState(false);
  const [storageOpen, setStorageOpen] = useState(false);

  /* ================= FETCH FILTER DATA ================= */
  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/getBrands`)
      .then(res => res.json())
      .then(data => data.success && setBrands(data.brands || []));

    fetch(`${import.meta.env.VITE_API_URL}/api/getCPUs`)
      .then(res => res.json())
      .then(data => setCpus(data.cpus || []));

    fetch(`${import.meta.env.VITE_API_URL}/api/getRAMs`)
      .then(res => res.json())
      .then(data => setRams(data.rams || []));

    
fetch(`${import.meta.env.VITE_API_URL}/api/getStorages`)
      .then(res => res.json())
      .then(data => setStorages(data.storages || []));
  }, []);

  /* ================= FETCH LAPTOPS ================= */
  useEffect(() => {
    const fetchLaptops = async () => {
      setLoading(true);
      setError(null);
      try {
        let query = `page=${currentPage}&limit=${itemsPerPage}`;
        query += `&brand=${selectedBrands.join(",")}`;
        query += `&cpu=${selectedCpus.join(",")}`;
        query += `&ram=${selectedRams.join(",")}`;
        query += `&storage=${selectedStorages.join(",")}`;

       const res = await fetch(`${import.meta.env.VITE_API_URL}/api/getLaptops?${query}`);
const data = await res.json();


        setLaptops(Array.isArray(data.data) ? data.data : []);
        setTotalPages(data.totalPages || 1);
      } catch {
        setError("Failed to fetch laptops");
      } finally {
        setLoading(false);
      }
    };
    fetchLaptops();
  }, [selectedBrands, selectedCpus, selectedRams, selectedStorages, currentPage]);

  /* ================= CLOSE DROPDOWNS ================= */
  useEffect(() => {
    const closeAll = (e) => {
      if (brandRef.current && !brandRef.current.contains(e.target)) setBrandOpen(false);
      if (cpuRef.current && !cpuRef.current.contains(e.target)) setCpuOpen(false);
      if (ramRef.current && !ramRef.current.contains(e.target)) setRamOpen(false);
      if (storageRef.current && !storageRef.current.contains(e.target)) setStorageOpen(false);
    };
    document.addEventListener("mousedown", closeAll);
    return () => document.removeEventListener("mousedown", closeAll);
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
    if (left > 2) pages.push("...");
    for (let i = left; i <= right; i++) pages.push(i);
    if (right < totalPages - 1) pages.push("...");
    if (totalPages > 1) pages.push(totalPages);
    return pages;
  };

  /* ================= RENDER ================= */
  return (
    <div className={`brand-page ${cartOpen ? "behind-cart" : ""}`}>
      <style>{`
        .brand-page {
          padding:32px;
          background:linear-gradient(120deg,#f9fafc,#eef1f6);
          min-height:100vh;
          font-family: 'Segoe UI','Roboto',Arial,sans-serif;
        }
        .brand-title {
          text-align:center;
          font-size:2.4rem;
          margin-bottom:32px;
        }
        .filter-row {
          display:flex;
          gap:20px;
          justify-content:center;
          flex-wrap:wrap;
          margin-bottom:32px;
        }
        .dropdown-box {
          padding:10px 22px;
          background:#fff;
          border:1px solid #ccc;
          border-radius:6px;
          cursor:pointer;
          font-weight:600;
        }
        .dropdown-menu {
          position:absolute;
          background:#fff;
          border:1px solid #ccc;
          padding:10px;
          z-index:20;
          border-radius:6px;
          box-shadow:0 6px 16px rgba(0,0,0,0.1);
          max-height:220px;
          overflow:auto;
        }
        .laptop-grid {
          display:grid;
          grid-template-columns:repeat(auto-fit,minmax(280px,1fr));
          gap:28px;
        }
        .laptop-card {
          background:#fff;
          padding:20px;
          border-radius:16px;
          box-shadow:0 6px 16px rgba(0,0,0,0.08);
          display:flex;
          flex-direction:column;
          align-items:center;
          text-align:center;
          cursor:pointer;
          transition:0.3s ease;
        }
        .laptop-card:hover {
          transform:translateY(-6px) scale(1.02);
          box-shadow:0 12px 28px rgba(0,0,0,0.15);
        }
        .laptop-img {
          width:100%;
          height:160px;
          background:#f5f5f5;
          border-radius:12px;
          margin-bottom:14px;
          overflow:hidden;
          display:flex;
          align-items:center;
          justify-content:center;
        }
        .laptop-img img {
          width:100%;
          height:100%;
          object-fit:contain;
          transition:transform 0.45s ease;
        }
        .laptop-card:hover .laptop-img img {
          transform:scale(1.2);
        }
      `}</style>

      <h1 className="brand-title">Laptops</h1>

      {/* FILTERS */}
      <div className="filter-row">
        {[
          ["Brand", brands, brandOpen, setBrandOpen, selectedBrands, setSelectedBrands, brandRef],
          ["CPU & Gen", cpus, cpuOpen, setCpuOpen, selectedCpus, setSelectedCpus, cpuRef],
          ["RAM", rams, ramOpen, setRamOpen, selectedRams, setSelectedRams, ramRef],
          ["Storage", storages, storageOpen, setStorageOpen, selectedStorages, setSelectedStorages, storageRef],
        ].map(([label, list, open, setOpen, selected, setSelected, ref], i) => (
          <div key={i} ref={ref} style={{ position: "relative" }}>
            <div className="dropdown-box" onClick={() => setOpen(!open)}>
              Select {label}
            </div>
            {open && (
              <div className="dropdown-menu">
                {["All", ...list].map(item => (
                  <label key={item} style={{ display: "block" }}>
                    <input
                      type="checkbox"
                      checked={item === "All" ? !selected.length : selected.includes(item)}
                      onChange={() => toggleSelection(item, selected, setSelected)}
                    /> {item}
                  </label>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* LAPTOP GRID */}
      <div className="laptop-grid">
        {laptops.map((laptop) => (
          <div
            key={laptop._id}
            className="laptop-card"
            onClick={() => navigate(`/detail/${laptop._id}`)}
          >
            <div className="laptop-img">
              <img src={laptop.image_url?.[0]} alt={laptop.model} />
            </div>
            <h3>{laptop.model}</h3>
            <p>{laptop.brand}</p>
            <p>{laptop.cpu}</p>
            <p>{laptop.ram} | {laptop.storage}</p>
          </div>
        ))}
      </div>

      {/* PAGINATION */}
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

export default BrandPage;
