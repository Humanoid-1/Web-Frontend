import Home from "./pages/Home";
import Header from "./components/Header";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import About from "./pages/About";
import ContactUs from "./pages/ContactUs";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import BrandPage from "./pages/BrandPage";
import Accessories from "./pages/Accessories";
import Footer from "./components/Footer";
import Detail from "./pages/Detail";
import PartsPage from "./pages/PartsPage";


function App() {
  return (
    <div>
      <Header />
      
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/About" element={<About />} />
        <Route path="/ContactUs" element={<ContactUs />} />
        <Route path="/brand/:brandName" element={<BrandPage/>} />
        <Route path="/accessories" element={<Accessories/>} />
        <Route path="/parts" element={<PartsPage/>} />
        <Route path="/details/:id" element={<Detail/>} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;