import React from "react";
import "./Home.css";
import SliderComponent from "../components/SliderComponent";
import dell from "/Dell.jpg";
import hp from "/hp.jpg";
import asur from "/Asus.jpg";
import lenovo from "/Lenovo.jpg";
import acer from "/Acer.jpg";
import msi from "/Msi.jpg";
import samsung from "/Samsung.jpg";
import apple from "/Apple.jpg";
import lg from "/lg.jpg";
import huawei from "/Huawei.jpg";
import mouse from "/mouse.jpg";
import keyboard from "/keyboard.jpg";
import charger from "/adapter.jpg";
import pendrive from "/pendrive.jpg";
import harddisk from "/hard-disk.jpg";
import battery from "/battery.jpg";
import ram from "/ram.jpg";
import body from "/body.jpg";
import keyboardInternal from "/keyboard-internal.jpg";
import touchpad from "/touchpad.jpg";
import port from "/port.jpg";
import hinge from "/hinge.jpg";
import display from "/display.jpg";
import speaker from "/speaker.jpg";
import wifiCard from "/wifi-card.jpg";
import bluetoothCard from "/bluetooth-card.jpg";
import powerButton from "/power-button.jpg";

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
const parts =[
  {name:"RAM" ,image:ram},
  {name:"HardDisk" ,image:harddisk},
  {name:"Body" ,image:body},
  {name:"Keyboard" ,image:keyboardInternal},
  {name:"Battery" ,image:battery},
  {name:"Touchpad" ,image:touchpad},
  {name:"Ports" ,image:port},
  {name:"Hinge",image:hinge}, 
  {name:"Display",image:display},
  {name:"Speaker",image:speaker},
  {name:"Wi-Fi Card",image:wifiCard},
  {name:"Bluetooth Card",image:bluetoothCard},
  {name:"Buttons",image:powerButton},
]
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
              <div className="brand-image-container">
                <img
                  src={category.image}
                  alt={category.name}
                  className="brand-image"
                />
              </div>
              <span className="brand-name">{category.name}</span>
            </Link>
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
            <Link to={`/accessories/`} className="accessory-card" key={index}>
              <div className="accessory-image-container">
                <img
                  src={accessory.image}
                  alt={accessory.name}
                  className="accessory-image"
                />
              </div>
              <span className="accessory-name">{accessory.name}</span>
            </Link>
          ))}
        </div>
      </section>
      {/* parts section  */}
      <section  className="section-container">
        <div className="section-header">
          <h2>Parts</h2>
          <p>Find the perfect parts for your devices</p>
        </div>
        <div className="accessories-grid">
          {parts.map((part, index) => (
            <Link to={`/parts/`} className="accessory-card" key={index}>
              <div className="accessory-image-container">
                <img
                  src={part.image}
                  alt={part.name}
                  className="accessory-image"
                />
              </div>
              <span className="accessory-name">{part.name}</span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
