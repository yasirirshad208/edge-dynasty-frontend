// Navbar.js
import React, { useState, useRef, useEffect, useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./Navbar.css";
import { useAuth } from "../../authContext";
import axios from "axios";
import CartContext from "../../cartContext"; // Import CartContext

const Navbar = () => {
  const [navshow, setNavShow] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [searchDropdownOpen, setSearchDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const location = useLocation();
  const { isAdmin, updateAdminStatus, loggedIn, updateLoginStatus } = useAuth();
  const { cart, removeFromCart, lastUpdated } = useContext(CartContext); // Access cart, removeFromCart, and lastUpdated
  const [loginDropdownOpen, setLoginDropdownOpen] = useState(false);
  const [isUser, setIsUser] = useState(false);
  const navigate = useNavigate();
  

  // State to manage cart sidebar visibility
  const [isCartOpen, setIsCartOpen] = useState(false);

  function navToggle() {
    setNavShow(!navshow);
  }

  function toggleDropdown() {
    setDropdownOpen(!dropdownOpen);
  }

  function toggleCart() {
    setIsCartOpen(!isCartOpen);
  }

  // Open cart sidebar when a new item is added or quantity is updated
  useEffect(() => {
    if (lastUpdated) { // Check if lastUpdated has a value
      setIsCartOpen(true);
    }
  }, [lastUpdated]);

  // Close search dropdown if clicked outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setSearchDropdownOpen(false);
      }
    }

    if (searchDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [searchDropdownOpen]);

  useEffect(() => {
    const verifyToken = async () => {
      const token = localStorage.getItem("authToken");
      if (token) {
        try {
          const response = await axios.get(
            "http://3.87.157.93:5000/api/user/verify/admin",
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          if (response.data) {
            if (response.data.isAdmin === true) {
              updateAdminStatus(response.data.isAdmin);
              
            }
            setIsUser(true);
            updateLoginStatus(true)
          } else {
            setError("Unexpected response structure");
          }
        } catch (error) {
          setError("Error verifying token.");
        }
      } else {
        updateAdminStatus(false);
      }
    };

    verifyToken();
  }, [updateAdminStatus]);

  function handleLogout() {
    localStorage.removeItem("authToken");
    updateAdminStatus(false);
    updateLoginStatus(false)
    setIsUser(false);
    navigate("/login");
  }

  // Handle search input and API call
  const handleSearchInput = async (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (query.length > 2) { // Minimum 3 characters to search
      try {
        const response = await axios.get(`http://3.87.157.93:5000/api/product/search?searchQuery=${query}`);
        setSearchResults(response.data.data); // Assuming the API returns an array of products
        setSearchDropdownOpen(true);
      } catch (error) {
        setSearchResults([]);
      }
    } else {
      setSearchResults([]);
      setSearchDropdownOpen(false);
    }
  };

  // Login/Logout Button Rendering
  const showLogin = () => {
    if (!loggedIn) {
      return (
        <div className="relative">
          <img
            className="w-[30px] ml-5"
            src="./Images/loginlogo.webp"
            alt=""
            style={{ cursor: "pointer" }}
            onClick={() => setLoginDropdownOpen(!loginDropdownOpen)}
          />
          {loginDropdownOpen && (
            <div className="absolute right-0 top-10 bg-black text-white rounded-lg shadow-lg w-48 mt-2 z-50 px-2 py-2 text-[14px]">
              <Link
                to="/login"
                className="block px-4 py-2 hover:bg-gray-800"
                onClick={() => setLoginDropdownOpen(false)}
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="block px-4 py-2 hover:bg-gray-800"
                onClick={() => setLoginDropdownOpen(false)}
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>
      );
    } else {
      return (
        <button onClick={handleLogout}>
          <img className="w-[30px] ml-5" src="./Images/logout.png" alt="Logout" />
        </button>
      );
    }
  };

  // Calculate total quantity in cart
  const getTotalQuantity = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  return (
    <div>
      {/* Top Banner */}
      <div
          style={{ background: "rgb(255, 115, 0)" }}
          className="logos py-[2px]  mb-[0px] flex "
        >
          <div className="paraorg logo-slide flex justify-between  text-white text-[14px] font-[700] p-[10] topSlider">
            <span className="slide-name"><i class="fa-solid fa-bolt-lightning"></i> Flat 30% offer</span>
            <span className="slide-name"><i class="fa-solid fa-bolt-lightning"></i> Flat 30% offer</span>
            <span className="slide-name"><i class="fa-solid fa-bolt-lightning"></i> Flat 30% offer</span>
            <span className="slide-name"><i class="fa-solid fa-bolt-lightning"></i> Flat 30% offer</span>
            <span className="slide-name"><i class="fa-solid fa-bolt-lightning"></i> Flat 30% offer</span>
          </div>
          <div className="paraorg logo-slide flex justify-between  text-white text-[14px] font-[700] p-[10] topSlider">
            <span className="slide-name"><i class="fa-solid fa-bolt-lightning"></i> Flat 30% offer</span>
            <span className="slide-name"><i class="fa-solid fa-bolt-lightning"></i> Flat 30% offer</span>
            <span className="slide-name"><i class="fa-solid fa-bolt-lightning"></i> Flat 30% offer</span>
            <span className="slide-name"><i class="fa-solid fa-bolt-lightning"></i> Flat 30% offer</span>
            <span className="slide-name"><i class="fa-solid fa-bolt-lightning"></i> Flat 30% offer</span>
          </div>
        </div>

      {/* Navbar */}
      <div className="navmain">
        <nav className="container">
          <div className="navlogo">
            <Link to="/">Edge Dynasty</Link>
          </div>

          {/* Global Search Input */}
          <div className="relative navinputmain" ref={dropdownRef}>
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchInput}
              placeholder="What are you looking for?"
            />
            <div className="absolute bg-black right-[5px] w-[45px] h-[45px] flex justify-center items-center rounded-xl top-[4px]">
              <i className="fa-solid text-white text-[15px] fa-magnifying-glass"></i>
            </div>

            {/* Search Results Dropdown */}
            {searchDropdownOpen && searchResults.length > 0 && (
              <div className="absolute bg-white w-full shadow-lg rounded-lg mt-2 z-50">
                {searchResults.map((product) => (
                  <Link
                    to={`/product/${product._id}`}
                    key={product._id}
                    className="flex items-center px-4 py-2 border-b border-gray-200 last:border-b-0"
                    onClick={() => setSearchDropdownOpen(false)}
                  >
                    {/* Product Image */}
                    <img
                      src={`http://3.87.157.93:5000/${product.mainImage}`}
                      alt={product.name}
                      className="w-[6rem] h-[6rem] object-cover mr-4 rounded-md"
                    />

                    {/* Product Details */}
                    <div className="flex flex-col flex-grow">
                      <span className="text-[1.6rem] font-semibold">{product.name}</span>
                      <div className="flex items-center mt-1">
                        <span className="text-[1.6rem] font-bold text-gray-800 mr-2">${product.price}</span>
                        {product.discount && (
                          <span className="text-[1.6rem] text-red-400 line-through">${product.price}</span>
                        )}
                      </div>
                    </div>

                    {/* Buy Now Button */}
                    <button className="ml-4 px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600">
                      Buy Now
                    </button>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Right Side Icons */}
          <div className="flex gap-5 justify-center items-center text-white">
            <img className="w-[50px] needhelp" src="./phone.webp" alt="" />
            <div className="text-[15px] needhelp">
              Need Help? <div>0123-456-789</div>
            </div>
            <div className="flex gap-5 items-end relative">
              {showLogin()}

              {/* Cart Icon */}
              <button onClick={toggleCart} className="relative">
                <i className="fa-solid fa-cart-shopping text-white text-[24px] relative">
                  <span className="absolute top-[-10px] right-[-18px] bg-orange-500 w-[15px] h-[15px] rounded-full flex justify-center items-center text-[12px] text-white">
                    {getTotalQuantity()}
                  </span>
                </i>
              </button>
            </div>
          </div>
        </nav>
      </div>

      {/* Secondary Navigation */}
      <div className="sec-nav">
        <div className={`flex gap-10 navlinks ${navshow ? "navlinkshow" : ""}`}>
          <div onClick={navToggle} className="relative">
            <Link to="/" className={`${location.pathname === "/" ? "text-orange-300 active" : "navLink"}`}>
              Home
            </Link>
          </div>
          <div onClick={navToggle} className="relative">
            <Link to="/about" className={`${location.pathname === "/about" ? "text-orange-300 active" : "navLink"}`}>
              About
            </Link>
          </div>
          <div onClick={navToggle} className="relative">
            <Link to="/shop" className={`${location.pathname === "/shop" ? "text-orange-300 active" : "navLink"}`}>
              Shop
            </Link>
          </div>
          <div onClick={navToggle} className="relative">
            <Link to="/contact" className={`${location.pathname === "/contact" ? "text-orange-300 active" : "navLink"}`}>
              Contact
            </Link>
          </div>
          <div onClick={toggleDropdown} className="relative">
            <Link className={`nav-dropdown-toggle ${dropdownOpen ? "active" : "navLink"}`}>
              Categories
            </Link>
            {dropdownOpen && (
              <div className="nav-dropdown-menu">
                <Link to="/shop?category=daggers" className="nav-dropdown-item navLink">
                  Daggers
                </Link>
                <Link to="/shop?category=axes" className="nav-dropdown-item navLink">
                  Axes
                </Link>
                <Link to="/shop?category=swords" className="nav-dropdown-item navLink">
                  Swords
                </Link>
                <Link to="/shop?category=kitchen-chef-set" className="nav-dropdown-item navLink">
                  Kitchen Sets
                </Link>
                <Link to="/shop?category=bowie-knives" className="nav-dropdown-item navLink">
                  Bowie Knives
                </Link>
              </div>
            )}
          </div>
          <div onClick={navToggle} className="relative">
            <Link to="/faq" className={`${location.pathname === "/faq" ? "text-orange-300 active" : "navLink"}`}>
              Faqs
            </Link>
          </div>
          {isAdmin && (
            <div onClick={navToggle} className="relative">
              <Link to="/admin" className={`${location.pathname === "/admin" ? "text-orange-300 active" : "navLink"}`}>
                Admin
              </Link>
            </div>
          )}
        </div>
        <button
          onClick={navToggle}
          className="bg-orange-400 menushow menuhide text-white px-5 py-3 text-[16px] onclick"
        >
          <i className="fa-solid fa-bars text-[25px] text-white"></i>
        </button>
      </div>

      {/* Cart Sidebar */}
      {isCartOpen && (
  <>
    {/* Overlay */}
    <div
      className="fixed inset-0 bg-black opacity-50 z-40"
      onClick={toggleCart}
    ></div>

    {/* Sidebar */}
    <div className="cart-sidebar flex flex-col justify-between fixed top-0 right-0 w-[300px] bg-[#0e0e0e] shadow-lg z-50 transform transition-transform duration-300 text-white">
      <div>
        <div className="flex justify-between items-center px-4 py-8 border-b-[0.5px]">
          <h2 className="text-[22px] font-semibold">Your Cart</h2>
          <button onClick={toggleCart}>
            <i className="fa-solid fa-xmark mr-2 text-[20px]"></i>
          </button>
        </div>
        <div className="cart-items p-4" style={{ maxHeight: '80vh' }}>
          {cart.length === 0 ? (
            <p className="text-center text-[15px] text-gray-500 mt-10">Your cart is empty.</p>
          ) : (
            cart.map((item) => (
              <div key={item._id} className="flex items-center my-6">
                <img
                  src={`http://3.87.157.93:5000/${item.mainImage}`}
                  alt={item.name}
                  className="w-20 h-20 object-cover rounded"
                />
                <div className="ml-4 flex-grow">
                  <h3 className="text-[16px]">{item.name}</h3>
                  <p className="text-[12px] text-[#5c5c5c]">
                    {item.quantity} x ${item.price} = ${item.quantity * item.price}
                  </p>
                </div>
                <button onClick={() => removeFromCart(item._id)}>
                  <i className="fa-solid fa-xmark text-[15px] text-red-500"></i>
                </button>
              </div>
            ))
          )}
        </div>
      </div>

      {cart.length > 0 && (
        <div className="p-4 border-t mb-3">
          {/* Subtotal */}
          <div className="flex justify-between items-center text-[16px] mb-3 px-2">
            <span>Subtotal:</span>
            <span>
              ${cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2)}
            </span>
          </div>

          {/* View Cart and Checkout Links */}
          <Link
            to="/cart"
            className="block text-center text-[15px] text-white-600 border border-orange-500 py-4 mt-4"
            onClick={toggleCart}
          >
            VIEW CART
          </Link>
          <Link
            to="/checkout"
            className="block text-center text-[15px] bg-orange-500 text-white-600 py-4 mt-5"
            onClick={toggleCart}
          >
            CHECKOUT
          </Link>
        </div>
      )}
    </div>
  </>
)}


    </div>
  );
};

export default Navbar;
