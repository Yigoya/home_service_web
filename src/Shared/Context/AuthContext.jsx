import React, { createContext, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const user = localStorage.getItem('user'); 
  

  const [isLoggedIn, setIsLoggedIn] = useState(user ? true : false);

  const login = () => {
    
    setIsLoggedIn(true)};
  const logout = () => setIsLoggedIn(false);

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};