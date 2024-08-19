import React from "react";

export default function CardTitle({ title, subtitle }) {
  return (
    <div
      className="bg-secondary-gray py-20 px-10 flex justify-between items-center mx-auto max-w-[1220px]"
      style={{ borderRadius: "1rem" }}
    >
      <div className="text-start flex-1">
        <h2 className="text-h2 font-bold text-gray-800 dark:text-white">
          {title}
        </h2>
        <p className="mt-1 text-gray-600 dark:text-neutral-400">{subtitle}</p>
      </div>
      <a href="/blog">
        <button className="text-white text-subtitle flex justify-center items-center gap-1 px-3 py-2 rounded-md border bg-primary border-primary hover:underline transition">
          Contact us
        </button>
      </a>
    </div>
  );
}
