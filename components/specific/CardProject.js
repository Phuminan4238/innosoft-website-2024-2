import React from "react";
import Button from "../common/Button";
import Link from "next/link";

export default function CardProject({
  category,
  tag,
  title,
  description,
  imageUrl,
  linkUrl,
  isIndex = true,
  showButton = true, // Default to true, will show the button unless explicitly set to false
}) {
  return (
    <Link href={linkUrl} passHref>
      <div className="group relative flex flex-col w-full bg-white rounded-xl overflow-hidden hover:shadow-lg transition cursor-pointer py-4">
        <div className="relative pt-[50%] sm:pt-[70%] rounded-xl overflow-hidden">
          <img
            className="absolute top-0 left-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-in-out rounded-xl"
            src={imageUrl}
            alt={title}
          />
        </div>

        <div className={isIndex ? "p-4" : "lg:px-0 lg:py-4"}>
          <p className="mt-3 text-xs sm:text-sm md:text-footnote font-bold text-primary-light uppercase">
            {tag}
          </p>
          <h3 className="mt-3 text-lg sm:text-xl md:text-2xl font-bold text-primary-title">
            {title}
          </h3>
          <p className="text-xs sm:text-sm md:text-base mt-3 text-caption font-regular text-primary-title">
            {description}
          </p>
          {showButton && ( // Conditionally render the button
            <div className="mt-5">
              <button
                className={`text-primary text-xs sm:text-sm md:text-subtitle flex justify-center items-center gap-1 px-4 py-3 rounded-md bg-white border border-primary hover:underline transition`}
              >
                Read more
              </button>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}
