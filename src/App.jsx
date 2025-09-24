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
<<<<<<< HEAD
import LaptopDetail from "./pages/Detail";
=======
>>>>>>> a29321732f799b6ecf6d3d1e176b8b4c307ee127
import PartsPage from "./pages/PartsPage";
import Detail from "./pages/Detail";


function App() {
  return (
    <div>
      <Header />      
      <Routes>
     <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contactus" element={<ContactUs />} />
        <Route path="/brand/:brand" element={<BrandPage />} />
        {/* <Route path="/accessories/" element={<Accessories />} /> */}
        <Route path="/accessories/:accessories?" element={<Accessories />} />
<<<<<<< HEAD

        <Route path="/parts/:category?" element={<PartsPage />} />
        <Route path="/detail/:id" element={<LaptopDetail />} />
=======
     
        <Route path="/parts" element={<PartsPage />} />
        <Route path="/detail/:id" element={<Detail/>} />
        
>>>>>>> a29321732f799b6ecf6d3d1e176b8b4c307ee127
        
      </Routes>
      <Footer />
    </div>
  );
}

export default App;