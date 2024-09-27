import React, { createContext, useContext, useState, useEffect } from "react";
import { suggestions } from "JSONs/suggestions"

// Create a context
const AppContext = createContext();

// Create a provider component
export const AppProvider = ({ children }) => {
  const [defaultSuggestions, setDefaultSuggestions] = useState(suggestions);
  const [defaultRecommendedSuggestions, setDefaultRecommendedSuggestions] = useState([]);
  const [resultValues, setResultValues] = useState([]);

  const handleDefaultSuggestions = (suggetions) => {
    setDefaultSuggestions(suggetions);
  };

  const handleResultValues = (values) => {
    setResultValues(values)
  }

  useEffect(()=>{
    const recommended = defaultSuggestions.filter(suggestion => suggestion.recommended);
    setDefaultRecommendedSuggestions(recommended)
  },[defaultSuggestions]);

  const value = {
    resultValues,
    defaultSuggestions,
    defaultRecommendedSuggestions,
    handleDefaultSuggestions,
    handleResultValues
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

// Custom hook to use the context
export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
};
