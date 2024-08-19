import React from "react";

const teamMembers = [
  {
    name: "David Forren",
    title: "Founder / CEO",
    imageUrl:
      "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=900&h=900&q=80",
  },
  {
    name: "Amil Evara",
    title: "UI/UX Designer",
    imageUrl:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=900&h=900&q=80",
  },
  {
    name: "Ebele Egbuna",
    title: "Support Consultant",
    imageUrl:
      "https://images.unsplash.com/photo-1548142813-c348350df52b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=900&h=900&q=80",
  },
  {
    name: "Maria Powers",
    title: "Director of sales",
    imageUrl:
      "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=900&h=900&q=80",
  },
  {
    name: "Delia Pawelke",
    title: "Front-end Developer",
    imageUrl:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=900&h=900&q=80",
  },
  {
    name: "Tom Lowry",
    title: "UI/UX Designer",
    imageUrl:
      "https://images.unsplash.com/photo-1624224971170-2f84fed5eb5e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=900&h=900&q=80",
  },
  {
    name: "Louise Donadieu",
    title: "Support Consultant",
    imageUrl:
      "https://images.unsplash.com/photo-1579017331263-ef82f0bbc748?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=900&h=900&q=80",
  },
  {
    name: "Jeff Fisher",
    title: "Project Manager",
    imageUrl:
      "https://images.unsplash.com/photo-1514222709107-a180c68d72b4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=900&h=900&q=80",
  },
  {
    name: "Sophia Harrington",
    title: "Project Manager",
    imageUrl:
      "https://images.unsplash.com/photo-1602452920335-6a132309c7c8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=900&h=900&q=80",
  },
];

const Team = () => {
  return (
    <div className="max-w-[85rem] px-0 py-10  lg:py-14 mx-auto">
      {/* <div className="max-w-2xl mx-auto text-center mb-10 lg:mb-14">
        <h2 className="text-2xl font-bold md:text-4xl md:leading-tight dark:text-white">
          Our leadership
        </h2>
      </div> */}

      <div className="grid grid-cols-2 md:grid-cols-3 gap-8 md:gap-16">
        {teamMembers.map((member, index) => (
          <div className="text-left" key={index}>
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
                  <path d="M8 0C5.376 0 3.333 2.042 3.333 4.56c0 1.805.89 3.395 2.236 4.317v.472c0 .66-.313 1.28-.853 1.68-.198.16-.426.302-.68.404a.903.903 0 0 0-.497.566c-.05.16-.05.326 0 .486a.909.909 0 0 0 .58.596c.948.324 1.976.136 2.75-.504.696.37 1.464.57 2.257.58 2.625 0 4.667-2.042 4.667-4.56C12.667 2.042 10.625 0 8 0zm0 2.206c.818 0 1.56.442 1.96 1.158.4.716.4 1.588 0 2.304a2.167 2.167 0 0 1-1.96 1.157 2.167 2.167 0 0 1-1.96-1.157 2.545 2.545 0 0 1 0-2.304c.4-.716 1.142-1.158 1.96-1.158zM5.89 10.857a.626.626 0 0 1 .45.185c.122.13.19.3.18.478a.637.637 0 0 1-.333.528c-.16.095-.337.145-.52.142a.667.667 0 0 1-.49-.218.667.667 0 0 1-.143-.676.657.657 0 0 1 .465-.438.625.625 0 0 1 .391-.001zM10.11 10.857a.628.628 0 0 1 .85.662c-.06.334-.37.577-.714.582-.197-.002-.39-.08-.533-.218a.646.646 0 0 1-.19-.485c.008-.372.305-.66.586-.662zm-4.475 1.44a.628.628 0 0 1 .15.046c.27.09.494.297.6.556.102.24.102.512 0 .753-.104.264-.32.463-.586.556-.26.1-.544.102-.802 0-.25-.094-.456-.293-.556-.555a.692.692 0 0 1 0-.75c.1-.26.306-.465.555-.555.1-.04.204-.063.308-.068zM6.646 11.54a.667.667 0 0 1-.067.466c-.1.187-.275.315-.483.345-.21.028-.426-.03-.58-.16a.627.627 0 0 1-.168-.472c.003-.197.09-.383.24-.507.148-.12.342-.175.53-.145.204.025.387.125.518.278z" />
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
