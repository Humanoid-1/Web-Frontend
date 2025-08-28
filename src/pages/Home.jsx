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
import battery from "../../public/battery.jpg";
import ram from "../../public/ram.jpg";
import body from "../../public/body.jpg";
import keyboardInternal from "../../public/keyboard-internal.jpg";
import touchpad from "../../public/touchpad.jpg";
import port from "../../public/port.jpg";
import hinge from "../../public/hinge.jpg";
import display from "../../public/display.jpg";
import speaker from "../../public/speaker.jpg";
import wifiCard from "../../public/wifi-card.jpg";
import bluetoothCard from "../../public/bluetooth-card.jpg";
import powerButton from "../../public/power-button.jpg";

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
