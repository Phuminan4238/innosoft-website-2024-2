import React from "react";

const Hero = () => {
  return (
    <div
      className="py-20 relative overflow-hidden"
      style={{
        borderRadius: "0px 0rem 20rem 20rem",
        marginTop: "-80px", // Adjusted margin-top instead of top positioning
      }}
    >
      <div
        className="absolute inset-0 bg-gradient-to-br from-blue-500 to-blue-400 rounded-lg blur hidden lg:block"
        style={{
          borderRadius: "441px",
          background: "", // Updated background color
          filter: "blur(260px)",
          zIndex: "-2", // Ensure background is behind content
          right: "-100px", // Adjusted right offset
          left: "580px",
          top: "200px",
          width: "620px",
          height: "420px",
        }}
      ></div>
      <div
        className="absolute inset-0 bg-gradient-to-br from-orange-500 to-purple-500 rounded-lg blur"
        style={{
          borderRadius: "441px",
          background: "#FCDCC7", // Updated background color
          filter: "blur(140px)",
          zIndex: "-1", // Ensure background is behind content
          right: "-100px", // Adjusted right offset
          left: "30px",
          top: "170px",
          width: "640px",
          height: "500px",
        }}
      ></div>
      <div className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8 pt-36 pb-4">
        {/* Announcement Banner */}
        <div className="flex justify-center">
          <a
            className="inline-flex items-center gap-x-2 border-primary border text-xs text-gray-600 p-1 px-3 rounded-full transition hover:border-gray-300 dark:bg-neutral-800 dark:border-neutral-700 dark:hover:border-neutral-600 dark:text-neutral-400"
            href="#"
          >
            {/* Explore the Capital Product */}
            <span className="flex items-center gap-x-1 py-0">
              <span className="text-primary">o</span>
              <span className=" border-primary text-primary font-semibold ps-2 dark:text-blue-500 dark:border-neutral-700">
                Label
              </span>
            </span>
          </a>
        </div>
        {/* End Announcement Banner */}

        {/* Title */}
        <div className="mt-6 max-w-2xl text-center mx-auto">
          <h1 className="block font-bold text-gray-800 text-4xl md:text-5xl lg:text-7xl dark:text-neutral-200">
            We Create <br></br>Incredible Projects
          </h1>
        </div>
        {/* End Title */}

        <div className="mt-8 max-w-3xl text-center mx-auto">
          <p className="font-headline font-bold text-primary dark:text-neutral-400">
            SOFTWARE DEVELOPING AND <br></br>HIGH PERFORMANCE SERVICE
          </p>
        </div>

        {/* Buttons */}
        <div className="mt-16 gap-3 flex justify-center">
          <a
            className="inline-flex justify-center items-center gap-x-3 px-6  text-center bg-primary border border-transparent text-white text-sm font-medium rounded-full py-3 px-4 dark:focus:ring-offset-gray-800"
            href="#"
          >
            Explore
            <svg
              className="flex-shrink-0 size-4 text-white"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m9 18 6-6-6-6" />
            </svg>
          </a>
        </div>
        {/* End Buttons */}
      </div>
    </div>
  );
};

export default Hero;
