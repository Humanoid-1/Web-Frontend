import React from "react";
import Home from "./pages/Home";
import Header from "./components/Header";
import { Route, Routes } from "react-router-dom";
import About from "./pages/About";
import ContactUs from "./pages/ContactUs";
<<<<<<< HEAD
import BrandPage from "./pages/BrandPage";  // <-- import brand page

=======
>>>>>>> origin/main
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

function App() {
  return (
    <div>
      <Header />
<<<<<<< HEAD
=======
      
>>>>>>> origin/main
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/About" element={<About />} />
        <Route path="/ContactUs" element={<ContactUs />} />
<<<<<<< HEAD
        <Route path="/brand/:brandName" element={<BrandPage />} /> {/* <-- route for brand */}
=======
>>>>>>> origin/main
      </Routes>
    </div>
  );
}

export default App;
