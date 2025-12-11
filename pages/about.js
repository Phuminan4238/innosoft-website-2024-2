"use client";

import React, { useEffect, useMemo, useState } from "react";
import NavBar from "../components/layout/Navbar";
import Container from "../components/layout/Container";
import PageTitle from "@/components/common/PageTitle";
import Footer from "@/components/layout/Footer";
import Link from "next/link";

/* ========== helpers ========== */
const getUploadUrl = (uploadfiles) => {
  if (!uploadfiles || !uploadfiles.data) return "";
  const data = uploadfiles.data;
  if (!Array.isArray(data)) {
    return data?.attributes?.url
      ? `https://innosoft.kmutt.ac.th${data.attributes.url}`
      : "";
  }
  if (Array.isArray(data) && data[0]?.attributes?.url) {
    return `https://innosoft.kmutt.ac.th${data[0].attributes.url}`;
  }
  return "";
};

/* ====== Static org profile to keep About tone consistent ====== */
const ORG_BLURB = {
  th: "ศูนย์นวัตกรรมซอฟต์แวร์และการประมวลผล (Innosoft) มจธ. — ก่อตั้ง ต.ค. 2552 สังกัดภาควิชาวิศวกรรมคอมพิวเตอร์ คณะวิศวกรรมศาสตร์ มุ่งพัฒนาระบบสารสนเทศ ให้บริการพัฒนาซอฟต์แวร์ งานประมวลผล และอบรมบุคลากร",
  en: "Software and Computing Innovation Center at KMUTT — founded Oct 2009 under the Department of Computer Engineering, Faculty of Engineering."
};

const STATS = [
  { label: "Founded", value: "Oct 2009" },
  { label: "Affiliation", value: "CPE • Faculty of Engineering • KMUTT" },
  { label: "Internal projects", value: "11+" },
  { label: "External projects", value: "26+" }
];

const PERSONNEL = [
  { group: "Staff", items: ["Advisors/Experts 2", "Project Managers 2", "Analyst 1", "Senior Developers/Engineers 2"] },
  { group: "Contract", items: ["Graduate Devs 3", "Web Designer 1"] },
  { group: "On-demand", items: ["Subject-matter experts (cross-faculty, BX)", "Additional Devs/Analysts as needed"] }
];

const VALUES = [
  { h: "Impact-first", p: "ขับเคลื่อนด้วยผลลัพธ์ที่วัดได้และคุณค่าต่อผู้ใช้" },
  { h: "Open collaboration", p: "ทำงานร่วมกับหน่วยงานและนักวิจัยหลากสาขา" },
  { h: "Reliability", p: "มาตรฐานงานระบบ ออกแบบให้ดูแลง่ายและขยายได้" },
];

