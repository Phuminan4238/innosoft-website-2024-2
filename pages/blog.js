import React, { useState } from "react";
import Container from "../components/layout/Container";
import NavBar from "../components/layout/Navbar";
import PageTitle from "@/components/common/PageTitle";
import CardBlog from "@/components/specific/CardBlog";
import Footer from "@/components/layout/Footer";

// Fetch data from the API (SSR — ไม่มีปัญหา CORS)
export async function getServerSideProps() {
  try {
    const res = await fetch(
      "https://innosoft.kmutt.ac.th/api/blogs?populate=uploadfiles.fileupload"
    );
    const data = await res.json();
    return { props: { blogsData: data.data || [] } };
  } catch (error) {
    console.error("Error fetching data:", error);
    return { props: { blogsData: [] } };
  }
}

const base = "https://innosoft.kmutt.ac.th";
const getImageUrl = (attrs = {}) => {
  const file = attrs.uploadfiles?.fileupload?.data;
  // รองรับทั้ง object/array
  if (Array.isArray(file) && file[0]?.attributes?.url) {
    return `${base}${file[0].attributes.url}`;
  }
  if (file && !Array.isArray(file) && file.attributes?.url) {
    return `${base}${file.attributes.url}`;
  }
  return "/img/default-image.jpg"; // ✅ อย่าใช้ /public/...
};

export default function Blog({ blogsData = [] }) {
  const maxPostsToShow = 6;
  const [blogsToShow, setBlogsToShow] = useState(maxPostsToShow);

  const [selectedTab, setSelectedTab] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const categoriesWithData = [
    "All",
    ...new Set(blogsData.map((b) => b.attributes?.Category || "Uncategorized")),
  ];

  const filteredBlogs = blogsData
    .filter((b) => selectedTab === "All" || b.attributes?.Category === selectedTab)
    .filter((b) =>
      (b.attributes?.name || "").toLowerCase().includes(searchQuery.toLowerCase())
    );

  const loadMoreBlogs = () => setBlogsToShow((prev) => prev + maxPostsToShow);

  return (
    <div>
      <NavBar />
      <Container>
        <PageTitle
          pageTitle="Our Blogs"
          includePrimaryBackground={false}
          pageSubtitle="A peep at some distant orb has power to raise and purify our thoughts like a strain of sacred music."
        />

        {/* Filters */}
        <div className="max-w-[85rem] px-4 py-6 sm:px-6 lg:px-8 lg:py-6 mx-auto">
          <div className="flex flex-col sm:flex-row items-center sm:justify-between gap-4">
            {/* Tabs */}
            <div className="order-2 sm:order-1 flex flex-wrap justify-center sm:justify-start gap-2">
              {categoriesWithData.map((tab) => (
                <button
                  key={tab}
                  className={`px-4 sm:px-6 py-2 text-sm font-medium rounded-md transition
                    ${
                      selectedTab === tab
                        ? "bg-[#FEF0E7] text-[#F37220]"
                        : "bg-white text-gray-700 border border-gray-200 hover:bg-gray-50"
                    }`}
                  onClick={() => setSelectedTab(tab)}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Search */}
            <div className="order-1 sm:order-2 w-full sm:max-w-md">
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

        {/* Grid: เพิ่มคอลัมน์ + รูปเตี้ยลง (compact) */}
        <div className="max-w-[85rem] px-4 pb-8 sm:px-6 lg:px-8 lg:pb-8 mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 lg:gap-6">
            {filteredBlogs.slice(0, blogsToShow).map((blog) => {
              const a = blog.attributes || {};
              return (
                <CardBlog
                  key={blog.id}
                  category={a.Category || "Uncategorized"}
                  title={a.name || "Untitled Blog Post"}
                  description={a.description || "No description available."}
                  imageUrl={getImageUrl(a)}
                  linkUrl={a.url || `#`}
                  showButton={true}
                  isIndex={true}
                  variant="compact"  // ✅ ใช้โหมดรูปเล็ก
                />
              );
            })}
          </div>
        </div>

        {/* Load more */}
        <div className="flex justify-center mt-6">
          {blogsToShow < filteredBlogs.length && (
            <button
              onClick={loadMoreBlogs}
              className="px-4 py-2 bg-primary text-white rounded-md"
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
