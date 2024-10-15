import React, { useState } from "react";
import "../styles/Faq.css";
import { Link } from "react-router-dom";

const Faq = () => {
  const [questions, setQuestions] = useState([
    {
      id: 1,
      isExpanded: false,
      heading: "What makes Edge Dynasty knives unique?",
      content:
        "Our knives are handcrafted using high-quality Damascus steel, known for its strength, durability, and beautiful wavy patterns. Each knife features a unique design, including custom handles and limited-edition styles, making every piece a work of art.",
    },
    {
      id: 2,
      isExpanded: false,
      heading: "How do I place an order?",
      content:
        "You can place an order by sending us a direct message on Instagram or visiting the link in our bio to shop directly from our online store.",
    },
    {
      id: 3,
      isExpanded: false,
      heading: "Do you offer custom knife designs?",
      content:
        "Yes, we offer custom knife designs. If you have a specific idea or design in mind, feel free to contact us, and we will work with you to create a knife that meets your exact specifications.",
    },
    {
      id: 4,
      isExpanded: false,
      heading: "What payment methods do you accept?",
      content:
        "We accept various payment methods, including credit/debit cards, PayPal, and bank transfers. Please contact us if you have any specific payment preferences or questions.",
    },
    {
      id: 5,
      isExpanded: false,
      heading: "How long does it take to receive my order?",
      content:
        "Processing time for orders typically takes 3-5 business days. Once shipped, delivery time depends on your location but usually ranges from 7-14 business days for domestic orders and 14-21 business days for international orders.",
    },
    {
      id: 6,
      isExpanded: false,
      heading: "Do you ship internationally?",
      content:
        "Yes, we ship worldwide. Shipping fees and delivery times may vary based on your location.",
    },
    {
      id: 7,
      isExpanded: false,
      heading: "What is your return and exchange policy?",
      content:
        "We strive for 100% customer satisfaction. If you are not completely satisfied with your purchase, please contact us within 14 days of receiving your order. We offer exchanges or refunds for items that are unused and in their original condition. Custom orders are non-refundable.",
    },
    {
      id: 8,
      isExpanded: false,
      heading: "How do I care for my Damascus steel knife?",
      content:
        "To maintain your knife’s quality, hand wash it with mild soap and water, then dry it immediately. Avoid using a dishwasher or harsh chemicals. Regularly apply a thin coat of oil to the blade to prevent rust and corrosion.",
    },
    {
      id: 9,
      isExpanded: false,
      heading: "Can I track my order?",
      content:
        "Yes, once your order is shipped, you will receive a tracking number via email or direct message, allowing you to monitor your package until it arrives.",
    },
    {
      id: 10,
      isExpanded: false,
      heading: "How can I contact Edge Dynasty for more information?",
      content:
        "You can reach us via direct message on Instagram or by emailing info@edgedynasty.com. We’re happy to answer any questions you have!",
    },
  ]);

  const [showAllQuestions, setShowAllQuestions] = useState(false);

  const toggleExpansion = (id) => {
    setQuestions(
      questions.map((question) =>
        question.id === id
          ? { ...question, isExpanded: !question.isExpanded }
          : question
      )
    );
  };

  const toggleShowAllQuestions = () => {
    setShowAllQuestions(!showAllQuestions);
  };

  return (
    <div>
      <div className="subpages-header flex flex-col justify-center items-center mb-[80px]">
        <div className="container flex flex-col justify-center items-center">
          <h1 className="lgheading-org">FAQ</h1>
          <p className="paraorg max-w-[600px] text-center">
            Have questions about Edge Dynasty? Find answers to commonly asked
            questions below. If you don't see your question listed, feel free to
            reach out to our friendly customer support team.
          </p>
        </div>
      </div>
      <div className="my-[100px]">
        <div className="container ">
          <div className="md:grid flex flex-col text-center md:grid-cols-1 md:grid-cols-2 gap-[50px]">
            <img className="faqimg rounded-2xl " src="./faqimg.webp" alt="" />
            <div className="md:my-[60px] ">
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
              <div className="lgheading-org">Our Mission</div>
              <p className="paraorg ">
                At Edge Dnasty, we're more than just an online shoe store –
                we're your trusted partner in all things wearings. With a
                passion for innovation and a commitment to excellence.
              </p>
              <Link
                className="btnorg inline-block my-[20px] md:my-[40px]"
                to="/shop"
              >
                Shop Now
              </Link>
            </div>
          </div>
        </div>
      </div>
      <section className="md:py-[100px] section_frequent_questions">
        <div className="max-w-[600px] m-auto">
          <h1 className="text-center lgheading-org">
            Frequently Asked Questions
          </h1>
          {questions
            .slice(0, showAllQuestions ? questions.length : 5)
            .map((question) => (
              <div
                key={question.id}
                className="bg-gray-100 rounded-xl p-10 mt-16 shadow-xl transition-all cursor-pointer"
                onClick={() => toggleExpansion(question.id)}
              >
                <div className="bg-gray-100 flex justify-between items-center cursor-pointer">
                  <h3
                    className="text-[18px] font-serif"
                    style={{ color: "black" }}
                  >
                    {question.heading}
                  </h3>
                  <div className="rounded-full w-[20px] h-[20px] flex justify-center items-center bg-black">
                    <i
                      className={`text-white fa-solid fa-${
                        question.isExpanded ? "minus" : "plus"
                      }`}
                    ></i>
                  </div>
                </div>
                <div
                  className={`faq-answer ${
                    question.isExpanded ? "expanded" : ""
                  }`}
                >
                  <p className="para mt-6">{question.content}</p>
                </div>
              </div>
            ))}
          <div className="text-center">
            <button
              className="button mt-20 btnorg my-[20px] md:my-[40px]"
              style={{ padding: "20px 40px" }}
              onClick={toggleShowAllQuestions}
            >
              {showAllQuestions ? "Show Less" : "More Questions"}
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Faq;
