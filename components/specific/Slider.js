import React, { useState } from "react";
import Container from "../layout/Container";
import { ChevronRightIcon } from "@heroicons/react/24/solid";
import { ChevronLeftIcon } from "@heroicons/react/24/solid";
import services from "@/pages/api/service";

const Slider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const totalColumns = 3; // Assuming 3 columns

  const goToNextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % totalColumns);
  };

  const goToPrevSlide = () => {
    setCurrentSlide(
      (prevSlide) => (prevSlide - 1 + totalColumns) % totalColumns
    );
  };

  return (
    <div className="mt-10 relative">
      <div
        className="grid grid-flow-col gap-10"
        style={{
          transform: `translateX(-${currentSlide * (100 / totalColumns)}%)`,
          transition: "transform 0.5s ease",
        }}
      >
        {services.map((service) => (
          <div
            key={service.id}
            className="lg:col-span-1 xl:col-span-3 h-[360px]"
          >
            <div className="flex flex-col justify-start w-full h-fullborder-solid border-2 p-0 rounded-lg  dark:bg-trueGray-800">
              {/* Image */}
              <img
                src={service.imageUrl}
                alt={service.title}
                className="object-cover rounded-lg xl:col-span-3 h-[340px] m-0"
              />
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-center pt-4">
        {/* Previous Slide Arrow */}
        <button
          className="text-4xl text-gray-500 dark:text-white mr-2"
          onClick={goToPrevSlide}
        >
          {/* Arrow Icon */}
          <ChevronLeftIcon className="h-10 w-10 text-gray-500" />
        </button>
        {/* Next Slide Arrow */}
        <button
          className="text-4xl text-gray-500 dark:text-white ml-2"
          onClick={goToNextSlide}
        >
          {/* Arrow Icon */}
          <ChevronRightIcon className="h-10 w-10 text-gray-500" />
        </button>
      </div>
    </div>
  );
};

export default Slider;
