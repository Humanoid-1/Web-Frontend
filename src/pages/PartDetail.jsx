import React from "react";
import "../pages/Detail.css";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState, useRef } from "react";

const PartDetail = () => {
    const { id,category } = useParams();
    const Navigate = useNavigate();
    const [part, setPart] = useState(null);
    const [loading, setLoading] = useState(true);
    const [selectedImage, setSelectedImage] = useState("");
    const [error, setError] = useState(null);
    const imageRef = useRef(null);
    useEffect(() => {
        const fetchPart = async () => {
            try {
                const res = await fetch(`http://localhost:5000/api/getPart?category=${category}&page=1&limit=1000`);
                const data = await res.json();
                if (data && Array.isArray(data.data)) {
                    const foundPart = data.data.find((item) => item._id === id);
                    if (foundPart) {
                        setPart(foundPart);
                        setSelectedImage(foundPart.image_url[0]);
                    } else {
                        setError("Part not found");
                    }
                } else {
                    setError("Invalid response from server");
                }
            } catch (err) {
                console.error(err);
                setError("Failed to fetch part");
            } finally {
                setLoading(false);
            }
        };

        fetchPart();
    }, [id, category]);

    if (loading) return <h2>Loading...</h2>;
    if (!part) return <h2>Part not found</h2>;

    return (
        <div className="container">
            <div className="page-left">
                <div className="image-gallery">
                    <div className="thumbnails">
                        {part.image_url.map((img, index) => (
                            <img
                                key={index}
                                src={img}
                                alt={`Thumbnail ${index + 1}`}
                                className={img === selectedImage ? "selected" : ""}
                                onClick={() => setSelectedImage(img)}
                            />
                        ))}
                    </div>
                    <div className="main-image">
                        <img src={selectedImage} alt="Selected" ref={imageRef} />
                    </div>
                </div>  
                <div className="meta">
                    <h2>{part.name}</h2>
                    <p><strong>Category:</strong> {part.category}</p>
                    <p><strong>Price:</strong> ${part.price}</p>
                    <p><strong>Description:</strong> {part.description}</p>
                    <button onClick={() => Navigate(-1)}>Go Back</button>
                </div>
            </div>
        </div>
    );
}
export default PartDetail; 
        
