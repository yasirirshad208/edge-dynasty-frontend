// AuthContext.js
import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);

  const updateAdminStatus = (status) => {
    setIsAdmin(status);
  };

  const updateLoginStatus = (status) => {
    setLoggedIn(status);
  };

  return (
    <AuthContext.Provider value={{ isAdmin, updateAdminStatus, loggedIn, updateLoginStatus }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
