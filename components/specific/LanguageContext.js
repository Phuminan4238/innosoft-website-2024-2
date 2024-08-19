// LanguageContext.js
import React, { createContext, useState, useContext } from "react";

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [selectedLanguage, setSelectedLanguage] = useState("en");

  const toggleLanguage = () => {
    setSelectedLanguage(selectedLanguage === "en" ? "th" : "en");
  };

  return (
    <LanguageContext.Provider value={{ selectedLanguage, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
