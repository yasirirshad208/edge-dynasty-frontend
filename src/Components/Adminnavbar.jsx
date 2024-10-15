import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Adminnavbar.css";
import { useAuth } from "../../authContext";

const NavBar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const { isAdmin, updateAdminStatus } = useAuth();
  const navigate = useNavigate()

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsDropdownOpen(false);
    }
  };

  useEffect(() => {
    if(!isAdmin){
      navigate('/')
      return;
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav className="bg-[#141414] adminnav text-white shadow-md">
      <div className="container mx-auto px-4 py-2 flex items-center justify-between">
        <div className="hidden lg:flex lg:items-center lg:space-x-4">
          <div className="relative" ref={dropdownRef}>
            <button
              className="flex items-center space-x-2 px-4 py-2 text-gray-300 hover:text-gray-400"
              onClick={toggleDropdown}
            >
              <span>Products</span>
            </button>
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-[#141414]-700 rounded-md shadow-lg ring-1 ring-black ring-opacity-5">
                <Link
                  to="/admin"
                  className="block px-4 py-2 text-[14px] text-gray-300 hover:bg-gray-600"
                >
                  Add Product
                </Link>
                <Link
                  to="/products"
                  className="block px-4 py-2 text-[14px] text-gray-300 hover:bg-gray-600"
                >
                Products
                </Link>
              </div>
            )}
          </div>
          <Link
            to="/orders"
            className="px-4 py-2 text-gray-300 hover:text-gray-400"
          >
            Orders
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
