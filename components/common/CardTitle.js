import React from "react";
import Link from "next/link";
import Button from "./Button";

const CardTitle = ({ title, subtitle, servicetitle, link }) => {
  return (
    <div className="text-left mb-0 flex flex-col sm:flex-row justify-between items-start self-stretch">
      <div>
        <h2 className="text-2xl sm:text-h2 font-bold text-gray-800 dark:text-white">
          {title}
        </h2>

        <p className="mt-1 text-sm sm:text-base text-gray-600 dark:text-neutral-400">
          {subtitle}
        </p>
      </div>
      <div className="flex items-end mt-4 sm:mt-0">
        {link ? (
          <Link href={link}>
            <Button>{` ${servicetitle}`}</Button>
          </Link>
        ) : (
          <Button>{` ${servicetitle}`}</Button>
        )}
      </div>
    </div>
  );
};

export default CardTitle;
