import React from "react";
import "./Home.css"; // import the custom CSS
import SliderComponent from "../components/SliderComponent";


const categories = [
  { name: "Dell", image: "/Dell.jpg" },
  { name: "HP", image: "/hp.jpg" },
  { name: "Asus", image: "/Asus.jpg" },
  { name: "Apple", image: "/Apple.jpg" },
  { name: "Lenovo", image: "/Lenovo.jpg" },
  { name: "Acer", image: "/Acer.jpg" },
  { name: "MSI", image: "/Msi.jpg" },
  { name: "Samsung", image: "/Samsung.jpg" },
];

const Home = () => {
  return (
    <div>
    <SliderComponent />
    <div className="home-container">
      <h1 className="home-heading">Shop by Brands</h1>

      <div className="brand-grid">
        {categories.map((category, index) => (
          <div className="brand-card" key={index}>
            <div className="brand-image-container">
              <img
                src={category.image}
                alt={category.name}
                className="brand-image"
              />
            </div>
            <span className="brand-name">{category.name}</span>
          </div>
        ))}
      </div>
    </div>
    </div>
  );
};

export default Home;

