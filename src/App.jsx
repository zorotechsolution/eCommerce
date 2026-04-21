import React, { useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
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
import PersonalCare from "./pages/PersonalCare";
import PersonalCareCategory from "./pages/PersonalCareCategory";
import ShippingDelivery from "./pages/ShippingDelivery";
import AdminAddProduct from "./pages/AdminAddProduct";
import AdminProductList from "./pages/AdminProductList";
import AdminEditProduct from "./pages/AdminEditProduct";
import AdminOrderList from "./pages/AdminOrderList";
import AdminOrderDetails from "./pages/AdminOrderDetails";
import OrderDetails from "./pages/OrderDetails";
import Sitemap from "./pages/Sitemap";
import ForgotPassword from "./pages/ForgotPassword";

import { LangProvider, useLang } from "./context/LangContext";

import { FaWhatsapp } from "react-icons/fa";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function App() {
  const { t } = useLang();
  return (
    <>
      <Router>
        <ScrollToTop />
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
          <Route path="/personal-care" element={<PersonalCare/>} />
          <Route path="/personal-care/:slug" element={<PersonalCareCategory/>} />
          <Route path="/profile" element={<Profile/>} />
          <Route path="/admin/add-product" element={<AdminAddProduct/>} />
          <Route path="/admin/products" element={<AdminProductList/>} />
          <Route path="/admin/edit-product/:id" element={<AdminEditProduct/>} />
          <Route path="/admin/orders" element={<AdminOrderList/>} />
          <Route path="/admin/orders/:id" element={<AdminOrderDetails/>} />
          <Route path="/order/:id" element={<OrderDetails/>} />
          <Route path="/privacy-policy" element={<PrivacyPolicy/>} />
          <Route path="/terms" element={<Terms/>} />
          <Route path="/refund-policy" element={<RefundPolicy/>} />
          <Route path="/shipping-delivery" element={<ShippingDelivery/>} />
          <Route path="/sitemap" element={<Sitemap/>} />
          <Route path="/forgot-password" element={<ForgotPassword/>} />
          <Route path="*" element={<NotFount404/>}/>
        </Routes>
        <Footer/>
        
        {/* Fixed WhatsApp Button */}
        <a
          href="https://wa.me/919487187384"
          target="_blank"
          rel="noopener noreferrer"
          className="fixed bottom-6 right-6 bg-[#25D366] text-white p-4 rounded-full shadow-lg hover:bg-[#128C7E] transition-all duration-300 hover:scale-110 z-50 flex justify-center items-center"
          title={t('chatOnWhatsappTitle')}
        >
          <FaWhatsapp className="text-3xl" />
        </a>
      </Router>
    </>
  );
}

export default App;
