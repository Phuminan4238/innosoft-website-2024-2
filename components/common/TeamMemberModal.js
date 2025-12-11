"use client";

import React, { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const backdropVariants = { hidden: { opacity: 0 }, visible: { opacity: 1 } };
const modalVariants = { hidden: { opacity: 0, y: 40, scale: 0.95 }, visible: { opacity: 1, y: 0, scale: 1 } };

// ห้ามใส่ /public ข้างหน้า—ไฟล์ใน public อ้างด้วย /img/...
const FALLBACK_AVATAR = "/img/default-avatar.png";

const getInitials = (name = "") => {
  const parts = name.trim().split(/\s+/);
  if (!parts.length) return "?";
  if (parts.length === 1) return (parts[0][0] || "?").toUpperCase();
  return ((parts[0][0] || "") + (parts[parts.length - 1][0] || "")).toUpperCase();
};

export default function TeamMemberModal({ isOpen, onClose, member }) {
  // จัดการรูปแตก/ไม่มีรูป
  const initialSrc = useMemo(() => {
    const src = member?.imageUrl?.trim();
    // กันเคสส่งมาว่าง/undefined/null
    return src && src !== "/public/img/default-avatar.png" ? src : FALLBACK_AVATAR;
  }, [member?.imageUrl]);

  const [imgSrc, setImgSrc] = useState(initialSrc);
  const [imgOk, setImgOk] = useState(true);

  useEffect(() => {
    setImgSrc(initialSrc);
    setImgOk(true);
  }, [initialSrc]);

  const handleImgError = () => {
    if (imgSrc !== FALLBACK_AVATAR) {
      setImgSrc(FALLBACK_AVATAR);
      setImgOk(false);
    } else {
      setImgOk(false);
    }
  };

  const initials = getInitials(member?.name || "");

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[999] flex items-center justify-center bg-black/50 backdrop-blur-sm px-4"
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          onClick={onClose}
        >
          <motion.div
            className="relative w-full max-w-lg rounded-2xl bg-white shadow-2xl dark:bg-slate-900"
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            transition={{ type: "spring", stiffness: 160, damping: 18 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* close */}
            <button
              onClick={onClose}
              className="absolute top-3 right-3 inline-flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-slate-600 hover:bg-slate-200"
              aria-label="Close"
            >
              ✕
            </button>

            <div className="flex flex-col gap-5 p-6 sm:p-8">
              {/* header */}
              <div className="flex gap-4">
                {/* ถ้ารูปใช้ได้ → โชว์รูป, ถ้าพัง → โชว์วงกลมตัวอักษรย่อ */}
                {imgOk ? (
                  <img
                    src={imgSrc}
                    alt={member?.name || "Member"}
                    className="h-20 w-20 rounded-xl object-cover ring-2 ring-primary/10"
                    onError={handleImgError}
                    // กัน warning aspect ratio
                    style={{ height: "auto", width: "80px", aspectRatio: "1 / 1" }}
                  />
                ) : (
                  <div className="h-20 w-20 rounded-xl ring-2 ring-primary/10 bg-primary/10 flex items-center justify-center">
                    <span className="text-primary font-bold text-lg">{initials}</span>
                  </div>
                )}

                <div className="flex-1 min-w-0">
                  <h2 className="text-lg font-semibold text-slate-900 dark:text-white truncate">
                    {member?.name || "Unnamed"}
                  </h2>
                  <p className="text-sm text-slate-500 truncate">{member?.title || "—"}</p>
                  {member?.tag ? (
                    <span className="mt-2 inline-flex rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                      {member.tag}
                    </span>
                  ) : null}
                </div>
              </div>

              {/* body */}
              <div className="space-y-3">
                {member?.email ? (
                  <div className="text-sm">
                    <p className="text-slate-400 text-xs uppercase tracking-wide">Email</p>
                    <a href={`mailto:${member.email}`} className="text-primary hover:underline break-all">
                      {member.email}
                    </a>
                  </div>
                ) : null}

                {member?.bio ? (
                  <div className="text-sm">
                    <p className="text-slate-400 text-xs uppercase tracking-wide mb-1">Bio</p>
                    <p className="text-slate-700 dark:text-slate-200 leading-relaxed">
                      {member.bio}
                    </p>
                  </div>
                ) : null}

                {(member?.github || member?.linkedin || member?.website) && (
                  <div className="flex flex-wrap gap-2 pt-2">
                    {member.github ? (
                      <a
                        href={member.github}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-3 py-1 text-xs font-medium text-slate-700 hover:bg-slate-50"
                      >
                        <span>GitHub</span>
                      </a>
                    ) : null}
                    {member.linkedin ? (
                      <a
                        href={member.linkedin}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-3 py-1 text-xs font-medium text-slate-700 hover:bg-slate-50"
                      >
                        <span>LinkedIn</span>
                      </a>
                    ) : null}
                    {member.website ? (
                      <a
                        href={member.website}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-3 py-1 text-xs font-medium text-slate-700 hover:bg-slate-50"
                      >
                        <span>Website</span>
                      </a>
                    ) : null}
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
