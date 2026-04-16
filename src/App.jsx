import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./component/Navbar";
import Home from "./component/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ProductList from "./pages/ProductList";
import Footer from "./component/Footer";
import AddCart from "./pages/AddCart";
import NotFount404 from "./pages/NotFount404";
import Product from "./pages/Product";
import Checkout from "./pages/Checkout";
import Payment from "./pages/Payment";
import Wishlist from "./pages/Wishlist";
import AboutUs from "./pages/AboutUs";
import EConsultation from "./pages/EConsultation";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Terms from "./pages/Terms";
import RefundPolicy from "./pages/RefundPolicy";
import Profile from "./pages/Profile";
import Siddhar from "./pages/Siddhar";
import CompanyProfile from "./pages/CompanyProfile";

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Signup" element={<Signup/>}/>
          <Route path="/ProductList/:id" element={<ProductList/>} />
          <Route path="/addcart" element={<AddCart/>} />
          <Route path="/collections" element={<Product/>} />
          <Route path="/collections/:category" element={<Product/>} />
          <Route path="/checkout" element={<Checkout/>} />
          <Route path="/payment" element={<Payment/>} />
          <Route path="/wishlist" element={<Wishlist/>} />
          <Route path="/about" element={<AboutUs/>} />
          <Route path="/siddhar" element={<Siddhar />} />
          <Route path="/company-profile" element={<CompanyProfile />} />
          <Route path="/e-consultation" element={<EConsultation/>} />
          <Route path="/profile" element={<Profile/>} />
          <Route path="/privacy-policy" element={<PrivacyPolicy/>} />
          <Route path="/terms" element={<Terms/>} />
          <Route path="/refund-policy" element={<RefundPolicy/>} />
          <Route path="*" element={<NotFount404/>}/>
        </Routes>
        <Footer/>
      </Router>
    </>
  );
}

export default App;
