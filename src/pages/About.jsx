import React from "react";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <div>
      <div className="py-[130px]">
        <div className="container flex flex-col md:flex-row gap-20 justify-between">
          <div>
            <div className="text-orange-500 font-[700] text-[18px]">
              Introducing
            </div>
            <h1 style={{ color: "white" }} className="lgheading-org">
              Our Mission
            </h1>
            <p className="paraorg max-w-[700px]">
              At Edge Dynasty, our mission is to craft exceptional knives that
              marry tradition with innovation. We are dedicated to delivering
              precision, beauty, and durability in every blade, empowering chefs
              and culinary enthusiasts to achieve their best. Through our
              relentless pursuit of perfection, we aim to create not just
              knives, but timeless pieces of art that inspire and endure.
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
      <section className="my-[30px] mb-[100px]">
        <div className="container ">
          <div className="text-center ">
            <h1 className="lgheading-org">Our Location in Texas</h1>
            <p className="paraorg">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quas
              ratione eos necessitatibus autem magnam culpa tenetur illo?
              Reprehenderit sequi, optio sunt quo vero quasi delectus
              repellendus dignissimos eius culpa? Consequatur.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
