import React, { useState, useEffect } from "react";
import Container from "../layout/Container";
import { ChevronRightIcon, ChevronLeftIcon } from "@heroicons/react/24/solid";
import { useRouter } from "next/router";
import { useSwipeable } from "react-swipeable";

const Slider = () => {
  const [services, setServices] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const router = useRouter();

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch(
          "https://innosoft.kmutt.ac.th/api/services?populate=uploadfiles.fileupload"
        );
        const data = await response.json();
        const formattedServices = data.data.map((service) => ({
          id: service.id,
          topic: service.attributes.topic,
          content_en: service.attributes.content_en,
          imageUrl: service.attributes.uploadfiles?.data?.attributes?.url
            ? `https://innosoft.kmutt.ac.th${service.attributes.uploadfiles.data.attributes.url}`
            : null, // Handle cases where the image is not available
        }));
        setServices(formattedServices);
      } catch (error) {
        console.error("Error fetching services:", error);
      }
    };

    fetchServices();
  }, []);

  const totalColumns = services.length;

  const goToNextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % totalColumns);
  };

  const goToPrevSlide = () => {
    setCurrentSlide((prevSlide) =>
      prevSlide === 0 ? totalColumns - 1 : prevSlide - 1
    );
  };

  const handleServiceClick = (serviceTopic) => {
    router.push({
      pathname: "/service",
      query: { scrollTo: serviceTopic },
    });
  };

  const handlers = useSwipeable({
    onSwipedLeft: goToNextSlide,
    onSwipedRight: goToPrevSlide,
    preventDefaultTouchmoveEvent: true,
    trackMouse: true,
  });

  return (
    <div>
      <Container>
        <div className="flex flex-col md:flex-row md:justify-between items-start md:items-center mb-0">
          <div>
            <h2 className="text-2xl sm:text-h2 font-bold text-gray-800 dark:text-white">
              Our Services
            </h2>
            <p className="mt-1 text-sm sm:text-base text-gray-600 dark:text-neutral-400">
              Stay in the know with insights from industry experts.
            </p>
          </div>

          <div className="flex items-center mt-4 md:mt-0">
            <button
              className="text-3xl text-gray-500 dark:text-white mr-2"
              onClick={goToPrevSlide}
            >
              <ChevronLeftIcon className="h-8 w-8" />
            </button>
            <button
              className="text-3xl text-gray-500 dark:text-white ml-2"
              onClick={goToNextSlide}
            >
              <ChevronRightIcon className="h-8 w-8" />
            </button>
          </div>
        </div>
      </Container>
      <div className="mt-10 relative overflow-hidden" {...handlers}>
        <div
          className="flex gap-4 transition-transform duration-500 ease-out"
          style={{
            transform: `translateX(-${currentSlide * 100}%)`,
          }}
        >
          {services.map((service) => (
            <div
              key={service.id}
              className="flex-shrink-0 w-full md:w-1/3 lg:w-1/4 xl:w-1/3"
              onClick={() => handleServiceClick(service.topic)}
            >
              <div className="relative w-full h-60 md:h-72 lg:h-80 xl:h-[480px] overflow-hidden rounded-lg border border-gray-200 dark:border-gray-700">
                <img
                  src={service.imageUrl}
                  alt={service.topic}
                  className="object-cover w-full h-full"
                />
                <p className="absolute bottom-4 left-4 text-white text-xl font-bold lg:text-2xl xl:text-3xl p-2 bg-gray-800 bg-opacity-50 rounded-lg">
                  {service.topic}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Slider;
