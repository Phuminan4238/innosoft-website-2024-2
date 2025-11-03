"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import TeamMemberModal from "@/components/common/TeamMemberModal";

const CardMember = ({ category }) => {
  const [teamMembers, setTeamMembers] = useState([]);
  const [selectedMember, setSelectedMember] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchTeamMembers = async () => {
      try {
        const response = await axios.get(
          `https://innosoft.kmutt.ac.th/api/teams?populate=uploadfiles`
        );

        const data = response.data.data
          .filter((item) => item.attributes.category === category)
          .map((item) => {
            const attrs = item.attributes;
            const imageData = attrs.uploadfiles?.data;

            return {
              id: item.id,
              name: `${attrs.name_en} ${attrs.surname_en}`,
              title: attrs.position,
              tag: attrs.tag,
              order: attrs.order,
              imageUrl: imageData
                ? `https://innosoft.kmutt.ac.th${imageData.attributes.url}`
                : "/default-avatar.png",
              // ฟิลด์ใหม่ที่คุณจะไปเพิ่มใน Strapi
              email: attrs.email || "",
              github: attrs.github_url || "",
              linkedin: attrs.linkedin_url || "",
              website: attrs.website_url || "",
              bio: attrs.bio_en || attrs.description_en || "",
            };
          })
          .sort((a, b) => a.order - b.order);

        setTeamMembers(data);
      } catch (error) {
        console.error("Error fetching team members:", error);
      }
    };

    fetchTeamMembers();
  }, [category]);

  const handleOpenModal = (member) => {
    setSelectedMember(member);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedMember(null);
    setIsModalOpen(false);
  };

  return (
    <div className="max-w-[85rem] px-0 py-10 lg:py-14 mx-auto">
      <div className="grid grid-cols-2 md:grid-cols-3 gap-8 md:gap-16">
        {teamMembers.map((member) => (
          <motion.div
            key={member.id}
            className="text-left cursor-pointer"
            onClick={() => handleOpenModal(member)}
            whileHover={{ y: -4, scale: 1.015 }}
            whileTap={{ scale: 0.985 }}
            transition={{ type: "spring", stiffness: 220, damping: 18 }}
          >
            <img
              className="rounded-xl sm:w-48 lg:w-60 shadow-md ring-1 ring-slate-100 object-cover aspect-[4/3] bg-slate-100"
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
              {member.tag ? (
                <button
                  type="button"
                  className="text-primary text-caption flex justify-center items-center gap-1 mt-3 px-3 py-1 rounded-md border border-primary/70 bg-primary/5 hover:bg-primary/10 transition"
                >
                  {member.tag}
                </button>
              ) : null}
            </div>
          </motion.div>
        ))}
      </div>

      {/* modal */}
      <TeamMemberModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        member={selectedMember}
      />
    </div>
  );
};

export default CardMember;
