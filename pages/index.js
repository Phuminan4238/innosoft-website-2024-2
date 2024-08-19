import React, { useState } from "react";

// Components
import NavBar from "../components/layout/Navbar"; // Navigation bar component
import Container from "../components/layout/Container"; // Container component for layout
import CardProject from "../components/specific/CardProject"; // Card component for displaying projects
import Hero from "@/components/specific/Hero"; // Hero section component
import CardTitle from "@/components/common/CardTitle"; // Title component for cards
import Slider from "@/components/specific/Slider"; // Slider component for carousel
import PageTitle from "@/components/common/PageTitle"; // Title component for pages
import CardBlog from "@/components/specific/CardBlog"; // Card component for blogs
import Contact from "@/components/specific/Contact"; // Contact component
import Footer from "@/components/layout/Footer"; // Footer component
import Client from "@/components/specific/Client"; // Client section component
import Button from "@/components/common/Button";

// API data
import projects from "./api/projects"; // Importing projects data from the API
import blogs from "./api/blog"; // Importing blogs data from the API

export default function Home() {
  // State and constants for services and projects
  const servicetitle = "Our Services";
  const servicesubtitle =
    "Stay in the know with insights from industry experts.";
  const projecttitle = "Our Projects";
  const projectsubtitle =
    "Stay in the know with insights from industry experts.";
  const link = "/project"; // Ensure this is a valid string

  const maxPostsToShow = 6; // Maximum number of blog posts to show initially
  const [blogsToShow, setBlogsToShow] = useState(maxPostsToShow); // State to track number of blogs to show

  // Function to load more blogs
  const loadMoreBlogs = () => {
    setBlogsToShow((prev) => prev + maxPostsToShow); // Increase the count of blogs to show by the max number
  };

  return (
    <div>
      {/* Navigation Bar */}
      <NavBar />
      {/* Hero Section */}
      <Hero />
      {/* Client Section */}
      <div className="py-6"></div>
      <Client />
      <div className="py-6"></div>
      {/* Services Section */}
      <Container>
        {/* <CardTitle
          title={servicetitle}
          subtitle={servicesubtitle}
          servicetitle={servicetitle} // Pass servicetitle to CardTitle
        /> */}
      </Container>
      {/* Slider Section */}
      <Slider /> {/* Assuming this is correctly integrated */}
      {/* Projects Section */}
      <Container>
        <CardTitle
          title={projecttitle}
          subtitle={projectsubtitle}
          servicetitle={projecttitle}
          link={link} // Pass the link prop here
        />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <CardProject
              key={project.id}
              category={project.category}
              title={project.title}
              description={project.description}
              imageUrl={project.imageUrl}
              linkUrl={`/project/${project.id}`} // Dynamically generate link URL based on project ID
              showButton={false} // Adjust based on your project needs
              isIndex={true} // Assuming you have an isIndex prop
            />
          ))}
        </div>
      </Container>
      {/* Blogs Section */}
      <Container>
        <PageTitle
          pageTitle="Discover our blogs"
          includePrimaryBackground={false}
          pageSubtitle="A peep at some distant orb has power to raise and purify our thoughts like a strain of sacred music, or a noble picture, or a passage from the grander poets."
        />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogs.slice(0, blogsToShow).map((blog) => (
            <CardBlog
              key={blog.id}
              category={blog.category}
              title={blog.title}
              description={blog.description}
              imageUrl={blog.imageUrl}
              // linkUrl={`/blog/${blog.id}`} // Dynamically generate link URL based on blog ID
              linkUrl={`https://medium.com`} // Replace
              showButton={true} // Show the button on all cards
              isIndex={true} // Assuming you have an isIndex prop
            />
          ))}
        </div>
        <div className="flex justify-center mt-8">
          <a href="/blog">
            <button
              onClick={loadMoreBlogs}
              className="text-white text-subtitle flex justify-center items-center gap-1 px-3 py-2 rounded-md border bg-primary border-primary hover:underline transition"
            >
              Explore More
            </button>
          </a>
        </div>
      </Container>
      {/* Contact Section */}
      <Container className="py-10">
        <Contact
          title="Just Connect With Us!"
          subtitle={projectsubtitle}
        ></Contact>
      </Container>
      {/* Footer Section */}
      <Footer />
    </div>
  );
}
