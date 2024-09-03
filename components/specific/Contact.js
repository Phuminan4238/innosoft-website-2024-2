import React from "react";

export default function CardTitle({ title, subtitle }) {
  return (
    <div
      className="bg-secondary-gray py-10 px-4 sm:py-12 sm:px-6 lg:py-20 lg:px-10 flex flex-col sm:flex-row justify-between items-center mx-auto max-w-[1220px] rounded-lg"
      style={{ borderRadius: "1rem" }}
    >
      <div className="text-start flex-1 mb-6 sm:mb-0">
        <h2 className="text-xl sm:text-2xl lg:text-h2 font-bold text-gray-800 dark:text-white">
          {title}
        </h2>
        <p className="mt-1 text-sm sm:text-base lg:text-gray-600 dark:text-neutral-400">
          {subtitle}
        </p>
      </div>
      <a href="/blog">
        <button className="text-white text-sm sm:text-base flex justify-center items-center gap-1 px-3 py-2 rounded-md border bg-primary border-primary hover:underline transition">
          Contact us
        </button>
      </a>
    </div>
  );
}
