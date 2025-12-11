// pages/service.jsx
"use client";

import React, { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import NavBar from "@/components/layout/Navbar";
import PageTitle from "@/components/common/PageTitle";
import Container from "@/components/layout/Container";
import Footer from "@/components/layout/Footer";

/* ===== Helpers ===== */
const toId = (text = "") =>
  text.toString().trim().toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9\-]/g, "");

const getUploadUrl = (uploadfiles) => {
  if (!uploadfiles || !uploadfiles.data) return "";
  const data = uploadfiles.data;
  const first = Array.isArray(data) ? data[0] : data;
  const url = first?.attributes?.url;
  return url ? `https://innosoft.kmutt.ac.th${url}` : "";
};

const truncate = (txt = "", n = 140) =>
  txt.length > n ? `${txt.slice(0, n).trim()}…` : txt;

// แทนที่คอนสแตนต์ ENGAGEMENT เดิม
const ENGAGEMENT = [
  {
    h: "ศึกษาช่องว่างทางเทคโนโลยี (Gap Analysis) & Roadmap",
    p: "สำรวจปัญหา/โอกาส วิเคราะห์ช่องว่าง และวางแผนยกระดับมาตรฐานของหน่วยงาน",
  },
  {
    h: "พัฒนาซอฟต์แวร์สารสนเทศเพื่อการจัดการ (MIS)",
    p: "ออกแบบ/พัฒนาระบบสารสนเทศ เชื่อมต่อระบบเดิม และสนับสนุนการบริหารจัดการ",
  },
  {
    h: "อบรมเชิงปฏิบัติการข้อมูลขนาดใหญ่ (Big Data)",
    p: "ติดตั้งแพลตฟอร์มที่จำเป็น สร้างคู่มือ และอบรม/ถ่ายทอดความรู้ให้ทีมงาน",
  },
];


/* ===== SSR: ดึงโปรเจกต์เหมือนหน้า /project ===== */
export async function getServerSideProps() {
  try {
    const res = await fetch(
      "https://innosoft.kmutt.ac.th/api/projects?populate=uploadfiles.data&sort=publishedAt:desc",
      { next: { revalidate: 0 } } // ป้องกัน cache ฝั่ง edge (ไม่บังคับ)
    );
    const data = await res.json();
    return { props: { projectsData: data?.data || [] } };
  } catch (e) {
    console.error("SSR fetch projects error:", e);
    return { props: { projectsData: [] } };
  }
}

