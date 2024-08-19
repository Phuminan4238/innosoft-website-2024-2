// components/CardBlog.js
import React from "react";
import ButtonArrow from "./ButtonArrow";
import Link from "next/link";

export default function CardBlog({
  category = "Uncategorized",
  title = "Untitled Blog Post",
  description = "No description available.",
  imageUrl = "/default-image.jpg", // Provide a default image URL
  linkUrl = "#", // Provide a default link URL
  isIndex = true,
  showButton = true, // Default to true, will show the button unless explicitly set to false
}) {
  return (
    <Link href={linkUrl} passHref>
      <div className="group relative flex flex-col w-full bg-white rounded-xl overflow-hidden hover:shadow-lg transition cursor-pointer">
        <div className={isIndex ? "p-4" : "lg:px-0 lg:py-4"}>
          <button className="text-primary text-caption flex justify-center items-center gap-1 p-2 py-1 rounded-md border border-primary hover:underline transition">
            Latest
          </button>
          {/* <p className="text-footnote font-bold text-primary-light uppercase">
            {category}
          </p> */}
          <div className="py-2">
            <h3 className="text-body text-regular">{title}</h3>
            <p className="py-2 text-caption font-regular text-subtitle">
              {description}
            </p>
          </div>
          {showButton && ( // Conditionally render the button
            <div className="">
              <ButtonArrow>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="14"
                  viewBox="0 0 21 20"
                  fill="none"
                >
                  <path
                    d="M4.66667 2.5H17.1667C17.6269 2.5 18 2.8731 18 3.33333V15.8333M3 17.5L17.1667 3.33333"
                    stroke="#2E3238"
                    stroke-width="2"
                    stroke-linecap="round"
                  />
                </svg>
              </ButtonArrow>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}
