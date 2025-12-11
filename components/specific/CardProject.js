import React from "react";
import Button from "../common/Button";
import Link from "next/link";

export default function CardProject({
  category,
  tag,
  tag2,
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
        <div className="relative pt-[50%] sm:pt-[70%]  overflow-hidden">
          <img
            className="absolute top-0 left-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-in-out rounded-t-xl"
            src={imageUrl}
            alt={title}
          />
        </div>

        <div className={isIndex ? "p-4" : "lg:px-4 lg:py-4"}>
         

          <h4 className="mt-3 sm:text-md md:text-md font-bold text-primary-title">
            {title}
          </h4>
          {/* <p className="text-xs sm:text-sm md:text-base mt-3 text-caption font-regular text-primary-title">
            {description}
          </p> */}

           <p className="mt-3 text-xs sm:text-sm md:text-footnote font-bold uppercase">
            <span className="text-orange-500">{tag}</span>
            <br />
            <span className="text-blue-500">{tag2}</span>
          </p>
          {showButton && ( // Conditionally render the button
            <div className="mt-5">
              <button
                className={`text-primary text-xs sm:text-sm flex justify-center items-center gap-1 p-2 rounded-md bg-white border border-primary hover:underline transition`}
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