export default function ServicePage({ projectsData = [] }) {
  const router = useRouter();

  /* ===== Services (ยังคง fetch ผ่าน proxy ฝั่ง client ได้ตามเดิม) ===== */
  const [serviceList, setServiceList] = useState([]);
  const [loadingServices, setLoadingServices] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/api/services", { cache: "no-store" });
        const json = await res.json();
        const formatted = (json?.data ?? []).map((s) => {
          const a = s.attributes || {};
          return {
            id: s.id,
            topic: a.topic || "Untitled Service",
            category: a.category || "General",
            content: a.content_en || a.content_th || "",
          };
        });
        setServiceList(formatted);
      } catch (e) {
        console.error("fetch /api/services error:", e);
        setServiceList([]);
      } finally {
        setLoadingServices(false);
      }
    })();
  }, []);

  // Scroll from ?scrollTo=
  useEffect(() => {
    const { scrollTo } = router.query || {};
    if (!scrollTo) return;
    const el = document.getElementById(scrollTo);
    if (el) {
      const yOffset = -80;
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  }, [router.query]);

  // Group services
  const { categories, grouped } = useMemo(() => {
    const g = serviceList.reduce((acc, s) => {
      (acc[s.category] ||= []).push(s);
      return acc;
    }, {});
    const cats = Object.keys(g).sort();
    return { categories: cats, grouped: g };
  }, [serviceList]);

  // Map projects from SSR (เลือกมา 6 ชิ้นล่าสุด)
  const selectedProjects = useMemo(() => {
    const list = (projectsData || []).map((p) => {
      const a = p.attributes || {};
      return {
        id: p.id,
        title: a.name || "Untitled project",
        org: a.organization || a.client || "",
        desc: a.description || "",
        image: getUploadUrl(a.uploadfiles),
        publishedAt: a.publishedAt ? new Date(a.publishedAt).getTime() : 0,
      };
    });
    return list.sort((a, b) => b.publishedAt - a.publishedAt).slice(0, 6);
  }, [projectsData]);

  return (
    <div>
      <NavBar />

      <PageTitle
        pageTitle="Our Services"
        includePrimaryBackground={true}
        pageSubtitle="We design, develop, and deliver digital solutions for KMUTT units and partners."
      />

      <Container>
        {/* ===== What we can help you with ===== */}
        <section className="mx-auto max-w-[1100px] px-4 py-8 lg:py-10">
          <div className="text-center">
            <h3 className="text-xl md:text-2xl font-bold text-gray-900">What we can help you with</h3>
            <p className="mt-2 text-sm text-gray-600">
              พัฒนาระบบสารสนเทศ งานประมวลผล และอบรม—ครอบคลุมโครงการภายในมหาวิทยาลัย หน่วยงานรัฐ และภาคอุตสาหกรรม
            </p>

            {/* category chips */}
            <div className="mt-4 flex flex-wrap justify-center gap-2">
              {categories.length === 0 && !loadingServices && (
                <span className="text-xs text-gray-400">ยังไม่มีข้อมูลบริการ</span>
              )}
              {categories.map((cat) => (
                <a
                  key={cat}
                  href={`#${toId(cat)}`}
                  className="inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/5 px-3 py-1.5 text-sm text-primary hover:bg-primary/10"
                >
                  <span className="inline-block h-2 w-2 rounded-full" style={{ background: "currentColor" }} />
                  {cat}
                  <span className="ml-1 rounded-full bg-primary/10 px-2 py-0.5 text-xs text-primary">
                    {(grouped[cat] || []).length}
                  </span>
                </a>
              ))}
            </div>
          </div>

          {/* lists by category */}
          {categories.map((cat) => (
            <div key={cat} className="mt-8">
              <h4 id={toId(cat)} className="scroll-mt-24 text-lg font-semibold text-gray-900">
                {cat}
              </h4>
              <div className="mt-3 grid gap-4 sm:grid-cols-2">
                {(grouped[cat] || []).map((svc) => (
                  <article
                    key={svc.id}
                    id={toId(svc.topic)}
                    className="rounded-xl border border-gray-100 bg-white p-4 hover:shadow-sm transition"
                  >
                    <p className="font-semibold text-gray-900">{svc.topic}</p>
                    <p className="mt-1 text-sm text-gray-600 leading-relaxed">{svc.content}</p>
                  </article>
                ))}
              </div>
            </div>
          ))}
        </section>

        {/* ===== Engagement models ===== */}
        <section className="mx-auto max-w-[1100px] px-4 py-8 lg:py-10 border-t border-gray-100">
          <h3 className="text-lg md:text-xl font-bold text-gray-900">Engagement models</h3>
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-4">
            {ENGAGEMENT.map((x, i) => (
              <div key={i} className="rounded-xl border border-gray-100 bg-white p-5">
                <p className="font-semibold text-gray-900">{x.h}</p>
                <p className="mt-1 text-sm text-gray-700">{x.p}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ===== Selected project highlights (SSR จาก Strapi) ===== */}
        <section className="mx-auto max-w-[1100px] px-4 py-8 border-t border-gray-100">
          <h3 className="text-lg md:text-xl font-bold text-gray-900">Selected project highlights</h3>

          {selectedProjects.length === 0 ? (
            <p className="mt-3 text-sm text-gray-500">ยังไม่มีโปรเจกต์ที่จะแสดง</p>
          ) : (
            <div className="mt-3 grid gap-4 sm:grid-cols-2">
              {selectedProjects.map((p) => (
                <Link
                  key={p.id}
                  href={`/project/${p.id}`}
                  className="group rounded-xl border border-gray-100 bg-white p-4 hover:shadow-sm transition"
                >
                  <div className="flex items-start gap-4">
                    {p.image ? (
                      <img
                        src={p.image}
                        alt={p.title}
                        className="h-20 w-28 flex-none rounded-lg border border-gray-100 object-cover"
                        loading="lazy"
                      />
                    ) : (
                      <div className="h-20 w-28 flex-none rounded-lg bg-gray-100" />
                    )}
                    <div className="min-w-0">
                      <p className="font-semibold text-gray-900 group-hover:underline">{p.title}</p>
                      {p.org ? <p className="text-xs text-gray-500">{p.org}</p> : null}
                      <p className="mt-1 text-sm text-gray-700 line-clamp-2">{truncate(p.desc, 150)}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}

          <div className="mt-4 text-right">
            <Link href="/project" className="text-primary text-sm hover:underline">
              ดูโครงการทั้งหมด →
            </Link>
          </div>
        </section>

        {/* ===== CTA ===== */}
        <section className="mx-auto max-w-[1100px] px-4 pb-14 border-t border-gray-100">
          <div className="rounded-xl bg-gray-50 px-6 py-6 sm:px-8 sm:py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-center sm:text-left">
              <h4 className="text-lg sm:text-xl font-bold text-gray-900">สนใจบริการจากทีม Innosoft?</h4>
              <p className="text-sm text-gray-600">
                กรอกข้อมูลติดต่อไว้ แล้วทีมเราจะติดต่อกลับภายใน 1 วันทำการ
              </p>
            </div>
            <Link
              href="/contact"
              className="inline-flex items-center gap-1 rounded-md bg-primary px-4 py-2 text-white text-sm hover:bg-primary/90 transition"
            >
              Contact us
              <svg className="h-4 w-4" viewBox="0 0 24 24" stroke="currentColor" fill="none">
                <path d="m9 18 6-6-6-6" strokeWidth="2" />
              </svg>
            </Link>
          </div>
        </section>
      </Container>

      <Footer />
    </div>
  );
}
