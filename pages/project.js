import React from "react";
// components
import NavBar from "../components/layout/Navbar"; // Navigation bar component
import Container from "../components/layout/Container"; // Container component for layout
import CardProject from "../components/specific/CardProject"; // Project card component
import PageTitle from "@/components/common/PageTitle"; // Page title component
// API data
import projects from "./api/projects"; // Import projects data from the API
import Footer from "@/components/layout/Footer"; // Footer component

export default function Projects() {
  return (
    <div>
      <NavBar /> {/* Render the navigation bar */}
      <PageTitle
        pageTitle="Our Projects"
        includePrimaryBackground={false}
        pageSubtitle="Learn more about our mission and values."
      />
      <Container>
        <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
          <div className="grid sm:grid-cols-2 gap-6">
            {projects.map((project) => (
              <CardProject
                key={project.id}
                category={project.category}
                title={project.title}
                description={project.description}
                imageUrl={project.imageUrl}
                linkUrl={`/project/${project.id}`} // Dynamically generate link URL based on project ID
                showButton={true} // Don't show button on projects page
                isIndex={false}
              />
            ))}
          </div>
        </div>
      </Container>
      <Footer /> {/* Render the footer */}
    </div>
  );
}
