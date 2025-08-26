import Home from "./pages/Home";
import Header from "./components/Header";
import { Route, Routes } from "react-router-dom";
import About from "./pages/About";
import ContactUs from "./pages/ContactUs";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import BrandPage from "./pages/BrandPage";


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

      </Routes>
      <Footer />
    </div>
  );
}

export default App;