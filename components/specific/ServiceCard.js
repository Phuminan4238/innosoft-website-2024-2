// components/ServiceCard.js
import React from "react";
import Button from "../common/Button";
import Button2 from "../common/Button2";

const ServiceCard = ({ services }) => {
  const servicetitle = "Contact us";
  return (
    <div className="max-w-[85rem] px-0 py-10 lg:py-14 mx-0">
      {services.map((service, index) => (
        <div
          key={service.id}
          className={`grid sm:grid-cols-2 sm:items-end gap-8 mb-10 ${
            index % 2 === 0 ? "sm:flex-row" : "sm:flex-row-reverse"
          }`}
        >
          {/* Image */}
          <div className={`sm:order-${index % 2 === 0 ? 1 : 2}`}>
            <div className="relative pt-[50%] sm:pt-[100%] rounded-lg">
              <img
                className="size-full absolute top-0 start-0 object-cover rounded-lg"
                src={service.imageUrl}
                alt="Service Image"
              />
            </div>
          </div>

          {/* Content */}
          <div className={`sm:order-${index % 2 === 0 ? 2 : 1} px-16`}>
            <p className="mb-5 inline-flex items-center gap-1.5 py-1.5 px-3 rounded-md text-xs font-medium bg-gray-100 text-gray-800 dark:bg-neutral-800 dark:text-neutral-200">
              {service.category}
            </p>
            <h2 className="text-2xl font-bold md:text-3xl lg:text-4xl lg:leading-tight xl:text-5xl xl:leading-tight text-gray-800 dark:text-neutral-200">
              <a
                href="#"
                className="hover:text-blue-600 dark:text-neutral-300 dark:hover:text-white"
              >
                {service.title}
              </a>
            </h2>
            <div>
              <p>{service.description}</p>
            </div>
            <div className="flex mt-5 gap-5">
              <Button>{` ${servicetitle}`}</Button>
              <Button2>View projects</Button2>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ServiceCard;
