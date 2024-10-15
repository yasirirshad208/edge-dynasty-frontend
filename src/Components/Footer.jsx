import React from "react";
import "./Footer.css";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div>
      <footer className="container border-b-2 pb-10s">
        <div className="footer-div"> 
        <div className="footercol1">
          <h1 className="navlogo">Edge Dynasty</h1>
          <p className="paraorg mt-[10px]">
            Step into precision and power with BladeFlow, where every cut tells
            a story. From razor-sharp chef's knives to robust survival blades,
            we offer a curated collection to elevate your cutting game.
          </p>
        </div>
        <div className="flex">
        <div className="footercol2">
          <ul>
            <li className="footerlinheading">Menu</li>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              {" "}
              <Link to="/about">About</Link>
            </li>
            <li>
              {" "}
              <Link to="/shop">Shop</Link>
            </li>
            {/* <li>
              {" "}
              <Link to="/Contact">Contact</Link>
            </li> */}
            <li>
              {" "}
              <Link to="/blog">Blog</Link>
            </li>
          </ul>
        </div>
        <div className="footercol3">
          <ul>
            <li className="footerlinheading">Support</li>
            <li>
              {" "}
              <Link to="/about">About Us</Link>
            </li>{" "}
            <li>
              {" "}
              <Link to="/shop">Contact Us</Link>
            </li>
            <li>
              {" "}
              <Link to="/FAQS">FAQS</Link>
            </li>
            <li>
              {" "}
              <Link to="/shop">Blogs</Link>
            </li>
          </ul>
        </div>
        <div className="footercol3">
          <ul>
            <li className="footerlinheading">Policies</li>
            <li>
              {" "}
              <Link to="/privacy-policy">Privacy Policy</Link>
            </li>
            <li>
              {" "}
              <Link to="/shipping-policy">Shipping policy</Link>
            </li>
            <li>
              {" "}
              <Link to="/terms-of-services">Terms of Services</Link>
            </li>
            <li>
              {" "}
              <Link to="/return-policy">Return Policy</Link>
            </li>
          </ul>
        </div>
        </div>
        </div>
        <div className="footercol4">
          <p
            className="paraorg mt-5 mb-5 "
            style={{ fontSize: "25px", fontWeight: [700] }}
          >
            Find Us
          </p>
          <div className="flex gap-5 mb-5 border border-gray-500 p-8 rounded-2xl">
            <div className="border border-white p-5 rounded-xl flex justify-center items-center">
              <i class="fa-solid fa-envelope text-white text-[30px] "></i>
            </div>
            <div>
              <p className="font-[700] text-[22px] text-white">Email:</p>
              <a 
                href="mailto:dynastyedgeofficial@gmail.com" 
                className="text-[16px] text-orange-400"
              >
                dynastyedgeofficial@gmail.com
              </a>
            </div>
          </div>
          <div className="flex gap-5 border border-gray-500 p-8 rounded-2xl">
            <div className="border border-white p-5 rounded-xl flex justify-center items-center">
              <i class="fa-solid fa-phone text-white text-[30px]"></i>
            </div>
            <div>
              <p className="font-[700] text-[22px] text-white">Phone:</p>
              <span className="text-[16px] text-orange-400">+12342559742</span>
            </div>
          </div>
        </div>
      </footer>
      <div className="flex container flex-col md:flex-row gap-10 items-center py-10  justify-center md:justify-between">
        <div className="paraorg">
          Copyright © Edge Dynasty | Designed by Asim | Powered by
          <a href="https://edgedynasty.com/"> Edge Dynasty</a>
        </div>
        <div>
          <div className="flex gap-10 justify-center items-center">
            <i class="fa-brands fa-x-twitter text-white text-[25px]"></i>
            <a href="https://www.facebook.com/profile.php?id=100089943612676&mibextid=LQQJ4d">
              {" "}
              <i class="fa-brands fa-facebook-f text-white text-[25px]"></i>
            </a>
            <a href="https://www.instagram.com/edgedynastyofficial?igsh=MWdiemJkeTJlMGI3Ng%3D%3D&utm_source=qr">
              {" "}
              <i class="fa-brands fa-instagram text-white text-[25px]"></i>
            </a>
            <a href="https://youtube.com/@edgedynasty?si=n4iEPZYhC1uyEQn-">
              {" "}
              <i class="fa-brands fa-youtube text-white text-[25px]"></i>{" "}
            </a>
            <a href="https://www.tiktok.com/@edgedynasty?_t=8pCTxA3GoqQ&_r=1">
              {" "}
              <i class="fa-brands fa-tiktok text-white text-[25px]"></i>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
