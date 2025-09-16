import React, { useRef, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "../pages/Detail.css";
import { MdModeFanOff } from "react-icons/md";

const Detail = () => {
  const { id } = useParams();
  const [laptop, setLaptop] = useState(null);
  const [loading, setLoading] = useState(true);

  const imageRef = useRef(null);
  const [lensPosition, setLensPosition] = useState({ x: 0, y: 0 });
  const [showLens, setShowLens] = useState(false);
  const [backgroundPosition, setBackgroundPosition] = useState("0% 0%");
  const [selectedImage, setSelectedImage] = useState("");

  // Fetch laptop by id
useEffect(() => {
  fetch(`http://localhost:5000/api/getLaptop/${id}`)
    .then((res) => {
      if (!res.ok) throw new Error(`Server error: ${res.status}`);
      return res.json();
    })
    .then((data) => {
      setLaptop(data);
      setSelectedImage(data.image_url[0]);
      setLoading(false);
    })
    .catch((err) => {
      console.error("Fetch error:", err);
      setLoading(false);
    });
}, [id]);



  if (loading) return <h2>Loading...</h2>;
  if (!laptop) return <h2>Laptop not found</h2>;

  return (
    <div>
     <Link to={`/details/${laptop._id}`}>
  {laptop.brand} {laptop.model}
</Link>

    </div>
  );
};

export default Detail;
