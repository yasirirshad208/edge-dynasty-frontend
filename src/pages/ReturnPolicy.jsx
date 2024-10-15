import React from "react";
import { Link } from "react-router-dom";

const ReturnPolicy = () => {
  return (
    <div>
      <div className="py-[130px]">
        <div className="container flex flex-col md:flex-row gap-20 justify-between">
          <div>
            <div className="text-orange-500 font-[700] text-[18px]">
              Return Policy
            </div>
            <h1 style={{ color: "white" }} className="lgheading-org">
              Easy Returns
            </h1>
            <p className="paraorg max-w-[700px]">
              At Edge Dynasty, we want you to be completely satisfied with your purchase. If for any reason you are not happy with your order, our Return & Refund Policy outlines your options for returning items and requesting refunds. By making a purchase on our website [Insert Website URL], you agree to the terms set forth below.
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

export default ReturnPolicy;
