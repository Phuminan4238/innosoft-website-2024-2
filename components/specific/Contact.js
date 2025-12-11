import React from "react";

export default function CardTitle({ title, subtitle }) {
  return (
    <div className="mx-auto max-w-[1220px] py-8 sm:py-10 text-center">
      <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
        {title}
      </h2>
      {subtitle ? (
        <p className="mt-2 text-sm sm:text-base text-gray-600 dark:text-neutral-400 max-w-2xl mx-auto">
          {subtitle}
        </p>
      ) : null}

      <div className="mt-5 flex justify-center">
        <a href="/contact">
          <button className="inline-flex items-center gap-1 px-4 py-2 rounded-md bg-primary text-white text-sm sm:text-base hover:bg-primary/90 transition">
            Contact us
            <svg
              className="w-4 h-4"
              viewBox="0 0 24 24"
              stroke="currentColor"
              fill="none"
            >
              <path d="m9 18 6-6-6-6" strokeWidth="2" />
            </svg>
          </button>
        </a>
      </div>
    </div>
  );
}
