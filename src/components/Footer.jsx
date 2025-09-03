import './Footer.css';
import { Link } from 'react-router-dom';
import logo from "../../public/humanoid_maker_logo_white-Photoroom.png";


function Footer() {
  return (
    <footer>
      <div className="footer-top">
        <button className="back-to-top-link" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          Back To Top
        </button>
      </div>
      <div className="footer-main" style={{ paddingLeft: '45px' }}>
        

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
            <li><Link to="/ContactUs">Help</Link></li>
            <li>Recalls and Product Safety Alerts</li>
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
          </ul>
        </div>
        <div className="footer-column">
          <h3>Let Us Help You</h3>
          <ul>
            <li>Your Account</li>
            <li>Returns Centre</li>
            <li>Recalls and Product Safety Alerts</li>
            <li>100% Purchase Protection</li>
            <li>Payment Options</li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <img src={logo} alt="Humanoid Maker Logo" className="footer-logo" />

      <div className="copyright">
        <p>&copy; {new Date().getFullYear()} Humanoid Maker. All rights reserved.</p>
      </div>
        </div>
    </footer>
  )
}

export default Footer
