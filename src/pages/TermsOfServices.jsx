import React from "react";
import { Link } from "react-router-dom";

const TermsOfService = () => {
  return (
    <div>
      <div className="py-[130px]">
        <div className="container flex flex-col md:flex-row gap-20 justify-between">
          <div>
            <div className="text-orange-500 font-[700] text-[18px]">
              Terms of Service
            </div>
            <h1 style={{ color: "white" }} className="lgheading-org">
              Service Agreement
            </h1>
            <p className="paraorg max-w-[700px]">
              Welcome to Edge Dynasty. By accessing or using our website, you agree to be bound by the following terms and conditions. If you do not agree with these terms, please do not use our website.
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

export default TermsOfService;
