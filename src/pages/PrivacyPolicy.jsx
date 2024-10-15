import React from "react";
import { Link } from "react-router-dom";

const PrivacyPolicy = () => {
  return (
    <div>
      <div className="py-[130px]">
        <div className="container flex flex-col md:flex-row gap-20 justify-between">
          <div>
            <div className="text-orange-500 font-[700] text-[18px]">
              Privacy Policy
            </div>
            <h1 style={{ color: "white" }} className="lgheading-org">
              Your Privacy Matters
            </h1>
            <p className="paraorg max-w-[700px]">
              Welcome to Edge Dynasty. We are committed to protecting your privacy and ensuring that your personal information is handled in a safe and responsible manner. This Privacy Policy explains how we collect, use, disclose, and protect your information when you visit our website [Insert Website URL].
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

export default PrivacyPolicy;
