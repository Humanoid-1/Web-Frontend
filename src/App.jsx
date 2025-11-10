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
import PolicyPage from "./pages/PolicyPage";
import AuthPage from './pages/Auth';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div>
  
      <ToastContainer position="top-right" autoClose={3000} />
      
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contactus" element={<ContactUs />} />
        <Route path="/brand/:brand" element={<BrandPage />} />
        <Route path="/accessories/:accessories?" element={<Accessories />} />
        <Route path="/policy" element={<PolicyPage />} />
        <Route path="/parts" element={<PartsPage />} />
        <Route path="/parts/:category" element={<PartsPage />} />
        <Route path="/brand/:brand/:id" element={<Detail />} />
        <Route path="/parts/:category/:id" element={<PartsDetail />} />
        <Route path="/accessory/:id" element={<AccessoryDetailPage />} />
        <Route path="/accessories/:category/:id" element={<AccessoryDetailPage />} />
        <Route path="/auth" element={<AuthPage />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
