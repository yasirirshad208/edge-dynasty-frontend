import React, { useEffect, useState } from "react";
import axios from "axios";
// const products = [];

const API_URL = "http://localhost:5000/api/product";

export const useProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const response = await axios.get(`${API_URL}/get/all`);
        setProducts(response.data.data); // Assume data is an array
      } catch (error) {
        setError(error); // Store error in state
      } finally {
        setLoading(false); // Stop loading once data is fetched
      }
    };

    getProducts();
  }, []);

  return { products, loading, error };
};
