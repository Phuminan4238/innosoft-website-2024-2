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

  const [selectedTab, setSelectedTab] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  // Filter blogs based on selected tab and search query
  const filteredBlogs = blogs
    .filter((blog) => blog.category === selectedTab || selectedTab === "All")
    .filter((blog) =>
      blog.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

  return (
    <div>
      <NavBar /> {/* Render the navigation bar */}
      <Container>
        <PageTitle
          pageTitle="Our Blogs"
          includePrimaryBackground={false}
          pageSubtitle="A peep at some distant orb has power to raise and purify our thoughts like a strain of sacred music."
        />

        <div className="max-w-[85rem] px-4 py-6 sm:px-6 lg:px-8 lg:py-6 mx-auto">
          <div className="flex items-center justify-between mb-6">
            {/* Column 1: Tabs */}
            <div className="flex space-x-8">
              {["All", "Network", "Education", "Health", "Training"].map(
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

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Map over the filtered blogs array and render CardBlog component */}
          {filteredBlogs.slice(0, blogsToShow).map((blog) => (
            <CardBlog
              key={blog.id}
              category={blog.category}
              title={blog.title}
              description={blog.description}
              imageUrl={blog.imageUrl}
              linkUrl={`https://medium.com`} // Replace with actual Medium link if available
              showButton={true} // Show the button on all cards
              isIndex={true} // Assuming you have an isIndex prop
            />
          ))}
        </div>

        <div className="flex justify-center mt-6">
          {blogsToShow < filteredBlogs.length && (
            <button
              onClick={loadMoreBlogs}
              className="px-4 py-2 bg-blue-500 text-white rounded-md"
            >
              Load More
            </button>
          )}
        </div>
      </Container>
      <Footer /> {/* Render the footer */}
    </div>
  );
}
