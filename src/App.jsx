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
import PartsPage from "./pages/PartsPage";
import Detail from "./pages/Detail";
import AccessoryDetailPage from "./pages/AccessoriesDetailPage";
import PartsDetail from "./pages/partsDetail";
// import AccessoriesDetail from "./pages/accessoriesdetail";
// import AccessoryDetailPage from "./pages/AccessoryDetailPage";



function App() {
  return (
    <div>
      <Header />      
      <Routes>
     <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contactus" element={<ContactUs />} />
        <Route path="/brand/:brand" element={<BrandPage />} />
        <Route path="/accessories/:accessories?" element={<Accessories />} />
     
        <Route path="/parts" element={<PartsPage />} />
        <Route path="/parts/:category" element={<PartsPage />} />
        <Route path="/detail/:id" element={<Detail/>} />
        
        <Route path="/parts/:category/:id" element={<PartsDetail />} />
        {/* <Route path="/accessoriesdetail/:id" element={<AccessoriesDetail/>} /> */}
        <Route path="/accessory/:id" element={<AccessoryDetailPage />} />
        <Route path="/accessories/:category/:id" element={<AccessoryDetailPage />} />

        
        
      </Routes>
      <Footer />
    </div>
  );
}

export default App;