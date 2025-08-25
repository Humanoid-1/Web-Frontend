import React, { useEffect, useState } from 'react';

const Accessories = () => {
  const [accessories, setAccessories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(`http://localhost:5000/api/getAccessories/`);
        if (!response.ok) throw new Error('Network response was not ok');
        const result = await response.json();
        console.log("API Response:", result);

        // Use only the `data` array
        setAccessories(result.data || []);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{color:"red"}}>Error: {error}</p>;

  return (
    <div>
      <h1>Accessories</h1>
      {accessories.length > 0 ? (
        accessories.map((accessory) => (
          <div key={accessory._id}>
            <h2>{accessory.brand} - {accessory.model}</h2>
            <p>Type: {accessory.type}</p>
            <p>Price: ₹{accessory.price}</p>
            <p>Status: {accessory.availability}</p>
            <img src={accessory.image_url} alt={accessory.model} width="200" />
          </div>
        ))
      ) : (
        <p>No accessories found</p>
      )}
    </div>
  );
};

export default Accessories;
