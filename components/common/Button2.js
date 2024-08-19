import React from "react";

export default function Button2({ children, onClick, className }) {
  return (
    <button
      className={`text-primary text-subtitle flex justify-center items-center gap-1 px-4 py-3 rounded-md bg-white  hover:underline transition ${className}`}
      onClick={onClick}
    >
      {children}
      <svg
        className="flex-shrink-0 size-4 text-primary"
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="m9 18 6-6-6-6" />
      </svg>
    </button>
  );
}
