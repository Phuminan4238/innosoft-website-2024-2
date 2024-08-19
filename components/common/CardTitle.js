// components/CardTitle.js
import React from "react";
import Link from "next/link";
import Button from "./Button";

const CardTitle = ({ title, subtitle, servicetitle, link }) => {
  return (
    <div className="text-left mb-0 flex justify-between items-end self-stretch">
      <div>
        <h className="text-h2 font-bold text-gray-800 dark:text-white">
          {title}
        </h>
        <p className="mt-1 text-gray-600 dark:text-neutral-400">{subtitle}</p>
      </div>
      <div className="flex items-end">
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
