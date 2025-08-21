import React from "react";
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
import { Link } from "react-router-dom";

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
];

const Home = () => {
  return (
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
            <Link to={`/brand/${category.name}`} className="brand-card" key={index}>
           
            {/* <div className="brand-card" key={index}> */}
              <div className="brand-image-container">
                <img
                  src={category.image}
                  alt={category.name}
                  className="brand-image"
                />
              </div>
              <span className="brand-name">{category.name}</span>
               </Link>
            // </div>
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
      </section>
      <footer>
        <div className="footer-top">
        
         <button className="back-to-top-link" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
  Back To Top
</button>

        </div>
        <div className="footer-main">
         <div className="footer-column">
          <h3>Connect with Us</h3>
          <ul>
            <li><a href="https://www.facebook.com/humanoidmaker">Facebook</a></li>
            <li><a href="https://www.instagram.com/humanoidmaker/"> Instagram</a></li>
            <li><a href="https://in.linkedin.com/in/humanoidmaker">LinkedIn</a></li>
          </ul>
        </div>
          <div className="footer-column">
          <h3>Get to Know Us</h3>
          <ul>
            <li><Link to="/About">About humanoid maker</Link></li>
            <li><Link to="/ContactUs">ContactUs</Link></li>
            <li>Recalls and Product Safety Alerts</li>
            <li>100% Purchase Protection</li>
            <li>Privacy Policy</li>
            <li>Terms of Use</li>
            
          </ul>
        </div>

        <div className="footer-column">
          <h3>Make Money with Us</h3>
          <ul>
                <li>Sell Laptops on Humanoid</li>
                <li>Join the Humanoid Partner Program</li>
                <li>Become a Reseller</li>
                <li>Advertise with Humanoid</li>
                <li>Refer & Earn</li>

          </ul>
        </div>
        <div className="footer-column">
          <h3>Let Us Help You</h3>
          <ul>
            <li>Your Account</li>
            <li>Returns Centre</li>
            <li>Recalls and Product Safety Alerts</li>
            <li>100% Purchase Protection</li>
            <li>Help</li>
            <li>Payment Options</li>
          </ul>
        </div>
             
        </div>
        
 <div className="footer-bottom">
        <div className="footer-logo">
          <img src="/public/humanoid_maker_logo_black.png" style={{height:"40px",marginTop:"-8px"}} alt="Humanoid Maker Logo" />
        </div>
        <div className="copyright">
          <p>&copy; {new Date().getFullYear()} Humanoid Maker. All rights reserved.</p>
        </div>
      </div>
      </footer>
    </div>
  );
};

export default Home;
