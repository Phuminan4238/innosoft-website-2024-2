import React from "react";
import Container from "./Container";
import "tailwindcss/tailwind.css"; // Adjust path based on your setup
import Image from "next/image";

export default function NavBar() {
  return (
    <Container>
      <nav className="relative z-10">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <a href="/">
            <span className="flex items-center space-x-2 text-3xl font-medium dark:text-gray-100">
              <span>
                <Image
                  src="/img/innosoft-logo.png"
                  alt="N"
                  width="32"
                  height="32"
                  className="w-8"
                />
              </span>
              <span className="ps-2">
                <span className="text-gray-500">Inno</span>
                <span className="text-orange-500">soft</span>
              </span>
            </span>
          </a>
          <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
            <button
              type="button"
              className="text-primary bg-inherit border border-primary rounded-lg hover:bg-primary hover:text-white focus:ring-4 focus:outline-none focus:ring-primary-light font-medium text-sm px-8 py-2 text-center dark:bg-primary-dark dark:hover:bg-primary dark:focus:ring-primary"
            >
              Contact
            </button>
            <button
              data-collapse-toggle="navbar-cta"
              type="button"
              className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              aria-controls="navbar-cta"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="w-5 h-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 17 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 1h15M1 7h15M1 13h15"
                />
              </svg>
            </button>
          </div>
          <div
            className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
            id="navbar-cta"
          >
            <ul className="flex flex-col font-medium px-8 py-2 mt-4  text-primary border border-white rounded-lg  md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0   bg-slate-50 dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
              <li>
                <a
                  href="/about"
                  className="block py-2 px-3 md:p-0 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-primary md:dark:hover:text-primary-dark dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                >
                  About
                </a>
              </li>
              <li>
                <a
                  href="/service"
                  className="block py-2 px-3 md:p-0 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-primary md:dark:hover:text-primary-dark dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                >
                  Service
                </a>
              </li>
              <li>
                <a
                  href="/project"
                  className="block py-2 px-3 md:p-0 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-primary md:dark:hover:text-primary-dark dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                >
                  Project
                </a>
              </li>
              <li>
                <a
                  href="/teams"
                  className="block py-2 px-3 md:p-0 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-primary md:dark:hover:text-primary-dark dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                >
                  Teams
                </a>
              </li>
              <li>
                <a
                  href="/blog"
                  className="block py-2 px-3 md:p-0 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-primary md:dark:hover:text-primary-dark dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                >
                  Blog
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </Container>
  );
}
