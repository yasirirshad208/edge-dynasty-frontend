import React, { useEffect, useRef, useState } from "react";
import "../styles/Home.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Truck from "../Components/Truck";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useProductList } from "../Data/Data";


const Home = () => {
  const [visibleSections, setVisibleSections] = useState([]);
  const sectionsRef = useRef([]);
  const { products = [] } = useProductList(); // Ensure default values
  const navigate = useNavigate();

  // const location = useLocation();
  // const { state } = location;
  // const email = state?.isAdmin;
  

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setVisibleSections((prev) => [...prev, entry.target]);
        }
      });
    });

    // Observe all valid elements
    sectionsRef.current.forEach((section) => {
      if (section) {
        observer.observe(section);
      }
    });

    return () => {
      // Unobserve all valid elements
      sectionsRef.current.forEach((section) => {
        if (section) {
          observer.unobserve(section);
        }
      });
    };
  }, []);

  

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div>
      <section
        ref={(el) => (sectionsRef.current[0] = el)}
        className={`home h-[80vh] relative  section-reveal ${
          visibleSections.includes(sectionsRef.current[0]) ? "visible" : ""
        }`}
      >
        <div className="container">
          <div className="lgheading-org homeh1" style={{ border: "none" }}>
            {" "}
            Welcome to Edge Dynasty the world <br /> of Knives
          </div>
          <p className="paraorg">
            By using our website, you affirm that you are at least 18 years old
            and have the legal capacity to enter into these Terms. If you are
            using the website on behalf of an organization.
          </p>
          <button>View Products</button>
        </div>
        <div>
          <video
            muted
            loop
            autoPlay
            className=" videoheader object-cover top-0 z-[-1] w-[100%] h-[80vh] absolute"
          >
            <source
              src="./videos/3296053-uhd_2732_1440_25fps.mp4"
              type="video/mp4"
            />
          </video>
        </div>
      </section>

      <section
        ref={(el) => (sectionsRef.current[1] = el)}
        className={`section-2-home section-reveal  ${
          visibleSections.includes(sectionsRef.current[1]) ? "visible" : ""
        }`}
      >
        {" "}
        <div
          style={{ background: "rgb(255, 115, 0,0)" }}
          className="logos py-[20px]  mb-[30px] flex "
        >
          <div className="paraorg logo-slide flex justify-between  text-white text-[14px] font-[700] p-[10] ">
            <span className="slide-name">KITCHEN CHEF SETS</span>
            <span className="slide-name">REPLICA MOVIE SWORDS</span>
            <span className="slide-name">AXES</span>
            <span className="slide-name">HUNTING BOWIE KNIVES</span>
            <span className="slide-name">HUNTING SKINNER KNIVES</span>
          </div>
          <div className="paraorg logo-slide flex justify-between  text-white text-[14px] font-[700] p-[10] ">
            <span className="slide-name">VIKING STYLE SWORD</span>
            <span className="slide-name">RAMBO HUNTING KNIVES</span>
            <span className="slide-name">MEDIEVAL SWORDS</span>
            <span className="slide-name">Exclusive DAGGERS</span>
            <span className="slide-name">STAG HORN KNIVES</span>
          </div>
        </div>
        <div className="container">
          <h1>
            Most Selling <span>Categories</span>
          </h1>
          <div className="grid grid-cols-1  md:grid-cols-2 lg:grid-cols-3 gap-5">
           
            <div className="col-span-1 overflow-hidden rounded-[20px] row-span-2 border-2 border-transparent relative" onClick={()=>navigate('/shop?category=knives')}>
            
              <img
                src="./Images/topproduct1.avif"
                className="object-cover  w-[100%] rounded-[20px] h-[100%]"
                alt=""
              />
              
              <div className="absolute bottom-[10px] p-10">
                <h3 className="text-white text-[25px] font-[700]">Knives</h3>
                <p className="text-white text-[16px]">
                  Hottest Deals of the month
                </p>
              </div>
            </div>
            
            
            <div className="col-span-1  rounded-[20px]  relative" onClick={()=>navigate('/shop?category=daggers')}>
            
              <img
                src="./Images/products/IMG_8209.JPG"
                className="object-cover  w-[100%] rounded-[20px] h-[100%]"
                alt=""
              />
              
              <div className="absolute bottom-[10px] p-10">
                <h3 className="text-white text-[25px] font-[700]">Daggers</h3>
                <p className="text-white text-[16px]">
                  Hottest Deals of the month
                </p>
              </div>
            </div>
            
            
            <div className="col-span-1  rounded-[20px] row-span-2 relative" onClick={()=>navigate('/shop?category=kitchen-chef-set')}>
            
              <img
                src="./Chefset.webp"
                className=" w-[100%]  object-cover rounded-[20px] h-[100%]"
                alt=""
              />
              
              <div className="absolute bottom-[10px] p-10">
                <h3 className="text-white text-[25px] font-[700]">Chef Sets</h3>
                <p className="text-white text-[16px]">
                  Hottest Deals of the month
                </p>
              </div>
              
            </div>
            
            <div className="col-span-1 rounded-[20px]  relative" onClick={()=>navigate('/shop?category=axes')}>
            
              <img
                src="./Axes.webp"
                className=" object-cover w-[100%]  rounded-[20px] h-[330px] imgknives"
                alt=""
                
              />
             
              <div className="absolute bottom-[10px] p-10">
                <h3 className="text-white text-[25px] font-[700]">Axes</h3>
                <p className="text-white text-[16px]">
                  Hottest Deals of the month
                </p>
              </div>
            </div>
            
          </div>
        </div>
      </section>
      <section
        ref={(el) => (sectionsRef.current[2] = el)}
        className={`  section-4-home section-reveal ${
          visibleSections.includes(sectionsRef.current[2]) ? "visible" : ""
        }`}
      >
        <div className="container">
          <h1>
            {" "}
            Our Top <span>Products</span>
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-10 gap-y-[30px]">
          {products
          .filter((element) => element.topProduct === true) // Filter products with topProduct set to true
          .slice(0, 6)
          .map((element) => {
            return (
              <div key={element.id}>
                <img
                  className="w-[100%] h-[300px] object-cover rounded-tr-2xl rounded-tl-2xl"
                  src={"http://52.203.78.4:5000/"+element.mainImage}
                  alt={element.title}
                />
                <div className="flex rounded-br-2xl rounded-bl-2xl flex-col justify-center bg-transparent shadow-orange-600 shadow-sm items-center py-16 p-5">
                  <h4 className="paraorg productheading text-white">
                    {element.name}
                  </h4>
                  <p className="paraorg" style={{ color: "white" }}>
                    {element.title}
                  </p>
                  <span className="paraorg productprice">
                    $ {element.price} USD
                  </span>
                  <button>
                    <Link to={`/product/${element._id}`}>Buy Now</Link>
                  </button>
                </div>
              </div>
            );
          })}

          </div>
        </div>
      </section>
      {/* <section
        ref={(el) => (sectionsRef.current[3] = el)}
        className={`section-3-home section-reveal  ${
          visibleSections.includes(sectionsRef.current[3]) ? "visible" : ""
        }`}
      >
        <div className="relative">
          <video
            muted
            loop
            autoPlay
            className=" videoheader object-cover top-0 z-[-1] w-[100%] h-[100vh] "
          >
            <source
              src="./videos/3296053-uhd_2732_1440_25fps.mp4"
              type="video/mp4"
            />
          </video>

          <div
            style={{ fontSize: "5rem" }}
            className="absolute sm-heading top-0 colormain"
          >
            How to get free{" "}
            <span className="colormain">
              Gifts <i class="fa-solid fa-gift fa-shake"></i>{" "}
            </span>
          </div>
        </div>
      </section> */}
      <section
        ref={(el) => (sectionsRef.current[3] = el)}
        className={`section-3-home section-reveal ${
          visibleSections.includes(sectionsRef.current[3]) ? "visible" : ""
        }`}
      >
        <div className="container">
          <h1>
            Our Latest <span>Products</span>
          </h1>
          <div className="slider-container ">
            <Slider {...settings}>
            {products.map((element) => (
              <Link to={`/product/${element._id}`}>
              <div>
                <img src={"http://52.203.78.4:5000/"+element.mainImage} alt="" style={{marginLeft:"20px"}}/>
              </div>
              </Link>
            ))}
            </Slider>
          </div>
        </div>
      </section>
      <section
        ref={(el) => (sectionsRef.current[4] = el)}
        className={`section-5-home section-reveal ${
          visibleSections.includes(sectionsRef.current[4]) ? "visible" : ""
        }`}
      >
        <div className="container">
          <div className="lgheading-org text-center mb-5 ">
            Review From Clients
          </div>
          <p
            style={{ fontSize: "18px" }}
            className="paraorg m-auto max-w-[600px] text-center"
          >
            See what our valued customers have to say about their KnifeFlow
            experience! From culinary enthusiasts to professional chefs and
            outdoor adventurers, discover why our knives are the go-to choice
            for precision, durability, and style.
          </p>
          <img
            src="./homeclients.jpg"
            className="w-[100%] md:w-[50%] h-[200px] object-cover m-auto"
            alt=""
          />
          <h3 className="text-white text-center font-[700] text-[25px]">
            "David Smith"
          </h3>
          <p className="paraorg m-auto max-w-[600px] text-center">
            See what our valued customers have to say about their KnifeFlow
            experience! From culinary enthusiasts to professional chefs and
            outdoor adventurers, discover why our knives are the go-to choice
            for precision, durability, and style.
          </p>
          <img
            src="./stars.jpg"
            className="max-w-[300px]  object-cover m-auto"
            alt=""
          />
          <hr className="w-[50%] mx-auto mt-5" />
        </div>
      </section>
      <section
        ref={(el) => (sectionsRef.current[5] = el)}
        className={`section-6-home section-reveal ${
          visibleSections.includes(sectionsRef.current[5]) ? "visible" : ""
        }`}
      >
        <div className="container relative overflow-hidden">
          <div className="trcukanimation">
            <Truck />
          </div>
          <div className="sec-6-main flex justify-between flex-col gap-10 md:flex-row">
            <div>
              <h1
                style={{ fontSize: "4.5rem" }}
                className="lgheading-org max-w-[600px]"
              >
                Celebrate July with Discounts on All Products!
              </h1>
              <button className="paraorg">Contact US Now</button>
            </div>
            <div className="relative">
              <img
                src="./discountpic.png"
                className="orange-filter rounded-2xl w-[100%]"
                alt=""
              />{" "}
              <img
                src="./discountpic.png  "
                className="orange-filter img2discount top-0 left-0  absolute rounded-2xl w-[100%]"
                alt=""
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
// import React from "react";

// const Home = () => {
//   return <div>Home</div>;
// };

// export default Home;
