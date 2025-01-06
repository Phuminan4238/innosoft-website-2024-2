import React, { useEffect, useState } from "react";
import axios from "axios";

const Team = () => {
  const [teamMembers, setTeamMembers] = useState([]);

  useEffect(() => {
    const fetchTeamMembers = async () => {
      try {
        const response = await axios.get(
          "https://202.44.12.87:1337/api/teams?populate=uploadfiles"
        );
        const data = response.data.data.map((item) => ({
          id: item.id,
          name: `${item.attributes.name_en} ${item.attributes.surname_en}`,
          title: item.attributes.position,
          tag: item.attributes.tag,
          imageUrl: `https://202.44.12.87:1337${item.attributes.uploadfiles.data.attributes.url}`,
        }));
        setTeamMembers(data);
      } catch (error) {
        console.error("Error fetching team members:", error);
      }
    };

    fetchTeamMembers();
  }, []);

  return (
    <div className="max-w-[85rem] px-0 py-10 lg:py-14 mx-auto">
      <div className="grid grid-cols-2 md:grid-cols-3 gap-8 md:gap-16">
        {teamMembers.map((member) => (
          <div className="text-left" key={member.id}>
            <img
              className="rounded-xl sm:w-48 lg:w-60"
              src={member.imageUrl}
              alt={`${member.name} Image`}
            />
            <div className="mt-2 sm:mt-4">
              <h3 className="text-sm font-medium text-gray-800 sm:text-base lg:text-lg dark:text-neutral-200">
                {member.name}
              </h3>
              <p className="text-xs text-gray-600 sm:text-sm lg:text-base dark:text-neutral-400">
                {member.title}
              </p>
              <button className="text-primary text-caption flex justify-center items-center gap-1 mt-3 p-2 py-1 rounded-md border border-primary hover:underline transition">
                {member.tag}
              </button>
            </div>
            <div className="mt-3 space-x-1 flex">
              <a
                className="inline-flex justify-center items-center w-8 h-8 text-sm font-semibold rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-neutral-400 dark:border-neutral-700 dark:hover:bg-neutral-700"
                href="#"
              >
                <svg
                  className="flex-shrink-0 w-3.5 h-3.5"
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                >
                  <path d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z" />
                </svg>
              </a>
              <a
                className="inline-flex justify-center items-center w-8 h-8 text-sm font-semibold rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-neutral-400 dark:border-neutral-700 dark:hover:bg-neutral-700"
                href="#"
              >
                <svg
                  className="flex-shrink-0 w-3.5 h-3.5"
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                >
                  <path d="M8 0C3.58 0 0 3.58 0 8c0 3.97 2.903 7.25 6.687 7.877v-5.573H4.759V8H6.69V6.293c0-1.906 1.134-2.957 2.867-2.957.832 0 1.703.149 1.703.149v1.9h-.958c-.943 0-1.237.585-1.237 1.186V8h2.104l-.336 2.304H9.065V15.877C12.753 15.251 16 11.97 16 8c0-4.42-3.58-8-8-8z" />
                </svg>
              </a>
              <a
                className="inline-flex justify-center items-center w-8 h-8 text-sm font-semibold rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-neutral-400 dark:border-neutral-700 dark:hover:bg-neutral-700"
                href="#"
              >
                <svg
                  className="flex-shrink-0 w-3.5 h-3.5"
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                >
                  <path d="M8 0C5.376 0 3.333 2.042 3.333 4.56c0 1.805.89 3.395 2.236..." />
                </svg>
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Team;
