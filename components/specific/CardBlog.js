import React from "react";
import ButtonArrow from "./ButtonArrow";

export default function CardBlog({
  category = "Uncategorized",
  title = "Untitled Blog Post",
  description = "No description available.",
  imageUrl = "/default-image.jpg",
  linkUrl = "#",
  isIndex = true,
  showButton = true,
}) {
  return (
    <a href={linkUrl} target="_blank" rel="noopener noreferrer">
      <div className="group relative flex flex-col w-full bg-white rounded-xl overflow-hidden hover:shadow-lg transition cursor-pointer">
        <div className={isIndex ? "p-4" : "lg:px-0 lg:py-4"}>
          <button className="text-primary text-xs sm:text-sm md:text-base flex justify-center items-center gap-1 p-2 py-1 rounded-md border border-primary hover:underline transition">
            {category}
          </button>
          <div className="py-2">
            <h3 className="text-sm sm:text-base md:text-lg font-semibold">
              {title}
            </h3>
            <p className="py-2 text-xs sm:text-sm md:text-base text-gray-600 dark:text-neutral-400">
              {description}
            </p>
          </div>
          {showButton && (
            <div className="mt-2">
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
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </ButtonArrow>
            </div>
          )}
        </div>
      </div>
    </a>
  );
}
