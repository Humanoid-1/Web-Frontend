import React from "react";
<<<<<<< HEAD
import { Link } from "react-router-dom";
import "./Home.css";
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

const Accessories = [
  { name: "Mouse", image: "/mouse.jpg" },
  { name: "Keyboard", image: "/keyboard.jpg" },
  { name: "Charger", image: "/adapter.jpg" },
  { name: "Pendrive", image: "/pendrive.jpg" },
=======
import "./Home.css";
import SliderComponent from "../components/SliderComponent";
import dell from "../../public/Dell.jpg";
import hp from "../../public/hp.jpg";
import asur from "../../public/Asus.jpg";
import lenovo from "../../public/Lenovo.jpg";
import acer from "../../public/Acer.jpg";
import msi from "../../public/Msi.jpg";
import samsung from "../../public/Samsung.jpg";
import apple from "../../public/Apple.jpg";
import lg from "../../public/lg.jpg";
import huawei from "../../public/Huawei.jpg";
import mouse from "../../public/mouse.jpg";
import keyboard from "../../public/keyboard.jpg";
import charger from "../../public/adapter.jpg";
import pendrive from "../../public/pendrive.jpg";
import harddisk from "../../public/hard-disk.jpg";

const categories = [
  { name: "Dell", image: dell },
  { name: "HP", image: hp },
  { name: "Asus", image: asur },
  { name: "Apple", image: apple },
  { name: "Lenovo", image: lenovo },
  { name: "Acer", image: acer },
  { name: "MSI", image: msi },
  { name: "Samsung", image: samsung },
  { name: "LG", image: lg },
  { name: "Huawei", image: huawei }
];

const accessories = [
  { name: "Mouse", image: mouse },
  { name: "Keyboard", image: keyboard },
  { name: "Charger", image: charger },
  { name: "Pendrive", image: pendrive },
  { name: "HardDisk", image: harddisk }
>>>>>>> origin/main
];

const Home = () => {
  return (
<<<<<<< HEAD
    <div>
      <SliderComponent />

      {/* Brand Section */}
      <div className="home-container">
        <h1 className="home-heading">Shop by Brands</h1>

        <div className="brand-grid">
          {categories.map((category, index) => (
            <Link
              key={index}
              to={`/brand/${category.name}`} // navigate to brand page
              className="brand-card"
            >
=======
    <div className="home-wrapper">
      <SliderComponent />
      
      {/* Brands Section */}
      <section className="section-container">
        <div className="section-header">
          <h2>Shop by Brands</h2>
          <p>Explore our premium selection of trusted brands</p>
        </div>
        <div className="brand-grid">
          {categories.map((category, index) => (
            <div className="brand-card" key={index}>
>>>>>>> origin/main
              <div className="brand-image-container">
                <img
                  src={category.image}
                  alt={category.name}
                  className="brand-image"
                />
              </div>
              <span className="brand-name">{category.name}</span>
<<<<<<< HEAD
            </Link>
          ))}
        </div>
      </div>

      {/* Accessories Section */}
      <div className="accessories-container">
        <h1 className="accessories-heading">Accessories</h1>
        <div className="accessories-grid">
          {Accessories.map((accessory, index) => (
=======
            </div>
          ))}
        </div>
      </section>
      
      {/* Accessories Section */}
      <section className="section-container accent-bg">
        <div className="section-header">
          <h2>Accessories</h2>
          <p>Complete your setup with our premium accessories</p>
        </div>
        <div className="accessories-grid">
          {accessories.map((accessory, index) => (
>>>>>>> origin/main
            <div className="accessory-card" key={index}>
              <div className="accessory-image-container">
                <img
                  src={accessory.image}
                  alt={accessory.name}
                  className="accessory-image"
                />
              </div>
              <span className="accessory-name">{accessory.name}</span>
            </div>
          ))}
        </div>
<<<<<<< HEAD
      </div>
=======
      </section>
>>>>>>> origin/main
    </div>
  );
};

<<<<<<< HEAD
export default Home;
=======
export default Home;
>>>>>>> origin/main
