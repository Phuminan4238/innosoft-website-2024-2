// components/CardTitle.js
import React from "react";
import Button from "./Button";

const CardTitle = ({ title, subtitle, servicetitle }) => {
  const servicesubtitle =
    "Stay in the know with insights from industry experts.";

  return (
    <div className="text-left mb-0 flex justify-between items-end self-stretch">
      <div>
        <h className="text-h2 font-bold text-gray-800 dark:text-white">
          {title}
        </h>
        <p className="mt-1 text-gray-600 dark:text-neutral-400">{subtitle}</p>
      </div>
      <div className="flex items-end">
        <Button>{` ${servicetitle}`}</Button>
      </div>
    </div>
  );
};

export default CardTitle;
