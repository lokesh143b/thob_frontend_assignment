import React, { createContext, useState, useEffect } from "react";
import Cookies from "js-cookie";

// Create a context to share data across components
export const AppContext = createContext();

// Provider component that wraps your app and provides context values
export const AppContextProvider = ({ children }) => {

  // Define the backend URL where the API is hosted
  const backend_url = "https://thob-backend-assignment.onrender.com";

  // The context provider makes the backend_url available to all child components
  return (
    <AppContext.Provider value={{ backend_url }}>
      {children} {/* Render child components */}
    </AppContext.Provider>
  );
};
