import React, { useState } from "react";
// components
import Container from "../components/layout/Container"; // Container component for layout
import NavBar from "../components/layout/Navbar"; // Navigation bar component
import PageTitle from "@/components/common/PageTitle"; // Page title component
import blogs from "./api/blog"; // Import blogs data from the API
import CardBlog from "@/components/specific/CardBlog"; // Blog card component
import Footer from "@/components/layout/Footer"; // Footer component

export default function Blog() {
  const maxPostsToShow = 6; // Maximum number of blog posts to show initially
  const [blogsToShow, setBlogsToShow] = useState(maxPostsToShow); // State to track number of blogs to show

  // Function to load more blogs
  const loadMoreBlogs = () => {
    setBlogsToShow((prev) => prev + maxPostsToShow); // Increase the count of blogs to show by the max number
  };

  return (
    <div>
      <NavBar /> {/* Render the navigation bar */}
      <Container>
        <PageTitle
          pageTitle="Our Blogs"
          includePrimaryBackground={false}
          pageSubtitle="A peep at some distant orb has power to raise and purify our thoughts like a strain of sacred music, or a noble picture, or a passage from the grander poets."
        />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Map over the blogs array and render CardBlog component */}
          {blogs.slice(0, blogsToShow).map((blog) => (
            <CardBlog
              key={blog.id}
              category={blog.category}
              title={blog.title}
              description={blog.description}
              imageUrl={blog.imageUrl}
              linkUrl={`/blog/${blog.id}`} // Dynamically generate link URL based on blog ID
              showButton={true} // Show the button on all cards
              isIndex={true} // Assuming you have an isIndex prop
            />
          ))}
        </div>
      </Container>
      <Footer /> {/* Render the footer */}
    </div>
  );
}
