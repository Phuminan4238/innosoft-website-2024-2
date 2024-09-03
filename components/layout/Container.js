import React from "react";

const Container = ({ children, className }) => {
  return (
    <div className={`container mx-auto px-6 md:px-0 ${className}`}>
      {children}
    </div>
  );
};

export default Container;
