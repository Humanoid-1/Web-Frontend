import React from "react";
import "./AboutPage.css";
import { Link } from "react-router-dom";
import logo from "../../public/Dell-Logo.png"
import logo1 from "../../public/Lenovo-Logo.png"
import logo2 from "../../public/Hp-Logo.png"
import logo3 from "../../public/Apple-Logo.png"
import logo4 from "../../public/Acer-Logo.png"
import logo5 from "../../public/Asus-Logo.png"
import logo6 from "../../public/Msi-Logo.png"


export default function AboutPage() {
  const company = {
    name: "Humanoid Maker Shop",
    mission:
      "To make laptops and accessories affordable, accessible, and reliable for everyone — from students and professionals to gamers and businesses.",
    bullets: [
      "Brand-new, certified refurbished, and pre-owned laptops",
      "Buy & sell: fast, fair, and secure transactions",
      "Full range of laptop accessories: chargers, bags, cooling pads, keyboards, mice",
      "Upgrades & repairs: SSD/RAM installs, diagnostics, warranty service",
      "Eco-friendly: we test, refurbish, and recycle to reduce e-waste"
    ]
  };

  return (
    <main className="about-container">
      <section className="about-section">
        <header className="about-header">
          <h1>{company.name}</h1>
          <p>
            <strong>We specialize</strong> in
            buying
            selling and
            trading laptops of all brands, plus a full range of <strong>accessories</strong> to power your setup. Whether you're looking for a
            brand-new laptop a
            certified refurbished device or a
            specific accessory — we make it simple.
          </p>
        </header>

        <div className="about-grid">
          <div className="about-main">
            <h2>Our Mission</h2>
            <p>{company.mission}</p>

            <h3>What we offer</h3>
            <ul>
              <li>
                Sales: New, certified refurbished, and pre-owned laptops at competitive prices.
              </li>
              <li>
                Purchases: Sell your old laptop quickly — fair valuation and <span className="highlight">secure</span> payment.
              </li>
              <li>
                Accessories: Chargers, cases, keyboards, adapters.
              </li>
              <li>
                Upgrades & Repairs: SSD/RAM installs, diagnostics, and professional repairs.
              </li>
              <li>
                Support: Expert tech help to match you with the right device and accessories.
              </li>
            </ul>

            <h3>Why Choose Humanoid Maker Shop</h3>
            <div className="why-choose-grid">
              <div className="why-card">
                <strong>Trusted Quality</strong>
                <p>Every product is tested for performance and durability.</p>
              </div>
              <div className="why-card">
                <strong>Fair Prices</strong>
                <p>Transparent pricing— no hidden fees.</p>
              </div>
              <div className="why-card">
                <strong>Expert Support</strong>
                <p>Tech specialists ready to help you pick or repair.</p>
              </div>
              <div className="why-card">
                <strong>Eco-Friendly</strong>
                <p>We refurbish and recycle to cut down e‑waste.</p>
              </div>
            </div>
            <div className="brand-logos">
              <a href="http://localhost:5173/#/brand/Dell">
              <img src={logo} alt="Dell" className="logo" />
              </a>
              <a href="http://localhost:5173/#/brand/Lenovo">
              <img src={logo1} alt="Lenovo" className="logo" />
              </a>
              <a href="http://localhost:5173/#/brand/HP">
              <img src={logo2} alt="HP" className="logo" />
              </a>
              <a href="http://localhost:5173/#/brand/Apple">
              <img src={logo3} alt="Apple" className="logo" />
              </a>
              <a href="http://localhost:5173/#/brand/Acer">
              <img src={logo4} alt="Acer" className="logo" />
              </a>
              <a href="http://localhost:5173/#/brand/Asus">
              <img src={logo5} alt="Asus" className="logo" />
              </a>
              <a href="http://localhost:5173/#/brand/msi">
              <img src={logo6} alt="MSI" className="logo" />
              </a>
            </div>

            <div className="about-promise">
              <h3>Our Promise</h3>
              <p>
                At <strong>{company.name}</strong> we promise honest service reliable products, and a simple buying/selling experience. Your satisfaction — and the health of the planet — matters to us.
              </p>
            </div>
          </div>
        </div>

        <br />
        <footer className="about-aside">
          <h4>Quick Facts</h4>
          <ul>
            {company.bullets.map((b, i) => (
              <li key={i}>{b}</li>
            ))}
          </ul>

          <br />
          <div className="aside-button">
            <Link to="/contact-us">Contact Sales</Link>
          </div>

          <div className="aside-note">
            In-store visits available — or shop online for nationwide shipping.
          </div>
        </footer>
      </section>
    </main>
  );
}
