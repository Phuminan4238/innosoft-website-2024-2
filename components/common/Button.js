// components/Button.js
import React from "react";

export default function Button({ children, onClick, className }) {
  return (
    <button
      className={`text-white text-subtitle flex justify-center items-center gap-1 px-4 py-3 rounded-md bg-primary border border-primary hover:underline transition ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
