import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../authContext";
import "../styles/Login.css";
import { Link } from "react-router-dom";
import Snackbar from "../Components/Snackbar";

const Signup = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();
  const { updateAdminStatus } = useAuth();
  const [snackbarOpen, setSnackbarOpen] = useState(false); // Snackbar state
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const showSnack = (message)=>{
    setSnackbarMessage(message);
      setSnackbarOpen(true);
      setTimeout(() => setSnackbarOpen(false), 3000);
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!firstName || !lastName || !email || !password) {
      showSnack("All fields are required.");
      return;
    }

    try {
      const response = await axios.post(
        "https://api.edgedynasty.com:5000/api/user/register",
        {
          firstName,
          lastName,
          email,
          password,
        }
      );

      if (response.data && response.data.data) {
        setSuccess("Signup successful!");
        // setError("");

        // Update global admin status if provided by the backend
        if (response.data.data.isAdmin !== undefined) {
          updateAdminStatus(response.data.data.isAdmin);
        }

        // Redirect to home page with data
        navigate("/", {
          state: { email, isAdmin: response.data.data.isAdmin },
        });
      } else {
        // setSuccess("");
        setError(response.data.message || "Registration failed.");
      }
    } catch (error) {
      // setSuccess("");
      setError(error.response.data.message || "Sign up Failed!");
      // console.error("Error during registration:", error);
    }
  };

  return (
    <div className="my-[20px]" style={{ color: "white" }}>
      <div className="login-form max-w-[500px] m-auto px-[20px]">
        <div className="text-center lgheading-org">
          <h2>Signup Form</h2>
        </div>
        <form onSubmit={handleSubmit} className="items-center">
          <div className="mb-8">
            <label className="mb-2" style={{ color: "white" }} htmlFor="firstName">
              First Name:
            </label>
            <input
              placeholder="First Name"
              type="text"
              id="firstName"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
          </div>
          <div className="mb-8">
            <label className="mb-2" style={{ color: "white" }} htmlFor="lastName">
              Last Name:
            </label>
            <input
              placeholder="Last Name"
              type="text"
              id="lastName"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </div>
          <div className="mb-8">
            <label className="mb-2" style={{ color: "white" }} htmlFor="email">
              Email:
            </label>
            <input
              placeholder="Email"
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="mb-2" style={{ color: "white" }} htmlFor="password">
              Password:
            </label>
            <input
              placeholder="Password"
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
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
          <div className="text-center mt-4">
            <button
              style={{ color: "white" }}
              type="submit"
              className="btnlogin"
            >
              Signup
            </button>
          </div>
        </form>
        <p className="text-center paraorg">
          Already have an account?{" "}
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

export default Signup;