export default function About() {
  const [aboutData, setAboutData] = useState([]);
  const [loading, setLoading] = useState(true);

  // fetch via local API (avoid CORS)
  useEffect(() => {
    const fetchAboutData = async () => {
      try {
        const res = await fetch("/api/abouts");
        const json = await res.json();
        setAboutData(json?.data ?? []);
      } catch (e) {
        console.error("Error fetching about data:", e);
        setAboutData([]);
      } finally {
        setLoading(false);
      }
    };
    fetchAboutData();
  }, []);

  // split blocks
  const { vision, mission, missionItems } = useMemo(() => {
    const visionBlock = aboutData.find((i) => i?.attributes?.topic === "Vision");
    const missionBlock = aboutData.find((i) => i?.attributes?.topic === "Mission");
    const items =
      missionBlock?.attributes?.mission && Array.isArray(missionBlock.attributes.mission)
        ? missionBlock.attributes.mission
        : [];
    return {
      vision: {
        title: visionBlock?.attributes?.topic || "Vision",
        text: visionBlock?.attributes?.content_en || "",
        image: getUploadUrl(visionBlock?.attributes?.uploadfiles),
      },
      mission: {
        title: missionBlock?.attributes?.topic || "Mission",
        text: missionBlock?.attributes?.content_en || "",
        image: getUploadUrl(missionBlock?.attributes?.uploadfiles),
      },
      missionItems: items,
    };
  }, [aboutData]);

  return (
    <div>
      <NavBar />

      {/* Hero */}
      <PageTitle
        pageTitle="About Innosoft KMUTT"
        includePrimaryBackground={true}
        pageSubtitle="Who we are, what we stand for, and the people behind our work."
      />

      <main className="mx-auto max-w-[1180px] px-4">
        {/* Organization Overview (belongs on About) */}
        <section className="py-10 lg:py-14">
          {loading ? (
            <div className="animate-pulse h-24 bg-gray-100 rounded-lg" />
          ) : (
            <div className="text-center">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
                Software & Computing Innovation Center • KMUTT
              </h2>
              <p className="mt-3 text-sm md:text-base text-gray-700 dark:text-neutral-300 leading-relaxed">
                {ORG_BLURB.th}
              </p>
              <p className="mt-1 text-xs md:text-sm text-gray-500">{ORG_BLURB.en}</p>

              <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3">
                {STATS.map((s, i) => (
                  <div key={i} className="rounded-lg border border-gray-100 bg-white p-4 text-center">
                    <p className="text-xs uppercase tracking-wide text-primary">{s.label}</p>
                    <p className="mt-1 font-semibold text-gray-900">{s.value}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </section>

        {/* Vision (with optional image) */}
        {(vision.text || !loading) && (
          <section className="py-8 lg:py-10 border-t border-gray-100">
            <div className="mx-auto max-w-5xl grid gap-6 sm:grid-cols-5 items-start">
              {vision.image ? (
                <div className="sm:col-span-2">
                  <img
                    src={vision.image}
                    alt="Vision"
                    className="w-full h-auto rounded-xl border border-gray-100 object-cover"
                  />
                </div>
              ) : null}
              <div className={vision.image ? "sm:col-span-3" : "sm:col-span-5"}>
                <p className="text-xs font-semibold tracking-wide text-primary uppercase">Vision</p>
                <h3 className="mt-2 text-xl md:text-2xl font-bold text-gray-900 dark:text-white">
                  {vision.title}
                </h3>
                <p className="mt-3 text-sm md:text-base text-gray-700 dark:text-neutral-300 leading-relaxed">
                  {vision.text || "—"}
                </p>
              </div>
            </div>
          </section>
        )}

        {/* Mission (with items) */}
        {(mission.text || missionItems.length > 0 || !loading) && (
          <section className="py-8 lg:py-12 border-t border-gray-100">
            <div className="mx-auto max-w-5xl grid gap-6 sm:grid-cols-5 items-start">
              {mission.image ? (
                <div className="sm:col-span-2">
                  <img
                    src={mission.image}
                    alt="Mission"
                    className="w-full h-auto rounded-xl border border-gray-100 object-cover"
                  />
                </div>
              ) : null}
              <div className={mission.image ? "sm:col-span-3" : "sm:col-span-5"}>
                <p className="text-xs font-semibold tracking-wide text-primary uppercase">Mission</p>
                <h3 className="mt-2 text-xl md:text-2xl font-bold text-gray-900 dark:text-white">
                  {mission.title}
                </h3>
                {mission.text ? (
                  <p className="mt-3 text-sm md:text-base text-gray-700 dark:text-neutral-300 leading-relaxed">
                    {mission.text}
                  </p>
                ) : null}

                {missionItems.length > 0 && (
                  <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {missionItems.map((m, idx) => (
                      <div key={m?.id ?? idx} className="rounded-xl border border-gray-100 bg-white p-5">
                        <div className="flex items-start gap-3">
                          <span className="mt-0.5 inline-flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-primary text-sm">✓</span>
                          <div>
                            <p className="font-semibold text-gray-900">{m?.header ?? "Mission item"}</p>
                            <p className="mt-1 text-sm text-gray-600">{m?.paragraph ?? "description"}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </section>
        )}

        {/* Values (About-only) */}
        <section className="py-8 lg:py-12 border-t border-gray-100">
          <h3 className="text-center text-xl md:text-2xl font-bold text-gray-900 dark:text-white">
            Our Values
          </h3>
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
            {VALUES.map((v, i) => (
              <div key={i} className="rounded-xl border border-gray-100 bg-white p-5">
                <p className="font-semibold text-gray-900">{v.h}</p>
                <p className="mt-1 text-sm text-gray-700">{v.p}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Personnel capacity (kept on About) */}
        <section className="py-8 lg:py-10 border-t border-gray-100">
          <h3 className="text-lg md:text-xl font-bold text-gray-900">ศักยภาพด้านบุคลากร</h3>
          <div className="mt-4 grid gap-4 sm:grid-cols-3">
            {PERSONNEL.map((block, idx) => (
              <div key={idx} className="rounded-xl border border-gray-100 bg-white p-4">
                <p className="font-semibold text-gray-900">{block.group}</p>
                <ul className="mt-2 list-disc pl-5 text-sm text-gray-700 space-y-1">
                  {block.items.map((x, i) => (
                    <li key={i}>{x}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* CTA to Team */}
        <section className="py-10 lg:py-14 border-t border-gray-100">
          <div className="rounded-xl bg-gray-50 px-6 py-6 sm:px-8 sm:py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-center sm:text-left">
              <h4 className="text-lg sm:text-xl font-bold text-gray-900">Meet our team</h4>
              <p className="text-sm text-gray-600">Stay in the know with insights from industry experts.</p>
            </div>
            <Link
              href="/team"
              className="inline-flex items-center gap-1 rounded-md bg-primary px-4 py-2 text-white text-sm hover:bg-primary/90 transition"
            >
              View all
              <svg className="h-4 w-4" viewBox="0 0 24 24" stroke="currentColor" fill="none">
                <path d="m9 18 6-6-6-6" strokeWidth="2" />
              </svg>
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
