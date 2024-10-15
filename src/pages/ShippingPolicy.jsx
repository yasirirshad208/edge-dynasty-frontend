import React from "react";
import { Link } from "react-router-dom";

const ShippingPolicy = () => {
  return (
    <div>
      <div className="py-[130px]">
        <div className="container flex flex-col md:flex-row gap-20 justify-between">
          <div>
            <div className="text-orange-500 font-[700] text-[18px]">
              Shipping Policy
            </div>
            <h1 style={{ color: "white" }} className="lgheading-org">
              Shipping Information
            </h1>
            <p className="paraorg max-w-[700px]">
              At Edge Dynasty, we are committed to delivering your orders in a timely and efficient manner. This Shipping Policy outlines the terms and conditions for shipping your purchases from our website [Insert Website URL]. By placing an order with us, you agree to the terms set forth below.
            </p>
            <Link to="/shop">
            <button style={{ width: "300px" }} className="mt-10 btnaddtocart">
              Buy Now
            </button>
            </Link>
          </div>
          <div>
            <img
              className="rounded-xl w-[100%] h-[500px] imgabout shadow shadow-white object-cover"
              src="./aboutheader.webp"
              alt="Our Mission Image"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShippingPolicy;
