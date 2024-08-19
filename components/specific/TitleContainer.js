// components/TitleContainer.js
import React from "react";

export default function TitleContainer({ children }) {
  return (
    <div className="flex flex-col items-start px-4 md:px-0 max-w-screen-xl mx-auto py-10">
      {children}
    </div>
  );
}
