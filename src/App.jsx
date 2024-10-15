import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Shop from "./pages/Shop";
import ProductDetail from "./pages/ProductDetail";
import Animation from "./Animation";
import ScrollToTop from "./Components/ScrollToTop";
import Faq from "./pages/Faq";
import Login from "./pages/Login";
import Products from "./pages/Products";
import AddProduct from "./pages/AddProduct";
import NavBar from "./Components/Adminnavbar";
import Signup from "./pages/Signup";
import Forgot from "./pages/Forgot";
import VerifyEmail from "./pages/VerifyEmail";
import ResetPassword from "./pages/ResetPassword";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfServices";
import ShippingPolicy from "./pages/ShippingPolicy";
import ReturnPolicy from "./pages/ReturnPolicy";

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Orders from "./pages/orders";

const App = () => {
  const [animationComplete, setAnimationComplete] = useState(false);

  const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC);

  // Navigate to "/" automatically after animation completes
  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimationComplete(true);
    }, 3000); // 3 seconds for the animation

    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      <BrowserRouter>
        <ScrollToTop />
        <Navbar />
        <Elements stripe={stripePromise}>
        <Routes>
          {!animationComplete && <Route path="/" element={<Animation />} />}
          {/* Show animation first */}
          {animationComplete && <Route path="/" element={<Home />} />}
          {/* Show Home after animation */}
          <Route path="/about" element={<About />} />
          <Route path="/about" element={<About />} />
          <Route path="/admin" element={<AddProduct />} />
          <Route path="/cart" element={<Cart />} />

          
          <Route path="/checkout" element={<Checkout />} />
          

          <Route path="/shop" element={<Shop />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/faq" element={<Faq></Faq>}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/signup" element={<Signup />}></Route>
          <Route path="/contact" element={<Contact />}></Route>
          <Route path="/forgot" element={<Forgot />}></Route>
          <Route path="/verify-email" element={<VerifyEmail />}></Route>
          <Route path="/reset-password/:id" element={<ResetPassword />}></Route>
          <Route path="/products" element={<Products />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-of-services" element={<TermsOfService />} />
          <Route path="/shipping-policy" element={<ShippingPolicy />} />
          <Route path="/return-policy" element={<ReturnPolicy />} />
          <Route path="/orders" element={<Orders />} />
        </Routes>
        </Elements>
        <Footer />
      </BrowserRouter>
    </div>
  );
};

export default App;
