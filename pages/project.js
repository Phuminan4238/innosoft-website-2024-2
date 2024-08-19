import React, { useState } from "react";
import NavBar from "../components/layout/Navbar";
import Container from "../components/layout/Container";
import CardProject from "../components/specific/CardProject";
import PageTitle from "@/components/common/PageTitle";
import Footer from "@/components/layout/Footer";
import projectsData from "./api/projects"; // Import projects data

export default function Projects() {
  const [selectedTab, setSelectedTab] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  // Filter projects based on selected tab and search query
  const filteredProjects = projectsData
    .filter(
      (project) => project.category === selectedTab || selectedTab === "All"
    )
    .filter((project) =>
      project.title.toLowerCase().includes(searchQuery.toLowerCase())
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
          <div className="flex items-center justify-between mb-6">
            {/* Column 1: Tabs */}
            <div className="flex space-x-8">
              {["All", "Data", "Design", "Development", "Training"].map(
                (tab) => (
                  <button
                    key={tab}
                    className={`px-8 py-3 text-md font-medium rounded-md ${
                      selectedTab === tab
                        ? "bg-[#FEF0E7] text-[#F37220]"
                        : "bg-white text-gray-700"
                    }`}
                    onClick={() => setSelectedTab(tab)}
                  >
                    {tab}
                  </button>
                )
              )}
            </div>
            {/* Column 2: Search Bar */}
            <div className="flex-grow max-w-md">
              <input
                type="text"
                placeholder="Search..."
                className="w-full px-4 py-2 text-sm border rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-primary"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="max-w-[85rem] px-4 pb-8 sm:px-6 lg:px-8 lg:pb-8 mx-auto">
          <div className="grid sm:grid-cols-2 gap-6">
            {filteredProjects.map((project) => (
              <CardProject
                key={project.id}
                category={project.category}
                title={project.title}
                description={project.description}
                imageUrl={project.imageUrl}
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
