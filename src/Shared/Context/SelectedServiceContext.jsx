import React, { createContext, useState, useContext } from "react";

const SelectedServiceContext = createContext();

export const useSelectedService = () => {
  const context = useContext(SelectedServiceContext);
  if (!context) {
    throw new Error("useSelectedService must be used within a SelectedServiceProvider");
  }
  return context;
};

export const SelectedServiceProvider = ({ children }) => {
  const [selectedService, setSelectedService] = useState(null);

  return (
    <SelectedServiceContext.Provider value={{ selectedService, setSelectedService }}>
      {children}
    </SelectedServiceContext.Provider>
  );
};