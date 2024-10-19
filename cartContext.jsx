// cartContext.js
import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [lastUpdated, setLastUpdated] = useState(null); // New state to track updates

  // Fetch product details by IDs
  const fetchProductsByIds = async (cartItems) => {
    try {
      const productIds = cartItems.map(item => item._id);
      const { data } = await axios.post('https://api.edgedynasty.com:5000/api/product/products-by-ids', { ids: productIds }); // Adjust API URL accordingly
      return cartItems.map((item) => {
        const productDetails = data.find(product => product._id === item._id);
        return { ...productDetails, quantity: item.quantity };
      });
    } catch (error) {
      console.error('Error fetching products:', error);
      return [];
    }
  };

  // Load cart from local storage on mount and fetch product details
  useEffect(() => {
    const loadCart = async () => {
      const savedCart = JSON.parse(localStorage.getItem('cartItems')) || [];
      if (savedCart.length > 0) {
        const updatedCart = await fetchProductsByIds(savedCart);
        setCart(updatedCart);
      }
    };
    loadCart();
  }, []);

  // Add or update item in cart
  const addToCart = (product, quantity) => {
    setCart((prevCart) => {
      const existingProductIndex = prevCart.findIndex((item) => item._id === product._id);
      let updatedCart;

      if (existingProductIndex >= 0) {
        // Update quantity if item already exists
        updatedCart = [...prevCart];
        updatedCart[existingProductIndex].quantity += quantity;
      } else {
        // Add new item if it doesn't exist
        updatedCart = [...prevCart, { ...product, quantity }];
      }

      // Update local storage with new cart
      const currentCartInLocalStorage = JSON.parse(localStorage.getItem('cartItems')) || [];
      const mergedCart = currentCartInLocalStorage.map((storedItem) => {
        const cartItem = updatedCart.find((item) => item._id === storedItem._id);
        return cartItem ? { ...storedItem, quantity: cartItem.quantity } : storedItem;
      });

      // Avoid duplication when adding new products
      const newItems = updatedCart.filter(item => !mergedCart.some(i => i._id === item._id));
      const finalCart = [...mergedCart, ...newItems];

      // Store only _id and quantity in local storage
      const cartForStorage = finalCart.map(({ _id, quantity }) => ({ _id, quantity }));
      localStorage.setItem('cartItems', JSON.stringify(cartForStorage));

      // Update lastUpdated to current timestamp
      setLastUpdated(Date.now());

      return updatedCart;
    });
  };

  // Remove item from cart
  const removeFromCart = (id) => {
    setCart((prevCart) => {
      const updatedCart = prevCart.filter((item) => item._id !== id);

      // Update local storage with only _id and quantity
      const cartForStorage = updatedCart.map(({ _id, quantity }) => ({ _id, quantity }));
      localStorage.setItem('cartItems', JSON.stringify(cartForStorage));

      return updatedCart;
    });
  };

  // Update item quantity in cart
  const updateQuantity = (id, quantity) => {
    setCart((prevCart) => {
      const updatedCart = prevCart.map((item) =>
        item._id === id ? { ...item, quantity } : item
      );

      // Update local storage with only _id and quantity
      const cartForStorage = updatedCart.map(({ _id, quantity }) => ({ _id, quantity }));
      localStorage.setItem('cartItems', JSON.stringify(cartForStorage));

      // Update lastUpdated to current timestamp
      setLastUpdated(Date.now());

      return updatedCart;
    });
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, lastUpdated }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;
