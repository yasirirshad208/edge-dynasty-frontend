// src/components/ProductDetail.js
import React, { useState, useEffect, useContext } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import CartContext from '../../cartContext'; // Import CartContext
import { useProductList } from "../Data/Data";
import "../styles/ProductDetail.css";
import imgpayment from "../Data/paymentimg.jpg";
import { ColorRing } from 'react-loader-spinner';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [mainImage, setMainImage] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [loading, setLoading] = useState(true);
  const { products = [] } = useProductList();
  const [error, setError] = useState("");
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useContext(CartContext); // Use CartContext

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`https://api.edgedynasty.com:5000/api/product/single/${id}`);
        setProduct(response.data.data);
        setLoading(false);
        setMainImage(response.data.data.mainImage);
      } catch (error) {
        setError("Error fetching product details.");
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleThumbnailClick = (img, index) => {
    setMainImage(img);
    setSelectedIndex(index);
  };

  const handleAddToCart = () => {
    if (product) {
      addToCart(product, quantity);
    }
  };

  if (loading) {
    return <div style={{display:"flex", justifyContent:"center", padding:"70px 0"}}>
    <ColorRing
    visible={true}
    height="80"
    width="80"
    ariaLabel="color-ring-loading"
    wrapperStyle={{}}
    wrapperClass="color-ring-wrapper"
    colors={['#ff7300', '#ff7300', '#ff7300', '#ff7300', '#ff7300']}
    />
    </div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div className="container">
      <div className="product-detail pb-[100px] text-white grid md:grid-cols-2 gap-10 container">
        <div>
          <img
            src={"https://api.edgedynasty.com:5000/" + mainImage}
            alt={product.name}
            className="main-image h-auto md:h-[650px]"
          />
          <div className="images-gallery flex flex-wrap gap-2 mt-4">
            {product.sideImages.map((img, index) => (
              <img
                key={index}
                className={`object-cover rounded-xl cursor-pointer ${
                  selectedIndex === index ? "border-4 border-blue-500" : ""
                }`}
                src={"https://api.edgedynasty.com:5000/" + img}
                alt={`${product.name} ${index}`}
                onClick={() => handleThumbnailClick(img, index)}
              />
            ))}
          </div>
        </div>
        <div className="border p-10 rounded-3xl">
          <p className="mb-5">
            <span className="text-[20px] font-[500]">Sku : </span>
            <span className="text-[18px] text-gray-400 mx-3">{product.id}</span>
          </p>
          <h2 className="sm-heading mb-5">{product.name}</h2>
          <p className="text-orange-500 mb-5 text-[28px] border-b-2 pb-2">
            Price: $ {product.price} USD
            <span>
              <del className="text-[16px] text-gray font-[800]"> $ {product.discount} USD</del>
            </span>
          </p>
          <p className="paraorg w-[100%]">{product.description}</p>
          <input
            type="number"
            className="quantityinput"
            value={quantity}
            onChange={(e) => setQuantity(parseInt(e.target.value, 10))}
            min="1"
          />
          <button onClick={handleAddToCart} className="btnaddtocart">
            Add to Cart
          </button>
          {/* Additional product details */}
          <div>
            <h2 className="sm-heading mt-10">Material:</h2>
            <ul className="paraorg mt-5 grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              {product.materials && product.materials.map((item, index) => (
                <li key={index}>
                  {index + 1}. {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="paraorg mt-10">
            <p className="sm-heading">Storage: </p> {product.storage}
          </div>
          <div>
            <h2 className="sm-heading mt-5">Set Includes:</h2>
            <ul className="paraorg mt-5 grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              {product.setInclude && product.setInclude.map((item, index) => (
                <li key={index}>
                  {index + 1}. {item}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="sm-heading ">Dimensions:</h2>
            <ul className="paraorg mt-5 grid md:grid-cols-2 lg:grid-cols-3">
              {product.dimension && product.dimensions.map((dim, index) => (
                <li key={index}>{dim}</li>
              ))}
            </ul>
            <h2 className="sm-heading ">Payment:</h2>
            <img src={imgpayment} alt="Payment methods" />
          </div>
        </div>
      </div>
      <div className="py-[50px]">
        <h1 className="sm-heading mb-[20px]">Familiar Products</h1>
        <div className="slider-container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {products.slice(0, 3).map((element) => (
            <div key={element.id} className="">
              <img
                className="w-[100%] h-[300px] object-cover rounded-tr-2xl rounded-tl-2xl"
                src={"https://api.edgedynasty.com:5000/" + element.mainImage}
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
                </span>{" "}
                <Link
                  style={{ padding: "10px 20px" }}
                  className="btnorg my-[10px]"
                  to={`/shop`}
                >
                  Shop Now
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
