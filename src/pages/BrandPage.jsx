import React, { useEffect, useState } from 'react';

function BrandPage() {
  const [laptops, setLaptops] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [brand, setBrand] = useState('Dell'); // Default brand

  // Fetch laptops whenever the brand changes
  useEffect(() => {
    const fetchLaptops = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`http://localhost:5000/api/laptops/brand/${brand}`);
        const data = await response.json();
        console.log(`Fetched ${brand} laptops:`, data);
        setLaptops(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Fetch error:", err);
        setError(err.message || "Error fetching laptops");
        setLaptops([]);
      } finally {
        setLoading(false);
      }
    };

    fetchLaptops();
  }, [brand]);

  // Brands list (you can add more)
  const brands = ['Dell', 'HP', 'Lenovo', 'Asus', 'Acer'];

  return (
    <div style={{ padding: '20px' }}>
      <h1>Laptops by Brand</h1>

      {/* Brand Buttons */}
      <div style={{ marginBottom: '20px' }}>
        {brands.map((b) => (
          <button
            key={b}
            onClick={() => setBrand(b)}
            style={{
              marginRight: '10px',
              padding: '10px 20px',
              backgroundColor: brand === b ? '#007bff' : '#ccc',
              color: brand === b ? '#fff' : '#000',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer'
            }}
          >
            {b}
          </button>
        ))}
      </div>

      {/* Loading / Error / No Data */}
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {!loading && laptops.length === 0 && <p>No laptops found for {brand}.</p>}

      {/* Laptop List */}
      <div>
        {laptops.map((laptop) => (
          <div
            key={laptop._id}
            style={{
              border: '1px solid #ccc',
              padding: '15px',
              margin: '10px 0',
              borderRadius: '8px'
            }}
          >
            <h2>{laptop.model}</h2>
            <p><strong>Brand:</strong> {laptop.brand}</p>
            <p><strong>Price:</strong> ₹{laptop.price}</p>
            <p><strong>Processor:</strong> {laptop.specs.processor}</p>
            <p><strong>CPU:</strong> {laptop.specs.cpu}</p>
            <p><strong>RAM:</strong> {laptop.specs.ram}</p>
            <p><strong>Storage:</strong> {laptop.specs.storage}</p>
            <p><strong>GPU:</strong> {laptop.specs.gpu}</p>
            {laptop.image_url && (
              <img src={laptop.image_url} alt={laptop.model} style={{ maxWidth: '200px' }} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default BrandPage;
