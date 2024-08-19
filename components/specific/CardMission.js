// components/CardMission.js
import React from "react";
import Button2 from "../common/Button2";
import Link from "next/link";

export default function CardMission({
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
          <div className="text-primary text-caption flex justify-start items-start gap-1 p-2 py-1 ">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="25"
              height="24"
              viewBox="0 0 25 24"
              fill="none"
            >
              <path
                d="M8.42709 19.7824L4.42709 15.7824M19.0506 2.0657C20.5348 2.51328 21.6962 3.67462 22.1437 5.15885C22.3077 5.70268 22.1594 6.29263 21.7578 6.69429L8.62855 19.8235C8.38197 20.0701 8.0752 20.2479 7.73867 20.3394L2.75261 21.6939C2.60602 21.7337 2.47029 21.602 2.50568 21.4543L3.6323 16.752C3.71832 16.393 3.90201 16.0648 4.16305 15.8038L17.5152 2.45164C17.9168 2.04999 18.5068 1.9017 19.0506 2.0657Z"
                stroke="#2E3238"
                strokeWidth="2"
              />
            </svg>
          </div>
          <div className="py-2">
            <h3 className="text-body text-regular">{title}</h3>
            <p className="py-2 text-caption font-regular text-subtitle">
              {description}
            </p>
          </div>
          {showButton && ( // Conditionally render the button
            <div className="">
              <Button2>
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
              </Button2>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}
