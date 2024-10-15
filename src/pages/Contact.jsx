import React, { useState } from "react";
import axios from "axios";
import "../styles/Contact.css";
import "../styles/Faq.css";
import { Link } from "react-router-dom";

const Contact = () => {
  // State for form data
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
  });

  // State for submission status
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setResponseMessage("");

    try {
      const response = await axios.post(
        "http://3.87.157.93:5000/api/contact/create",
        formData
      );

      console.log(response);

      if (response.data.success) {
        setResponseMessage("Your message has been sent successfully!");
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          message: "",
        });
      } else {
        throw new Error("Failed to submit form: " + response.data.message);
      }
    } catch (error) {
      console.error("Submission error: ", error); // Log the error details
      setResponseMessage(
        "There was an error sending your message. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <div className="subpages-header flex flex-col justify-center items-center mb-[80px]">
        <div className="container flex flex-col justify-center items-center">
          <h1 className="lgheading-org">Contact Us</h1>
          <p className="paraorg max-w-[600px] text-center">
            At Edge Dynasty, we're more than just an online Kive store – we're
            your trusted partner in all things footwear. With a passion for
            innovation and a commitment to excellence, we offer a cutting-edge
            selection that sets us apart from the rest.
          </p>
        </div>
      </div>
      <div className="pb-[50px] container">
        <div className="flex flex-col gap-y-[50px] my-20">
          <div className="md:my-[60px]">
            <span
              className="paraorg"
              style={{
                color: "rgb(255, 115, 0)",
                fontSize: "22px",
                fontWeight: 500,
              }}
            >
              Purpose
            </span>
            <div className="lgheading-org">Connect with Edge Dynasty</div>
            <p className="paraorg max-w-[100%] pb-10">
              At Edge Dynasty, we pride ourselves on delivering an unparalleled
              experience in both our craftsmanship and customer service. Your
              inquiries and feedback are of the utmost importance to us. Whether
              you’re seeking expert guidance, have questions about our exclusive
              collections, or wish to discuss a bespoke order, our dedicated
              team is here to assist. Please fill out the form below, and we
              will respond with the excellence and attention to detail that
              define our brand. We look forward to the opportunity to serve you.
            </p>
            <img
              src="./contactimg.jpg"
              className="object-cover w-[100%] h-[450px] rounded-2xl"
              alt="Contact"
            />
          </div>
          <div className="flex flex-col md:flex-row items-center justify-between gap-x-[50px] my-20">

          <div className="flex justify-center w-full">
              <form className="submitform" onSubmit={handleSubmit}>
                <h1
                  style={{ fontSize: "39px", marginBottom: "20px" }}
                  className="uppercase lgheading-org"
                >
                  Contact Us
                </h1>
                <div className="grid grid-cols-2 gap-x-[20px] gap-y-[20px] md:gap-y-[50px]">
                  <input
                    type="text"
                    name="firstName"
                    placeholder="First Name"
                    value={formData.firstName}
                    onChange={handleChange}
                  />
                  <input
                    type="text"
                    name="lastName"
                    placeholder="Last Name"
                    value={formData.lastName}
                    onChange={handleChange}
                  />
                  <input
                    type="email"
                    name="email"
                    placeholder="example@gmail.com"
                    value={formData.email}
                    onChange={handleChange}
                  />
                  <input
                    type="text"
                    name="phone"
                    placeholder="(123) 456 - 789"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                  
                </div>
                <textarea
                  name="message"
                  className="mt-10 w-[100%] h-[200px]"
                  placeholder="Please type your message here..."
                  value={formData.message}
                  onChange={handleChange}
                ></textarea>
                <button
                  type="submit"
                  className="btnaddtocart btnorg btncontact mt-[50px]"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Submitting..." : "Submit"}
                </button>
              </form>
              {responseMessage && (
                <p
                  className={`mt-4 ${
                    responseMessage.startsWith("Your")
                      ? "text-green-500"
                      : "text-red-500"
                  }`}
                  style={{fontSize:"14px"}}
                >
                  {responseMessage}
                </p>
              )}
            </div>

            <div className="main_earth flex items-center justify-between mr-[100px]">
            <div id="earth" />
          </div>

            
          </div>



        </div>

      </div>
    </div>
  );
};

export default Contact;
