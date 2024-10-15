import React, { useState, useContext, useEffect } from "react";
import {
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import CartContext from "../../cartContext";
import axios from "axios";
import paypal from "../assets/paypal.png";
import "./checkout.css";
import { useAuth } from "../../authContext";

const Checkout = () => {
  const stripe = useStripe();
  const elements = useElements();
  const { cart } = useContext(CartContext);
  const { loggedIn } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    country: "",
    streetAddress1: "",
    streetAddress2: "",
    state: "",
    city: "",
    postCode: "",
    phone: "",
    saveInfo: "",
  });

  // State to track validation errors for each field
  const [errors, setErrors] = useState({});

  const [cardNumberError, setCardNumberError] = useState(false);
  const [cardExpiryError, setCardExpiryError] = useState(false);
  const [cardCvcError, setCardCvcError] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // New state for payment method
  const [paymentMethod, setPaymentMethod] = useState("card");

  const handleInputChange = (e) => {
    const { name, type, checked, value } = e.target;

    if (type === "checkbox") {
      // Set 'saveInfo' to "save-info" if checked, else to ""
      setFormData((prevData) => ({
        ...prevData,
        [name]: checked ? "save-info" : "",
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }

    // Clear error for the field that's being updated
    setErrors((prevErrors) => ({ ...prevErrors, [name]: false }));
  };

  useEffect(() => {
    const getUserInfo = async () => {
      const token = localStorage.getItem("authToken");
      if (token) {
        try {
          const response = await axios.get(
            "http://3.87.157.93:5000/api/user/get",
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          setFormData({
            email: response.data.data.email,
            firstName: response.data.data.firstName,
            lastName: response.data.data.lastName,
            country: response.data.data.country,
            streetAddress1: response.data.data.streetAddress1,
            streetAddress2: response.data.data.streetAddress2,
            state: response.data.data.state,
            city: response.data.data.city,
            postCode: response.data.data.postCode,
            phone: response.data.data.phone,
            saveInfo: response.data.data.saveInfo,
          });
        } catch (error) {
          throw new error
        }
      } else {
        updateAdminStatus(false);
      }
    };

    getUserInfo();
  }, []);

  const handleStripeError = (error) => {
    if (error) alert(`Stripe error: ${error.message}`);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    // Initialize a new errors object
    const newErrors = {};

    // Validate form fields (excluding streetAddress2 as it's optional)
    const requiredFields = [
      "email",
      "firstName",
      "lastName",
      "country",
      "streetAddress1",
      "state",
      "city",
      "postCode",
      "phone",
    ];

    requiredFields.forEach((field) => {
      if (!formData[field].trim()) {
        newErrors[field] = true;
      }
    });

    // If there are any errors, update the state and stop submission
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    if (paymentMethod === "card") {
      const cardNumberElement = elements.getElement(CardNumberElement);
      const cardExpiryElement = elements.getElement(CardExpiryElement);
      const cardCvcElement = elements.getElement(CardCvcElement);

      // Validation for card elements
      const isCardNumberEmpty = !cardNumberElement?._complete;
      const isCardExpiryEmpty = !cardExpiryElement?._complete;
      const isCardCvcEmpty = !cardCvcElement?._complete;

      setCardNumberError(isCardNumberEmpty);
      setCardExpiryError(isCardExpiryEmpty);
      setCardCvcError(isCardCvcEmpty);

      if (isCardNumberEmpty || isCardExpiryEmpty || isCardCvcEmpty) {
        return; // Stop if any card input is invalid
      }

      setIsSubmitting(true);

      try {
        const { error, paymentMethod: pm } = await stripe.createPaymentMethod({
          type: "card",
          card: cardNumberElement,
        });

        if (error) {
          handleStripeError(error);
          setIsSubmitting(false);
          return;
        }

        const cartProducts = cart.map((item) => ({
          _id: item._id,
          quantity: item.quantity,
        }));

        console.log(cartProducts);
        const response = await axios.post(
          "http://3.87.157.93:5000/api/order/payment-stripe",
          {
            paymentMethodId: pm.id,
            amount: calculateSubtotal() + 30, // Include subtotal logic
            products: cartProducts,
            ...formData, // Send form data
          }
        );

        if (response.data.success) {
          alert("Payment successful!");
          // Optionally, redirect or clear cart
        } else {
          alert("Payment failed");
        }
      } catch (error) {
        console.error(`Server error:`, error);
        alert("An error occurred while processing your payment.");
      } finally {
        setIsSubmitting(false);
      }
    } else if (paymentMethod === "paypal") {
      // Handle PayPal payment
      // This could involve redirecting to PayPal's checkout page or triggering PayPal's SDK
      alert("Redirecting to PayPal...");
      // Implement PayPal integration here
    }
  };

  const calculateSubtotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    <div className="bg-[#0e0e0e] text-white main-checkout">
      <form onSubmit={handleSubmit}>
        <h1
          className="text-orange-500 text-center font-bold mb-10"
          style={{ fontSize: "26px" }}
        >
          Checkout
        </h1>
        <div
          className="flex lg:flex-row space-between gap-12 bg-[#0e0e0e] mt-10 checkout-wrapper"
          style={{ justifyContent: "space-between" }}
        >
          <div className="w-full lg:w-3/5">
            <div className="space-y-6">
              {/* Input Fields */}
              <div>
                <label className="block text-[15px] mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  className={`w-full px-3 py-5 bg-[#0e0e0e] text-white border ${
                    errors.email
                      ? "border-red-500"
                      : "border-[rgba(255,255,255,0.4)]"
                  } outline-none text-[15px]`}
                  value={formData.email}
                  onChange={handleInputChange}
                />
                {errors.email && (
                  <p className="text-red-500 text-[12px] mt-1">
                    Email is required.
                  </p>
                )}
              </div>
              <div className="flex space-x-4">
                <div className="w-1/2">
                  <label className="block text-[15px] mb-2">First Name</label>
                  <input
                    type="text"
                    name="firstName"
                    placeholder="Enter your first name"
                    className={`w-full px-3 py-5 bg-[#0e0e0e] text-white border ${
                      errors.firstName
                        ? "border-red-500"
                        : "border-[rgba(255,255,255,0.4)]"
                    } outline-none text-[15px]`}
                    value={formData.firstName}
                    onChange={handleInputChange}
                  />
                  {errors.firstName && (
                    <p className="text-red-500 text-[12px] mt-1">
                      First name is required.
                    </p>
                  )}
                </div>
                <div className="w-1/2">
                  <label className="block text-[15px] mb-2">Last Name</label>
                  <input
                    type="text"
                    name="lastName"
                    placeholder="Enter your last name"
                    className={`w-full px-3 py-5 bg-[#0e0e0e] text-white border ${
                      errors.lastName
                        ? "border-red-500"
                        : "border-[rgba(255,255,255,0.4)]"
                    } outline-none text-[15px]`}
                    value={formData.lastName}
                    onChange={handleInputChange}
                  />
                  {errors.lastName && (
                    <p className="text-red-500 text-[12px] mt-1">
                      Last name is required.
                    </p>
                  )}
                </div>
              </div>
              <div>
                <label className="block text-[15px] mb-2">Country</label>
                <input
                  type="text"
                  name="country"
                  placeholder="Enter your country"
                  className={`w-full px-3 py-5 bg-[#0e0e0e] text-white border ${
                    errors.country
                      ? "border-red-500"
                      : "border-[rgba(255,255,255,0.4)]"
                  } outline-none text-[15px]`}
                  value={formData.country}
                  onChange={handleInputChange}
                />
                {errors.country && (
                  <p className="text-red-500 text-[12px] mt-1">
                    Country is required.
                  </p>
                )}
              </div>
              <div>
                <label className="block text-[15px] mb-2">
                  Street Address 1
                </label>
                <input
                  type="text"
                  name="streetAddress1"
                  placeholder="Enter your first address"
                  className={`w-full px-3 py-5 bg-[#0e0e0e] text-white border ${
                    errors.streetAddress1
                      ? "border-red-500"
                      : "border-[rgba(255,255,255,0.4)]"
                  } outline-none text-[15px]`}
                  value={formData.streetAddress1}
                  onChange={handleInputChange}
                />
                {errors.streetAddress1 && (
                  <p className="text-red-500 text-[12px] mt-1">
                    Street Address 1 is required.
                  </p>
                )}
              </div>
              <div>
                <label className="block text-[15px] mb-2">
                  Street Address 2
                </label>
                <input
                  type="text"
                  name="streetAddress2"
                  placeholder="Enter your second address"
                  className="w-full p-3 bg-[#0e0e0e] text-white border border-[rgba(255,255,255,0.4)] border-0.5 outline-none text-[15px]"
                  value={formData.streetAddress2}
                  onChange={handleInputChange}
                />
                {/* Street Address 2 is optional; no error message needed */}
              </div>
              <div>
                <label className="block text-[15px] mb-2">
                  Province / State
                </label>
                <input
                  type="text"
                  name="state"
                  placeholder="Enter Province / State"
                  className={`w-full px-3 py-5 bg-[#0e0e0e] text-white border ${
                    errors.state
                      ? "border-red-500"
                      : "border-[rgba(255,255,255,0.4)]"
                  } outline-none text-[15px]`}
                  value={formData.state}
                  onChange={handleInputChange}
                />
                {errors.state && (
                  <p className="text-red-500 text-[12px] mt-1">
                    Province / State is required.
                  </p>
                )}
              </div>
              <div className="flex space-x-4">
                <div className="w-1/2">
                  <label className="block text-[15px] mb-2">City</label>
                  <input
                    type="text"
                    name="city"
                    placeholder="Enter your city"
                    className={`w-full px-3 py-5 bg-[#0e0e0e] text-white border ${
                      errors.city
                        ? "border-red-500"
                        : "border-[rgba(255,255,255,0.4)]"
                    } outline-none text-[15px]`}
                    value={formData.city}
                    onChange={handleInputChange}
                  />
                  {errors.city && (
                    <p className="text-red-500 text-[12px] mt-1">
                      City is required.
                    </p>
                  )}
                </div>
                <div className="w-1/2">
                  <label className="block text-[15px] mb-2">Post Code</label>
                  <input
                    type="text"
                    name="postCode"
                    placeholder="Enter your post code"
                    className={`w-full px-3 py-5 bg-[#0e0e0e] text-white border ${
                      errors.postCode
                        ? "border-red-500"
                        : "border-[rgba(255,255,255,0.4)]"
                    } outline-none text-[15px]`}
                    value={formData.postCode}
                    onChange={handleInputChange}
                  />
                  {errors.postCode && (
                    <p className="text-red-500 text-[12px] mt-1">
                      Post Code is required.
                    </p>
                  )}
                </div>
              </div>
              <div>
                <label className="block text-[15px] mb-2">Phone</label>
                <input
                  type="text"
                  name="phone"
                  placeholder="Enter your phone number"
                  className={`w-full px-3 py-5 bg-[#0e0e0e] text-white border ${
                    errors.phone
                      ? "border-red-500"
                      : "border-[rgba(255,255,255,0.4)]"
                  } outline-none text-[15px]`}
                  value={formData.phone}
                  onChange={handleInputChange}
                />
                {errors.phone && (
                  <p className="text-red-500 text-[12px] mt-1">
                    Phone number is required.
                  </p>
                )}
              </div>

              {loggedIn && (
                <div className="flex gap-3 items-center">
                  <input
                    type="checkbox"
                    name="saveInfo"
                    onChange={handleInputChange}
                    checked={formData.saveInfo === "save-info"}
                  />
                  <label className="block text-[15px] mt-0.5">Save Info</label>
                </div>
              )}

             

              {/* Add other form fields here if necessary */}
            </div>
          </div>

          <div className="w-full lg:w-2/5 bg-[#141414] p-10">
            {/* Order Summary */}
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
              {loggedIn &&(
                 <div className="py-7 flex justify-between border-b border-gray-600">
                 <p className="ft-14">Discount:</p>
                 <p className="ft-14 font-semibold">
                   ${calculateSubtotal().toFixed(2)}
                 </p>
               </div>
              )}
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
            </div>

            {/* Payment Method Selection */}
            <div className="mb-10">
              <h2 className="font-bold mb-4" style={{ fontSize: "20px" }}>
                Payment Method
              </h2>
              <div className="flex items-center mb-3">
                <input
                  type="radio"
                  id="creditCard"
                  name="paymentMethod"
                  value="card"
                  checked={paymentMethod === "card"}
                  onChange={() => setPaymentMethod("card")}
                  className="mr-2"
                />
                <label htmlFor="creditCard" className="text-[16px]">
                  Credit Card
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="radio"
                  id="paypal"
                  name="paymentMethod"
                  value="paypal"
                  checked={paymentMethod === "paypal"}
                  onChange={() => setPaymentMethod("paypal")}
                  className="mr-2"
                />
                <label htmlFor="paypal" className="text-[16px]">
                  PayPal
                </label>
              </div>
            </div>

            {/* Conditional Rendering Based on Payment Method */}
            {paymentMethod === "card" && (
              <div className="bg-[#0b0b0b] p-5 rounded-lg">
                {/* Credit Card Inputs */}
                <div className="mb-5">
                  <label className="block text-[15px] mb-2">Card Number</label>
                  <CardNumberElement
                    options={{
                      style: {
                        base: {
                          fontSize: "16px",
                          color: "#ffffff",
                          "::placeholder": { color: "rgba(255,255,255,0.6)" },
                        },
                        invalid: { color: "#ff6347" },
                      },
                    }}
                    onChange={() => setCardNumberError(false)}
                    className={`p-5 bg-[#0b0b0b] text-white border ${
                      cardNumberError
                        ? "border-red-500"
                        : "border-[rgba(255,255,255,0.4)]"
                    } outline-none text-[15px]`}
                  />
                  {cardNumberError && (
                    <p className="text-red-500 text-[12px] mt-1">
                      Please enter a valid card number.
                    </p>
                  )}
                </div>
                <div className="flex gap-5 mb-5 card-flex">
                  <div className="flex-1 expiration-input">
                    <label className="block text-[15px] mb-2">
                      Expiration Date
                    </label>
                    <CardExpiryElement
                      options={{
                        style: {
                          base: {
                            fontSize: "16px",
                            color: "#ffffff",
                            "::placeholder": { color: "rgba(255,255,255,0.6)" },
                          },
                          invalid: { color: "#ff6347" },
                        },
                      }}
                      onChange={() => setCardExpiryError(false)}
                      className={`p-5 bg-[#0b0b0b] text-white border ${
                        cardExpiryError
                          ? "border-red-500"
                          : "border-[rgba(255,255,255,0.4)]"
                      } outline-none text-[15px]`}
                    />
                    {cardExpiryError && (
                      <p className="text-red-500 text-[12px] mt-1">
                        Please enter a valid expiration date.
                      </p>
                    )}
                  </div>
                  <div className="flex-1">
                    <label className="block text-[15px] mb-2">CVC</label>
                    <CardCvcElement
                      options={{
                        style: {
                          base: {
                            fontSize: "16px",
                            color: "#ffffff",
                            "::placeholder": { color: "rgba(255,255,255,0.6)" },
                          },
                          invalid: { color: "#ff6347" },
                        },
                      }}
                      onChange={() => setCardCvcError(false)}
                      className={`p-5 bg-[#0b0b0b] text-white border ${
                        cardCvcError
                          ? "border-red-500"
                          : "border-[rgba(255,255,255,0.4)]"
                      } outline-none text-[15px]`}
                    />
                    {cardCvcError && (
                      <p className="text-red-500 text-[12px] mt-1">
                        Please enter a valid CVC.
                      </p>
                    )}
                  </div>
                </div>
                <button
                  type="submit"
                  onClick={handleSubmit}
                  className="w-full bg-orange-500 p-4 text-white font-bold text-[14px] mt-5"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Processing..." : "Place Order"}
                </button>
              </div>
            )}

            {paymentMethod === "paypal" && (
              <div className="paypal p-5">
                {/* PayPal Button */}
                <button
                  type="button"
                  className="bg-[#ffd140] p-4 w-full rounded-[40px] flex items-center justify-center"
                  onClick={() => {
                    // Implement PayPal payment flow here
                    alert("PayPal is not available");
                  }}
                >
                  <img className="w-[90px]" src={paypal} alt="PayPal" />
                </button>
              </div>
            )}
          </div>
        </div>
      </form>
    </div>
  );
};

export default Checkout;
