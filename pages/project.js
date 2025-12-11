import React, { useState } from "react";
import NavBar from "../components/layout/Navbar";
import Container from "../components/layout/Container";
import CardProject from "../components/specific/CardProject";
import PageTitle from "@/components/common/PageTitle";
import Footer from "@/components/layout/Footer";

// SSR fetch
export async function getServerSideProps() {
  const res = await fetch(
    "https://innosoft.kmutt.ac.th/api/projects?populate=uploadfiles.data"
  );
  const data = await res.json();
  return { props: { projectsData: data.data || [] } };
}

export default function Projects({ projectsData }) {
  const [selectedTab, setSelectedTab] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const categoriesWithData = [
    "All",
    ...Array.from(new Set(projectsData.map(p => p?.attributes?.category).filter(Boolean))),
  ];

  const sortedProjects = [...projectsData].sort(
    (a, b) =>
      new Date(b.attributes.publishedAt) - new Date(a.attributes.publishedAt)
  );

  const filteredProjects = sortedProjects
    .filter(p => selectedTab === "All" || p.attributes.category === selectedTab)
    .filter(p => (p.attributes.name || "").toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <div>
      <NavBar />
      <PageTitle
        pageTitle="Our Projects"
        includePrimaryBackground={false}
        pageSubtitle="Learn more about our mission and values."
      />
      <Container>
        {/* controls */}
        <div className="max-w-[85rem] px-4 py-6 sm:px-6 lg:px-8 lg:py-6 mx-auto">
          <div className="flex flex-col sm:flex-row items-center sm:justify-between gap-4">
            {/* tabs */}
            <div className="order-2 sm:order-1 flex flex-wrap justify-center sm:justify-start gap-2">
              {categoriesWithData.map((tab) => (
                <button
                  key={tab}
                  className={`px-4 sm:px-6 py-2 text-sm font-medium rounded-md transition
                    ${selectedTab === tab ? "bg-[#FEF0E7] text-[#F37220]" : "bg-white text-gray-700 border border-gray-200 hover:bg-gray-50"}`}
                  onClick={() => setSelectedTab(tab)}
                >
                  {tab}
                </button>
              ))}
            </div>
            {/* search */}
            <div className="order-1 sm:order-2 w-full sm:max-w-md">
              <input
                type="text"
                placeholder="Search projects…"
                className="w-full px-4 py-2 text-sm border rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-primary"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* grid: เพิ่มคอลัมน์ + ช่องว่างกระชับ */}
        <div className="max-w-[85rem] px-4 pb-8 sm:px-6 lg:px-8 lg:pb-12 mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 lg:gap-6">
            {filteredProjects.map((project) => (
              <CardProject
                key={project.id}
                category={project.attributes.category}
                tag={project.attributes.tag}
                tag2={project.attributes.tag2}
                title={project.attributes.name}
                description={project.attributes.description}
                imageUrl={
                  project.attributes.uploadfiles?.data?.attributes?.url
                    ? `https://innosoft.kmutt.ac.th${project.attributes.uploadfiles.data.attributes.url}`
                    : "/img/default-image.jpg" // ✅ อย่าใส่ /public
                }
                linkUrl={`/project/${project.id}`}
                showButton={true}
                isIndex={false}
                variant="compact"           // ✅ ลดขนาดรูป/การ์ด
              />
            ))}
          </div>
        </div>
      </Container>
      <Footer />
    </div>
  );
}
