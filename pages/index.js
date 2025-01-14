import { useState } from "react";
import NavBar from "../components/layout/Navbar";
import Container from "../components/layout/Container";
import CardProject from "../components/specific/CardProject";
import Hero from "@/components/specific/Hero";
import CardTitle from "@/components/common/CardTitle";
import Slider from "@/components/specific/Slider";
import PageTitle from "@/components/common/PageTitle";
import Footer from "@/components/layout/Footer";
import Client from "@/components/specific/Client";
import Contact from "@/components/specific/Contact";
import Button from "@/components/common/Button";
import CardBlog from "../components/specific/CardBlog";
import Link from "next/link";

// Fetch data from the API
export async function getServerSideProps() {
  try {
    const [projectsRes, blogsRes] = await Promise.all([
      fetch(
        "https://innosoft.kmutt.ac.th/api/projects?populate=uploadfiles.data"
      ),
      fetch(
        "https://innosoft.kmutt.ac.th/api/blogs?populate=uploadfiles.fileupload"
      ),
    ]);

    const [projectsData, blogsData] = await Promise.all([
      projectsRes.json(),
      blogsRes.json(),
    ]);

    return {
      props: {
        projectsData: projectsData.data || [], // Default to empty array if data is undefined
        blogsData: blogsData.data || [], // Default to empty array if data is undefined
      },
    };
  } catch (error) {
    console.error("Error fetching data:", error);
    return {
      props: {
        projectsData: [], // Default to empty array on error
        blogsData: [], // Default to empty array on error
      },
    };
  }
}

export default function Home({ projectsData = [], blogsData = [] }) {
  const [blogsToShow, setBlogsToShow] = useState(6); // State to track number of blogs to show

  // Function to load more blogs
  const loadMoreBlogs = () => {
    setBlogsToShow((prev) => prev + 6); // Increase the count of blogs to show by 6
  };

  // Sort projects by publishedAt date in descending order and slice to get the latest 3
  const latestProjects = projectsData
    .sort(
      (a, b) =>
        new Date(b.attributes.publishedAt) - new Date(a.attributes.publishedAt)
    )
    .slice(0, 3);

  // Slice blogs to show based on the blogsToShow state
  const visibleBlogs = blogsData.slice(0, blogsToShow);

  return (
    <div>
      {/* Navigation Bar */}
      <NavBar />
      {/* Hero Section */}
      <Hero />
      {/* Client Section */}
      <div className="md:py-6"></div>
      <Client />
      <div className="py-6"></div>
      {/* Slider Section */}
      <Slider />
      <div className="py-6"></div>
      {/* Projects Section */}
      <Container className="px-4 md:px-0">
        <CardTitle
          title="Our Projects"
          subtitle="Stay in the know with insights from industry experts."
          servicetitle="Our Projects"
          link="/project" // Ensure this is a valid string
        />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 pt-4">
          {latestProjects.length > 0 ? (
            latestProjects.map((project) => {
              // Safeguard for undefined attributes
              const attributes = project?.attributes || {};
              const uploadfiles = attributes.uploadfiles?.data || [];
              const imageUrl =
                uploadfiles.length > 0 && uploadfiles[0]?.attributes?.url
                  ? `https://innosoft.kmutt.ac.th${uploadfiles[0].attributes.url}` // Correctly formatted URL
                  : "/public/img/default-image.jpg"; // Fallback image if no URL is found

              return (
                <CardProject
                  key={project.id}
                  category={project.attributes.category}
                  tag={project.attributes.tag}
                  tag2={project.attributes.tag2}
                  title={project.attributes.name}
                  description={project.attributes.description}
                  imageUrl={`https://innosoft.kmutt.ac.th${project.attributes.uploadfiles.data.attributes.url}`}
                  linkUrl={`/project/${project.id}`} // Dynamically generate link URL based on project ID
                  showButton={true}
                  isIndex={false}
                />
              );
            })
          ) : (
            <p>No projects available.</p>
          )}
        </div>
      </Container>

      {/* Blogs Section */}
      <Container className="px-4 md:px-0">
        <PageTitle
          pageTitle="Discover our blogs"
          includePrimaryBackground={false}
          pageSubtitle="A peep at some distant orb has power to raise and purify our thoughts like a strain of sacred music, or a noble picture, or a passage from the grander poets."
        />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {visibleBlogs.length > 0 ? (
            visibleBlogs.map((blog) => {
              const attributes = blog.attributes || {};
              const imageUrl = attributes.uploadfiles?.fileupload?.data?.[0]
                ?.attributes?.url
                ? `https://innosoft.kmutt.ac.th${attributes.uploadfiles.fileupload.data[0].attributes.url}`
                : "/public/img/default-image.jpg"; // Fallback image if no URL is found

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
                />
              );
            })
          ) : (
            <p>No blogs available.</p>
          )}
        </div>
        <div className="flex justify-center mt-8">
          <Link href="/blog" passHref>
            <button className="text-white text-xs sm:text-sm md:text-subtitle flex justify-center items-center gap-1 px-3 py-2 rounded-md border bg-primary border-primary hover:underline transition">
              Explore More
            </button>
          </Link>
        </div>
      </Container>

      {/* Contact Section */}
      <Container className="py-10 px-4 md:px-0">
        <Contact
          title="Just Connect With Us!"
          subtitle="Stay in the know with insights from industry experts"
        />
      </Container>
      {/* Footer Section */}
      <Footer />
    </div>
  );
}
