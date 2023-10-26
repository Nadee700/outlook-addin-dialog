import React, { createContext, useState, useContext } from "react";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [message, setMessage] = useState({ name: "test", phone: "077", age: 20 });

  return <AppContext.Provider value={{ message, setMessage }}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
  return useContext(AppContext);
};
