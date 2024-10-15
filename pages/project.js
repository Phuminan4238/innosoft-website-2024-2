import React, { useState } from "react";
import NavBar from "../components/layout/Navbar";
import Container from "../components/layout/Container";
import CardProject from "../components/specific/CardProject";
import PageTitle from "@/components/common/PageTitle";
import Footer from "@/components/layout/Footer";

// Fetch projects data from the API
export async function getServerSideProps() {
  const res = await fetch(
    "http://10.35.29.183:1337/api/projects?populate=uploadfiles.data"
  );
  const data = await res.json();

  return {
    props: {
      projectsData: data.data,
    },
  };
}

export default function Projects({ projectsData }) {
  const [selectedTab, setSelectedTab] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  // Sort projects by publishedAt date (newest first)
  const sortedProjects = [...projectsData].sort(
    (a, b) =>
      new Date(b.attributes.publishedAt) - new Date(a.attributes.publishedAt)
  );

  // Filter projects based on selected tab and search query
  const filteredProjects = sortedProjects
    .filter(
      (project) =>
        project.attributes.category === selectedTab || selectedTab === "All"
    )
    .filter((project) =>
      project.attributes.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

  return (
    <div>
      <NavBar />
      <PageTitle
        pageTitle="Our Projects"
        includePrimaryBackground={false}
        pageSubtitle="Learn more about our mission and values."
      />
      <Container>
        {/* Row with two columns */}
        <div className="max-w-[85rem] px-4 py-6 sm:px-6 lg:px-8 lg:py-6 mx-auto">
          <div className="flex flex-col sm:flex-row items-center sm:justify-between mb-6">
            {/* Column 2: Search Bar */}
            <div className="order-1 sm:order-2 flex-grow max-w-full sm:max-w-md mb-4 sm:mb-0">
              <input
                type="text"
                placeholder="Search..."
                className="w-full px-4 py-2 text-sm border rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-primary"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            {/* Column 1: Tabs */}
            <div className="order-2 sm:order-1 flex flex-wrap justify-center sm:justify-start space-x-4 sm:space-x-8 mb-4 sm:mb-0 pt-4 md:pt-0 lg:pt-0">
              {[
                "All",
                "Consult",
                "Data",
                "Design",
                "Development",
                "Training",
              ].map((tab) => (
                <button
                  key={tab}
                  className={`px-4 sm:px-8 py-2 sm:py-3 text-sm sm:text-md font-medium rounded-md ${
                    selectedTab === tab
                      ? "bg-[#FEF0E7] text-[#F37220]"
                      : "bg-white text-gray-700"
                  }`}
                  onClick={() => setSelectedTab(tab)}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="max-w-[85rem] px-4 pb-8 sm:px-6 lg:px-8 lg:pb-8 mx-auto">
          <div className="grid sm:grid-cols-2 gap-6">
            {filteredProjects.map((project) => (
              <CardProject
                key={project.id}
                category={project.attributes.category}
                tag={project.attributes.tag}
                title={project.attributes.name}
                description={project.attributes.description}
                imageUrl={
                  project.attributes.uploadfiles?.data?.attributes?.url
                    ? `http://10.35.29.183:1337${project.attributes.uploadfiles.data.attributes.url}`
                    : "/public/img/default-image.jpg" // Fallback image if no image is found
                }
                linkUrl={`/project/${project.id}`} // Dynamically generate link URL based on project ID
                showButton={true}
                isIndex={false}
              />
            ))}
          </div>
        </div>
      </Container>
      <Footer />
    </div>
  );
}
