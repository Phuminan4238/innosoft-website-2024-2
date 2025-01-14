import React, { useEffect, useState } from "react";
import axios from "axios";

const CardMember = ({ category }) => {
  const [teamMembers, setTeamMembers] = useState([]);

  useEffect(() => {
    const fetchTeamMembers = async () => {
      try {
        const response = await axios.get(
          `https://innosoft.kmutt.ac.th/api/teams?populate=uploadfiles`
        );
        const data = response.data.data
          .filter((item) => item.attributes.category === category) // Filter by category
          .map((item) => ({
            id: item.id,
            name: `${item.attributes.name_en} ${item.attributes.surname_en}`,
            title: item.attributes.position,
            tag: item.attributes.tag,
            order: item.attributes.order, // Include the order field
            imageUrl: `https://innosoft.kmutt.ac.th${item.attributes.uploadfiles.data.attributes.url}`,
          }))
          .sort((a, b) => a.order - b.order); // Sort by the order field (ascending)

        setTeamMembers(data);
      } catch (error) {
        console.error("Error fetching team members:", error);
      }
    };

    fetchTeamMembers();
  }, [category]); // Re-fetch when the category changes

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
          </div>
        ))}
      </div>
    </div>
  );
};

export default CardMember;
