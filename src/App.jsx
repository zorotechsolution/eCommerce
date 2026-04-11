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
          <Route path="*" element={<NotFount404/>}/>
          <Route path="collections" element={<Product/>} />
        </Routes>
        <Footer/>
      </Router>
    </>
  );
}

export default App;
