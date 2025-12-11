// components/specific/HomeProjects.jsx
import React from "react";
import Link from "next/link";

const HomeProjects = ({ projects = [] }) => {
  const featured = projects[0];
  const rest = projects.slice(1, 4);

  // helper ใช้แบบเดียวกับของคุณเดิม
  const getProjectImage = (proj) => {
    const attrs = proj?.attributes;
    const fileObj = attrs?.uploadfiles?.data;
    if (fileObj?.attributes?.url) {
      return `https://innosoft.kmutt.ac.th${fileObj.attributes.url}`;
    }
    // fallback แบบที่คุณเขียนในโค้ดแรก
    return "/public/img/default-image.jpg";
  };

  return (
    <div>
      <div className="flex items-center justify-between gap-4 mb-6">
        <div>
          <p className="text-xs font-semibold tracking-wide text-primary uppercase">
            OUR PROJECTS
          </p>
          <h2 className="text-2xl font-bold text-gray-900 mt-1">
            ตัวอย่างโครงการพัฒนาระบบสารสนเทศของมหาวิทยาลัย หน่วยงานรัฐ และภาคอุตสาหกรรม
          </h2>
          <p className="text-sm text-gray-600 mt-1">short description</p>
        </div>
        <Link
          href="/project"
          className="hidden sm:inline-flex items-center gap-1 px-3 py-2 bg-primary text-white text-sm rounded-md"
        >
          ดูโครงการทั้งหมด
          <svg className="w-4 h-4" viewBox="0 0 24 24" stroke="currentColor" fill="none">
            <path d="m9 18 6-6-6-6" strokeWidth="2" />
          </svg>
        </Link>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* featured */}
        <div className="lg:col-span-2">
          {featured ? (
            <Link
              href={`/project/${featured.id}`}
              className="block bg-white border border-gray-100 rounded-2xl overflow-hidden hover:shadow-md transition"
            >
              <div className="h-56 bg-gray-100">
                <img
                  src={getProjectImage(featured)}
                  alt={featured.attributes?.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-5">
                <span className="inline-flex px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium">
                  {featured.attributes?.category || "Project"}
                </span>
                <h3 className="text-xl font-semibold text-gray-900 mt-3">
                  {featured.attributes?.name}
                </h3>
                <p className="text-sm text-gray-600 mt-2 line-clamp-3">
                  {featured.attributes?.description}
                </p>
                <p className="mt-4 inline-flex items-center gap-1 text-primary text-sm">
                  ดูรายละเอียดโครงการ
                  <svg className="w-4 h-4" viewBox="0 0 24 24" stroke="currentColor" fill="none">
                    <path d="m9 18 6-6-6-6" strokeWidth="2" />
                  </svg>
                </p>
              </div>
            </Link>
          ) : (
            <div className="h-56 rounded-2xl bg-gray-100" />
          )}
        </div>

        {/* list ขวา */}
        <div className="space-y-4">
          {rest.map((proj) => {
            const attrs = proj.attributes || {};
            return (
              <Link
                key={proj.id}
                href={`/project/${proj.id}`}
                className="flex gap-3 bg-white border border-gray-100 rounded-xl p-3 hover:shadow-sm transition"
              >
                <div className="w-16 h-16 rounded-lg bg-gray-100 overflow-hidden flex-shrink-0">
                  <img
                    src={getProjectImage(proj)}
                    alt={attrs.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <p className="text-xs text-gray-400">
                    {attrs.category || "Project"}
                  </p>
                  <p className="text-sm font-semibold text-gray-900 line-clamp-2">
                    {attrs.name}
                  </p>
                  <p className="text-xs text-gray-500 line-clamp-2">
                    {attrs.description}
                  </p>
                </div>
              </Link>
            );
          })}

          <Link
            href="/project"
            className="block text-center text-primary text-sm border border-primary/30 rounded-lg py-2 hover:bg-primary/5"
          >
            ดูโครงการทั้งหมด →
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomeProjects;
