import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

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
    <div style={{ maxWidth: "1100px", margin: "40px auto", padding: "20px" }}>
      <button
        onClick={() => navigate(-1)}
        style={{
          marginBottom: "20px",
          padding: "8px 14px",
          borderRadius: "6px",
          border: "1px solid #ccc",
          cursor: "pointer",
        }}
      >
        ⬅ Back
      </button>

      {item && (
        <div style={{ display: "flex", gap: "40px", flexWrap: "wrap" }}>
          {/* Left Section - Images */}
          <div style={{ flex: "1.2", minWidth: "320px" }}>
            {/* Main Image */}
            <div
              style={{
                border: "1px solid #eee",
                borderRadius: "10px",
                marginBottom: "10px",
                textAlign: "center",
              }}
            >
              <img
                src={mainImage}
                alt={item.model || item.type}
                style={{
                  width: "100%",
                  maxHeight: "400px",
                  objectFit: "contain",
                  borderRadius: "10px",
                }}
              />
            </div>

            {/* Thumbnails */}
            <div style={{ display: "flex", gap: "10px" }}>
              {[item.image_url, item.image_url, item.image_url].map((img, i) => (
                <div
                  key={i}
                  style={{
                    border: "1px solid #ddd",
                    padding: "4px",
                    cursor: "pointer",
                    borderRadius: "6px",
                  }}
                  onClick={() =>
                    setMainImage(img || "https://placekitten.com/600/400")
                  }
                >
                  <img
                    src={img || "https://placekitten.com/100/100"}
                    alt={`thumb-${i}`}
                    style={{
                      width: "70px",
                      height: "70px",
                      objectFit: "cover",
                      borderRadius: "4px",
                    }}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Right Section - Details */}
          <div style={{ flex: "2", minWidth: "320px" }}>
            <h1 style={{ fontSize: "26px", fontWeight: "700", marginBottom: "10px" }}>
              {item.brand} {item.model || item.category}
            </h1>

            <p style={{ fontSize: "20px", color: "#0071e3", margin: "10px 0" }}>
              ₹{item.price}
            </p>

            <button
              style={{
                background: "#0071e3",
                color: "white",
                padding: "12px 24px",
                borderRadius: "8px",
                border: "none",
                cursor: "pointer",
                marginBottom: "20px",
              }}
            >
              Buy Now
            </button>

            <h3 style={{ fontSize: "18px", fontWeight: "600", margin: "15px 0" }}>
              Product Details
            </h3>
            <p><strong>Type:</strong> {item.type}</p>
            <p><strong>Availability:</strong> {item.availability}</p>
            <p><strong>Warranty:</strong> {item.warranty}</p>

            <h3 style={{ fontSize: "18px", fontWeight: "600", margin: "15px 0" }}>
              Description
            </h3>
            <p>{item.description || "No description available"}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default AccessoryDetailPage;
