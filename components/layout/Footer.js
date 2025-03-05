import React from "react";
import Container from "./Container";
import Image from "next/image";

const Footer = () => {
  return (
    <footer className="mt-20 bg-gray-100 dark:bg-gray-900">
      <Container>
        <div className="max-w-[85rem] py-10  px-0 md:px-4 mx-auto">
          {/* Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {/* Brand */}
            <div className="col-span-full lg:col-span-1 flex items-center">
              <a href="/">
                <span className="flex items-center space-x-2 text-2xl sm:text-3xl font-medium dark:text-gray-100">
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
            </div>
          </div>
          {/* End Grid */}

          {/* Additional info */}
          <div className="mt-5 sm:mt-12 flex flex-col sm:flex-row sm:justify-between sm:items-center">
            <div className="flex flex-wrap justify-center sm:justify-start gap-8 mb-4 sm:mb-0">
              <p className="text-sm sm:text-subtitle font-bold dark:text-gray-400">
                About
              </p>
              <p className="text-sm sm:text-subtitle font-bold dark:text-gray-400">
                Service
              </p>
              <p className="text-sm sm:text-subtitle font-bold dark:text-gray-400">
                Project
              </p>
              <p className="text-sm sm:text-subtitle font-bold dark:text-gray-400">
                Blog
              </p>
              <p className="text-sm sm:text-subtitle font-bold dark:text-gray-400">
                Teams
              </p>
            </div>
          </div>

          {/* Footer Bottom Info and Social Brands */}
          <div className="mt-5 sm:mt-12 flex flex-col sm:flex-row sm:justify-between sm:items-center">
            <div className="flex flex-wrap justify-center sm:justify-start gap-8 mb-4 sm:mb-0">
              <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                Copyright © 2024 . All Rights Reserved.
              </p>
              <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                Terms and Conditions
              </p>
              <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                Privacy Policy
              </p>
            </div>

            {/* Social Brands */}
            <div className="flex justify-center sm:justify-start gap-4 mt-4 sm:mt-0">
              <a
                href="#"
                className="text-sm inline-flex justify-center items-center gap-x-2 font-semibold rounded-lg border border-transparent text-gray-900 hover:bg-gray-200 dark:text-gray-400 dark:hover:bg-gray-700/10"
              >
                <svg
                  className="flex-shrink-0 w-4 h-4"
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                >
                  <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
