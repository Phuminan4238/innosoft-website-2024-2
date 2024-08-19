import React from "react";
import teamMembers from "@/pages/api/member";

const Team = () => {
  // Get the latest 5 members
  const latestMembers = teamMembers.slice(-5);

  return (
    <div className="max-w-[85rem] px-0 py-8 mx-auto">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-8 md:gap-8">
        {latestMembers.map((member, index) => (
          <div key={index} className="flex flex-col items-start">
            <img
              className="rounded-xl w-full mb-4"
              src={member.imageUrl}
              alt={`${member.name} Image`}
            />
            <div className="text-left px-0">
              <h3 className="text-lg font-semibold">{member.name}</h3>
              <p className="text-gray-600">{member.title}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Team;
