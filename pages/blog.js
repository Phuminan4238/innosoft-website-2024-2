import React, { useState } from "react";
import Container from "../components/layout/Container";
import NavBar from "../components/layout/Navbar";
import PageTitle from "@/components/common/PageTitle";
import CardBlog from "@/components/specific/CardBlog";
import Footer from "@/components/layout/Footer";

// Fetch data from the API
export async function getServerSideProps() {
  try {
    const res = await fetch(
      "http://10.35.29.183:1337/api/blogs?populate=uploadfiles.fileupload"
    );
    const data = await res.json();

    return {
      props: {
        blogsData: data.data || [], // Default to empty array if data is undefined
      },
    };
  } catch (error) {
    console.error("Error fetching data:", error);
    return {
      props: {
        blogsData: [], // Default to empty array on error
      },
    };
  }
}

export default function Blog({ blogsData = [] }) {
  const maxPostsToShow = 6;
  const [blogsToShow, setBlogsToShow] = useState(maxPostsToShow);

  const loadMoreBlogs = () => {
    setBlogsToShow((prev) => prev + maxPostsToShow);
  };

  const [selectedTab, setSelectedTab] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  // Filter blogs based on selected tab and search query
  const filteredBlogs = blogsData
    .filter(
      (blog) =>
        blog.attributes.Category === selectedTab || selectedTab === "All"
    )
    .filter((blog) =>
      blog.attributes.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

  return (
    <div>
      <NavBar />
      <Container>
        <PageTitle
          pageTitle="Our Blogs"
          includePrimaryBackground={false}
          pageSubtitle="A peep at some distant orb has power to raise and purify our thoughts like a strain of sacred music."
        />
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
                  className={`flex-1 sm:flex-none px-4 sm:px-8 py-2 sm:py-3 text-sm sm:text-md font-medium rounded-md ${
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
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredBlogs.slice(0, blogsToShow).map((blog) => {
              const attributes = blog.attributes || {};
              const imageUrl = attributes.uploadfiles?.fileupload?.data?.[0]
                ?.attributes?.url
                ? `http://10.35.29.183:1337${attributes.uploadfiles.fileupload.data[0].attributes.url}`
                : "/public/img/default-image.jpg";
              return (
                <CardBlog
                  key={blog.id}
                  category={attributes.Category || "Uncategorized"}
                  title={attributes.name || "Untitled Blog Post"}
                  description={
                    attributes.description || "No description available."
                  }
                  imageUrl={imageUrl}
                  linkUrl={attributes.url || "#"}
                  showButton={true}
                  isIndex={true}
                />
              );
            })}
          </div>
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
      <Footer />
    </div>
  );
}
