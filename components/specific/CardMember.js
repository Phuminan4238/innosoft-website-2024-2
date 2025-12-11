// components/specific/CardMember.jsx
"use client";

import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import TeamMemberModal from "@/components/common/TeamMemberModal";

/** ---------- Utils ---------- */
const getInitials = (name = "") => {
  const parts = name.trim().split(/\s+/);
  if (!parts.length) return "?";
  if (parts.length === 1) return parts[0][0]?.toUpperCase() || "?";
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
};

const normalize = (s = "") => s.toLowerCase();

/** แยก band โดยดูจาก tag/position เป็นหลัก (มี fallback ด้วย) */
const inferBand = (m) => {
  const tag = normalize(m.tag || "");
  const title = normalize(m.title || "");

  // Leadership
  if (
    /advisor|expert|director|head|chief|ผู้อำนวยการ|ที่ปรึกษา|ผู้เชี่ยวชาญ/.test(tag + " " + title)
  ) return "Leadership";

  // Management
  if (
    /manager|pm|lead|principal|บริหารโครงการ|ผู้จัดการ/.test(tag + " " + title)
  ) return "Management";

  // Analyst / Product / Design Lead
  if (
    /analyst|product|ux|ui|designer|architect|วิเคราะห์|ออกแบบ/.test(tag + " " + title)
  ) return "Lead: Analyst / Design";

  // Engineering
  if (
    /engineer|developer|programmer|software|data|ml|ai|devops|วิศวกร|โปรแกรมเมอร์/.test(
      tag + " " + title
    )
  ) return "Engineering";

  // Contractors / Interns
  if (
    /contract|temporary|intern|นักศึกษา|ลูกจ้าง/.test(tag + " " + title)
  ) return "Contract / Intern";

  // Fallback
  return "Engineering";
};

/** ลำดับชั้นบนลงล่าง */
const BAND_ORDER = [
  "Leadership",
  "Management",
  "Lead: Analyst / Design",
  "Engineering",
  "Contract / Intern",
];

/** สีแบดจ์หัวเลน */
const BAND_STYLE = {
  "Leadership": "bg-amber-50 text-amber-700 border-amber-200",
  "Management": "bg-sky-50 text-sky-700 border-sky-200",
  "Lead: Analyst / Design": "bg-fuchsia-50 text-fuchsia-700 border-fuchsia-200",
  "Engineering": "bg-emerald-50 text-emerald-700 border-emerald-200",
  "Contract / Intern": "bg-slate-50 text-slate-700 border-slate-200",
};

const Node = ({ member, onClick }) => {
  return (
    <motion.button
      onClick={() => onClick(member)}
      whileHover={{ y: -2, scale: 1.01 }}
      whileTap={{ scale: 0.98 }}
      className="group w-full text-left"
    >
      <div className="flex items-center gap-3 rounded-xl border border-gray-200 bg-white px-3 py-2.5 hover:shadow-sm transition">
        {/* Avatar (initials) */}
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-primary text-xs font-bold">
          {getInitials(member.name)}
        </div>
        {/* Texts */}
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-gray-900">
            {member.name || "Unnamed"}
          </p>
          <p className="truncate text-xs text-gray-600">
            {member.title || member.tag || "—"}
          </p>
        </div>
      </div>
    </motion.button>
  );
};

const Connector = () => (
  <div className="relative my-6">
    {/* เส้นกลางแนวตั้ง */}
    <div className="mx-auto h-5 w-0.5 bg-gray-200" />
    {/* จุดกลม */}
    <div className="mx-auto h-2 w-2 rounded-full bg-gray-300" />
  </div>
);

const SectionHeader = ({ title }) => (
  <div className="flex items-center justify-between">
    <h4 className="text-base sm:text-lg font-bold text-gray-900">{title}</h4>
  </div>
);

/** ---------- Main Component ---------- */
const CardMember = ({ category }) => {
  const [teamMembers, setTeamMembers] = useState([]);
  const [selectedMember, setSelectedMember] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // ดึงจาก proxy API ของเรา (อย่าดึงข้ามโดเมนตรงๆ)
  useEffect(() => {
    const fetchTeamMembers = async () => {
      try {
        const response = await axios.get("/api/teams");
        const raw = response.data?.data || [];

        const mapped = raw
          .filter((item) => {
            if (!category) return true;
            return item.attributes?.category === category;
          })
          .map((item) => {
            const a = item.attributes || {};
            return {
              id: item.id,
              name: `${a.name_en || ""} ${a.surname_en || ""}`.trim() || a.name_th || "",
              title: a.position || "",
              tag: a.tag || "",
              order: typeof a.order === "number" ? a.order : 9999,
              email: a.email || "",
              github: a.github_url || "",
              linkedin: a.linkedin_url || "",
              website: a.website_url || "",
              bio: a.bio_en || a.description_en || "",
              band: inferBand({ tag: a.tag, title: a.position }),
            };
          })
          .sort((x, y) => x.order - y.order);

        setTeamMembers(mapped);
      } catch (e) {
        console.error("Error fetching team members:", e);
        setTeamMembers([]);
      }
    };

    fetchTeamMembers();
  }, [category]);

  // จัดกลุ่มเป็นเลน/แบนด์
  const lanes = useMemo(() => {
    const grouped = teamMembers.reduce((acc, m) => {
      (acc[m.band] ||= []).push(m);
      return acc;
    }, {});
    return BAND_ORDER.filter((b) => grouped[b]?.length).map((b) => ({
      band: b,
      members: grouped[b],
    }));
  }, [teamMembers]);

  const open = (m) => { setSelectedMember(m); setIsModalOpen(true); };
  const close = () => { setSelectedMember(null); setIsModalOpen(false); };

  return (
    <div className="max-w-[1100px] px-4 py-8 sm:py-10 mx-auto">
      {/* หัวเรื่อง */}
      <div className="text-center mb-6">
        <h3 className="text-xl sm:text-2xl font-bold text-gray-900">
          Organization Structure
        </h3>
        <p className="mt-1 text-sm text-gray-600">
         description
        </p>
      </div>

      {/* เลนทีละชั้น */}
      <div className="space-y-7">
        {lanes.map(({ band, members }, idx) => (
          <div key={band}>
            {/* ป้ายหัวเลน */}
            <div
              className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-semibold ${BAND_STYLE[band] || "bg-slate-50 text-slate-700 border-slate-200"}`}
            >
              <span className="h-2 w-2 rounded-full bg-current/60" />
              {band}
            </div>

            {/* แผงสมาชิก: ใช้ layout แนว “org chart” = center + แบ่งคอลัมน์อัตโนมัติ */}
            <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
              {members.map((m) => (
                <Node key={m.id} member={m} onClick={open} />
              ))}
            </div>

            {/* เส้นเชื่อมลงชั้นถัดไป */}
            {idx < lanes.length - 1 && <Connector />}
          </div>
        ))}

        {lanes.length === 0 && (
          <p className="text-sm text-gray-400">ยังไม่มีข้อมูลโครงสร้าง</p>
        )}
      </div>

      {/* Modal เดิม */}
      <TeamMemberModal isOpen={isModalOpen} onClose={close} member={selectedMember} />
    </div>
  );
};

export default CardMember;
