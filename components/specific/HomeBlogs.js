// components/specific/HomeBlogs.jsx
import React from "react";
import Link from "next/link";

const HomeBlogs = ({ blogs = [] }) => {
  // แสดง 4 อันแรก
  const items = blogs.slice(0, 4);

  return (
    <div>
      <div className="flex items-center justify-between gap-4 mb-6">
        <div>
          <p className="text-xs font-semibold tracking-wide text-primary uppercase">
            Discover our blogs
          </p>
          <h2 className="text-2xl font-bold text-gray-900 mt-1">
            อัปเดตโครงการใหม่ แนวทางพัฒนาระบบ/การประมวลผลที่เราทำงานอยู่
          </h2>
          <p className="text-sm text-gray-600 mt-1">
            ข่าว โครงการ เทคโนโลยี และ training จากทีม Innosoft
          </p>
        </div>
        <Link
          href="/blog"
          className="hidden sm:inline-flex items-center gap-1 px-3 py-2 bg-primary text-white text-sm rounded-md"
        >
          ดูบทความทั้งหมด
          <svg
            className="w-4 h-4"
            viewBox="0 0 24 24"
            stroke="currentColor"
            fill="none"
          >
            <path d="m9 18 6-6-6-6" strokeWidth="2" />
          </svg>
        </Link>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {items.map((blog) => {
          const attrs = blog.attributes || {};
          return (
            <Link
              key={blog.id}
              href={`/blog/${blog.id}`}
              className="bg-white border border-gray-100 rounded-xl p-4 hover:shadow-sm transition flex flex-col"
            >
              <span className="text-xs text-gray-400 mb-2">
                {attrs.Category || "Innosoft"}
              </span>
              <h3 className="text-base font-semibold text-gray-900 line-clamp-2">
                {attrs.name}
              </h3>
              <p className="text-sm text-gray-500 mt-2 line-clamp-3 flex-1">
                {attrs.description ||
                  "บทความจากทีม Innosoft KMUTT เกี่ยวกับระบบสารสนเทศ การออกแบบ UX/UI และงานประมวลผล"}
              </p>
              <span className="mt-4 inline-flex items-center gap-1 text-primary text-sm">
                อ่านต่อ
                <svg
                  className="w-4 h-4"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  fill="none"
                >
                  <path d="m9 18 6-6-6-6" strokeWidth="2" />
                </svg>
              </span>
            </Link>
          );
        })}

        {items.length === 0 && (
          <div className="col-span-4 text-sm text-gray-400">
            ยังไม่มีบทความ
          </div>
        )}
      </div>

      {/* ปุ่มสำหรับ mobile */}
      <div className="sm:hidden flex justify-center mt-6">
        <Link
          href="/blog"
          className="inline-flex items-center gap-1 px-4 py-2 bg-primary text-white text-sm rounded-md"
        >
          ดูบทความทั้งหมด
          <svg
            className="w-4 h-4"
            viewBox="0 0 24 24"
            stroke="currentColor"
            fill="none"
          >
            <path d="m9 18 6-6-6-6" strokeWidth="2" />
          </svg>
        </Link>
      </div>
    </div>
  );
};

export default HomeBlogs;
