import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { AuthProvider } from "../authContext.jsx";
import { CartProvider } from "../cartContext.jsx";


createRoot(document.getElementById("root")).render(
  // <StrictMode>
    <AuthProvider>
    <CartProvider>
      <App />
      </CartProvider>
    </AuthProvider>
  // </StrictMode>
);
