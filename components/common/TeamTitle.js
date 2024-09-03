// components/CardTitle.js
import React from "react";
import Button from "./Button";

const TeamTitle = ({ title, subtitle, servicetitle }) => {
  const servicesubtitle =
    "Stay in the know with insights from industry experts.";

  return (
    <div className="text-left mb-0 flex justify-between items-end self-stretch">
      <div>
        <p className="text-2xl sm:text-h2 font-bold text-gray-800 dark:text-white">
          {title}
        </p>
        <p className="text-sm sm:text-lg mt-1 text-gray-600 dark:text-neutral-400">{subtitle}</p>
      </div>
      <div className="flex items-end">
        {/* <Button>{` ${servicetitle}`}</Button> */}
      </div>
    </div>
  );
};

export default TeamTitle;
