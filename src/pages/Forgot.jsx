import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Snackbar from "../Components/Snackbar";

const Forgot = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false); // Snackbar state
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const showSnack = (message)=>{
    setSnackbarMessage(message);
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "https://api.edgedynasty.com/api/user/forgot/password",
        { email }
      );
    
      setSuccess(response.data.message);
    } catch (error) {
      if (error.response) {
        setError(error.response.data.message || "An error occurred");
      } else if (error.request) {
        setError("No response from server");
      } else {
        setError("An error occurred");
      }
    }
  };

  return (
    <div className="my-[20px]" style={{ color: "white" }}>
      <div className="forgot-form max-w-[500px] m-auto px-[20px]">
        <div className="text-center lgheading-org">
          <h2>Forgot Password</h2>
        </div>
        <form onSubmit={handleSubmit} className="items-center">
          <div className="mb-8">
            <label htmlFor="email" className="block text-white mb-2"
             style={{
              "display": "inline-block",
              "font-size": "17px",
              "font-weight": "100",
              "font-family": "'Montserrat', sans-serif",
              "color": "white !important",
            }}
            >
              Email:
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Email"
              className="p-2 text-black border border-gray-300 rounded w-full"
              style={{
                padding: "10px 20px",
                outline: "none",
                fontSize: "18px",
                width: "100%",
                display: "inline-block",
                color: "black !important",
              }}
            />
            <style>
              {`
                #email::placeholder {
                  color: black;
                }
              `}
            </style>
          </div>
          {error && (
            <p className="paraorg mt-2" style={{ color: "red" }}>
              {error}
            </p>
          )}
          {success && (
            <p className="paraorg mt-2" style={{ color: "green" }}>
              {success}
            </p>
          )}
          <div className="text-center">
            <button
              type="submit"
              className="btnlogin mt-4"
              style={{ color: "white" }}
            >
              Submit
            </button>
          </div>
        </form>
        <p className="text-center paraorg mt-4">
          Remember your password?{" "}
          <Link to="/login" style={{ textDecoration: "underline" }}>
            Login
          </Link>
        </p>
      </div>
      <Snackbar
        message={snackbarMessage}
        open={snackbarOpen}
        onClose={() => setSnackbarOpen(false)}
      />
    </div>
  );
};

export default Forgot;
