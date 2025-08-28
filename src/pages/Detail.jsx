import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const Detail = () => {

  const { id } = useParams(); // URL से id लो
  const [laptop, setLaptop] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLaptop = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/getLaptopById/${id}`);
        const data = await response.json();
        setLaptop(data);
      } catch (error) {
        console.error("Error fetching laptop:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLaptop();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (!laptop) return <h2>Laptop not found</h2>;

  return (
    <div>
      <img src={laptop.image_url?.[0]} alt={laptop.model} width="300" />
      <h3>{laptop.brand} - {laptop.model}</h3>
      <p><b>CPU:</b> {laptop.specs?.cpu}</p>
      <p><b>RAM:</b> {laptop.specs?.ram}</p>
      <p><b>Storage:</b> {laptop.specs?.storage}</p>
      <p><b>GPU:</b> {laptop.specs?.gpu}</p>
      <p><b>Price:</b> ₹{laptop.price}</p>
    </div>
  );
};

export default Detail;
