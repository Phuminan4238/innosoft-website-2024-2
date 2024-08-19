import React from "react";

export default function ButtonArrow({ children, onClick }) {
  return (
    <button
      className="text-primary text-subtitle flex justify-center items-center gap-1 px-4 py-3 rounded-md border border-primary hover:underline transition"
      onClick={onClick}
    >
      {children}
    </button>
  );
}
