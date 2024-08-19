import React from "react";
// components
import NavBar from "../components/layout/Navbar"; // Navigation bar component
import PageTitle from "@/components/common/PageTitle"; // Page title component
import ServiceCard from "../components/specific/ServiceCard"; // Service card component
// API data
import services from "./api/service"; // Import services data from the API
// components/specific
import Footer from "@/components/layout/Footer"; // Footer component
import Container from "../components/layout/Container"; // Container component for layout

export default function About() {
  return (
    <div>
      <NavBar /> {/* Render the navigation bar */}
      <PageTitle
        pageTitle="Our Services"
        includePrimaryBackground={true}
        pageSubtitle="Learn more about our mission and values."
      />
      <Container>
        <ServiceCard services={services} />{" "}
        {/* Render the ServiceCard component with services data */}
      </Container>
      {/* <BlogCard /> */}
      <Footer /> {/* Render the footer */}
    </div>
  );
}
