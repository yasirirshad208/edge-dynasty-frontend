import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../authContext";
import "../styles/Login.css";
import { Link } from "react-router-dom";
import Snackbar from "../Components/Snackbar";

const Login = () => {
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

    if (!email || !password) {
      setError("Both fields are required.");
      return;
    }

    try {
      const response = await axios.post(
        "https://api.edgedynasty.com:5000/api/user/login",
        {
          email,
          password,
        }
      );

    

      if (response.data && response.data.data) {
        setSuccess("Login successful!");
        // setError("");

        // Store the token in localStorage
        localStorage.setItem("authToken", response.data.data.token);

        // Update global admin status
        updateAdminStatus(response.data.data.isAdmin);

        // Redirect to home page with data
        navigate("/", {
          state: { email, isAdmin: response.data.data.isAdmin },
        });
      } else {
        // setSuccess("");
        setError(response.data.message || "Login failed.");
      }
    } catch (error) {
      // setSuccess("")
        
      setError(error.response.data.message);
    }
  };

  return (
    <div className="my-[20px]" style={{ color: "white" }}>
      <div className="login-form max-w-[500px] m-auto px-[20px]">
        <div className="text-center lgheading-org">
          <h2>Login Form</h2>
        </div>
        
        <form onSubmit={handleSubmit} className="items-center">
          <div className="mb-8">
            <label style={{ color: "white" }} htmlFor="login-email" className="mb-2">
              Email:
            </label>
            <input
              placeholder="Email"
              type="email"
              id="login-email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label style={{ color: "white" }} htmlFor="login-password" className="mb-2">
              Password:
            </label>
            <input
              placeholder="Password"
              type="password"
              id="login-password"
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
          <div className="flex my-5 gap-5 w-[100%] justify-between items-center">
            {/* <div className="flex items-center">
              <input type="checkbox" id="remember-me" />
              <label
                htmlFor="remember-me"
                className="text-[16px] paraorg uppercase mx-5"
              >
                Remember me
              </label>
            </div> */}
            <div className="text-[14px]">
              <Link
                className="text-decoration-underline paraorg"
                to="/forgot"
                style={{ textDecoration: "underline" }}
              >
                Forgot Password?
              </Link>
            </div>
          </div>
          <div className="text-center">
            <button
              style={{ color: "white" }}
              type="submit"
              className="btnlogin"
            >
              Login
            </button>
          </div>
        </form>
        <p className="text-center paraorg">
          Don't have an account?{" "}
          <Link to="/signup" style={{ textDecoration: "underline" }}>
            Register
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

export default Login;
