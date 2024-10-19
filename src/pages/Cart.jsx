// src/components/Cart.js

import React, { useContext } from "react";
import CartContext from "../../cartContext";
import { Link } from "react-router-dom";

const Cart = () => {
  const { cart, removeFromCart, updateQuantity } = useContext(CartContext);

  const handleRemoveFromCart = (productId) => {
    removeFromCart(productId);
  };

  const handleQuantityChange = (productId, newQuantity) => {
    if (newQuantity > 0) {
      updateQuantity(productId, newQuantity);
    }
  };

  const calculateSubtotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    <div className="bg-[#0e0e0e] text-white main-checkout p-10 mb-10">
      <h1 className="text-orange-500 text-center font-bold mb-8" style={{ fontSize: "26px", marginBottom: "40px" }}>
        Cart
      </h1>
      <div className="flex flex-col lg:flex-row gap-10">
        {/* First div for the cart table */}
        <div className="w-full lg:w-2/3 mt-7">
          <table className="w-full text-left">
            <thead>
              <tr>
                <th style={{fontSize:"16px"}}>Remove</th>
                <th style={{fontSize:"16px"}}>Product</th>
                <th style={{fontSize:"16px"}}>Name</th>
                <th style={{fontSize:"16px"}}>Price</th>
                <th style={{fontSize:"16px"}}>Quantity</th>
                <th style={{fontSize:"16px"}}>Subtotal</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item) => (
                <tr key={item._id} className="border-b border-gray-600">
                  <td className="py-4">
                    <button onClick={() => handleRemoveFromCart(item._id)}>❌</button>
                  </td>
                  <td className="py-4">
                    <div>
                      <img
                        src={`http://52.203.78.4:5000/${item.mainImage}`}
                        alt={item.name}
                        className="w-32 h-32"
                      />
                    </div>
                  </td>
                  <td className="py-4" style={{ fontSize: "17px" }}>{item.name}</td>
                  <td className="py-4"style={{fontSize:"16px"}}>${item.price}</td>
                  <td className="py-4" style={{fontSize:"16px"}}>
                    <button
                      onClick={() => handleQuantityChange(item._id, item.quantity - 1)}
                      disabled={item.quantity <= 1}
                      className="px-2"
                    >
                      -
                    </button>
                    <span className="mx-2">{item.quantity}</span>
                    <button
                      onClick={() => handleQuantityChange(item._id, item.quantity + 1)}
                      className="px-2"
                    >
                      +
                    </button>
                  </td>
                  <td className="py-4" style={{fontSize:"16px"}}>${item.price * item.quantity}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Second div for the summary card */}
        <div className=" w-full lg:w-1/3 rounded-lg" >
        <div
              className="bg-[#0b0b0b] w-full rounded-lg h-auto mb-10 order-summary-div"
            >
              <h2 className="font-bold mb-7" style={{ fontSize: "20px" }}>
                Order Summary
              </h2>
              <div className="py-7 flex justify-between border-b border-gray-600">
                <p className="ft-14">Subtotal:</p>
                <p className="ft-14 font-semibold">
                  ${calculateSubtotal().toFixed(2)}
                </p>
              </div>
              <div className="py-7 flex justify-between border-b border-gray-600">
                <p className="ft-14">Shipping:</p>
                <p className="ft-14 font-semibold">$30.00</p>
              </div>
              <div className="py-7 flex justify-between">
                <p className="ft-14 font-bold">Total:</p>
                <p className="ft-14 font-bold">
                  ${(calculateSubtotal() + 30).toFixed(2)}
                </p>
                
              </div>
              <Link
            to="/checkout"
            className="block text-center text-[15px] bg-orange-500 text-white-600 py-4 mt-5"
          >
            CHECKOUT
          </Link>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
