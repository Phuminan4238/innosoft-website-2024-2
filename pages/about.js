import React, { useEffect, useState } from "react";
// components
import NavBar from "../components/layout/Navbar"; // Navigation bar component
import Container from "../components/layout/Container"; // Container component for layout
// components/common
import PageTitle from "@/components/common/PageTitle"; // Page title component
// components/specific
import BlogCard from "@/components/specific/Blog"; // Blog card component
import CardMission from "@/components/specific/CardMission"; // Mission card component
// components/layout
import Footer from "@/components/layout/Footer"; // Footer component
// components/specific
import CardMember from "@/components/specific/CardMember"; // Member card component
// components/common
import CardTitle from "@/components/common/CardTitle"; // Title component for cards

export default function About() {
  const servicetitle = "Our Team"; // Define servicetitle here
  const [aboutData, setAboutData] = useState([]);

  // Fetch the about data from the API
  useEffect(() => {
    const fetchAboutData = async () => {
      try {
        const response = await fetch(
          "http://10.35.29.183:1337/api/abouts?populate=uploadfiles.fileupload&populate=mission.uploadfiles"
        );
        const result = await response.json();
        setAboutData(result.data); // Store the data in state
      } catch (error) {
        console.error("Error fetching about data:", error);
      }
    };

    fetchAboutData();
  }, []);

  return (
    <div>
      {/* Navigation bar */}
      <NavBar />
      {/* Page title section */}
      <PageTitle
        pageTitle="Our Story"
        includePrimaryBackground={true}
        pageSubtitle="Learn more about our mission and values."
      />

      {/* Vision Section */}
      {aboutData.map(
        (item) =>
          item.attributes.topic === "Vision" && (
            <div
              key={item.id}
              className="max-w-[85rem] px-0 py-10 lg:py-14 mx-auto"
            >
              <div className="grid sm:grid-cols-2 sm:items-end gap-8">
                {/* Image */}
                <div className="sm:order-2 order-2">
                  <div className="relative h-[300px] sm:h-[400px] md:h-[500px] lg:h-[550px] xl:h-[550px] rounded-lg">
                    <img
                      className="size-full absolute top-0 start-0 object-cover rounded-lg"
                      src={`http://10.35.29.183:1337${item.attributes.uploadfiles?.data[0]?.attributes?.url}`}
                      alt={
                        item.attributes.uploadfiles?.data[0]?.attributes
                          ?.name || "Image Description"
                      }
                    />
                  </div>
                </div>
                {/* Content */}
                <div className="sm:order-1 px-16">
                  <p className="mb-5 inline-flex items-center gap-1.5 py-1.5 px-3 rounded-md text-xs font-medium bg-gray-100 text-gray-800 dark:bg-neutral-800 dark:text-neutral-200">
                    {/* Business insight */}
                  </p>
                  <h2 className="text-2xl font-bold md:text-3xl lg:text-4xl lg:leading-tight xl:text-5xl xl:leading-tight text-gray-800 dark:text-neutral-200">
                    <a
                      href="#"
                      className="hover:text-blue-600 dark:text-neutral-300 dark:hover:text-white"
                    >
                      {item.attributes.topic}
                    </a>
                  </h2>
                  <div>
                    <p className="text-sm md:text-md lg:text-lg">
                      {item.attributes.content_en}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )
      )}

      {/* Vision Section */}
      {aboutData.map(
        (item) =>
          item.attributes.topic === "Mission" && (
            <div
              key={item.id}
              className="max-w-[85rem] px-0 py-10 lg:py-14 mx-auto"
            >
              <div className="grid items-center  gap-8">
                {/* Content */}
                <div className="sm:order-1 px-16 text-center">
                  <p className="mb-5 inline-flex items-center gap-1.5 py-1.5 px-3 rounded-md text-xs font-medium bg-gray-100 text-gray-800 dark:bg-neutral-800 dark:text-neutral-200">
                    {/* Business insight */}
                  </p>
                  <h2 className="text-2xl font-bold md:text-3xl lg:text-4xl lg:leading-tight xl:text-5xl xl:leading-tight text-gray-800 dark:text-neutral-200">
                    <a
                      href="#"
                      className="hover:text-blue-600 dark:text-neutral-300 dark:hover:text-white"
                    >
                      {item.attributes.topic}
                    </a>
                  </h2>
                  <div>
                    <p className="text-sm md:text-md lg:text-lg">
                      {item.attributes.content_en}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )
      )}

      <div className="max-w-[85rem] px-0 py-10 lg:py-14 mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-0 sm:gap-6 px-4">
          {aboutData.map((item) =>
            item.attributes.topic === "Mission"
              ? item.attributes.mission.map((mission) => (
                  <CardMission
                    key={mission.id}
                    category={item.attributes.topic} // Or mission-specific category if available
                    title={mission.header} // Use the mission component's header
                    description={
                      mission.paragraph || item.attributes.content_en
                    } // Use the mission paragraph or fallback to general content
                    // imageUrl={`http://10.35.29.183:1337${mission.uploadfiles?.data[0]?.attributes?.url}`} // Uncomment and use if an image URL is needed
                    // linkUrl={`/mission/${item.id}`}
                    showButton={false} // Adjust based on your project needs
                    isIndex={true} // Assuming you have an isIndex prop
                  />
                ))
              : null
          )}
        </div>
      </div>
      {/* Image section  */}
      {aboutData.map((item) =>
        item.attributes.topic === "Mission" ? (
          <div key={item.id}>
            {/* Image section */}
            <div className="max-w-[1295px] mx-auto py-10 lg:py-14">
              <div className="relative h-[300px] sm:h-[400px] md:h-[500px] lg:h-[550px] xl:h-[550px] rounded-lg overflow-hidden">
                <img
                  className="size-full absolute top-0 start-0 object-cover rounded-lg"
                  src={`http://10.35.29.183:1337${item.attributes.uploadfiles?.data[0]?.attributes?.url}`}
                  alt={
                    item.attributes.uploadfiles?.data[0]?.attributes?.name ||
                    "Image Description"
                  }
                />
              </div>
            </div>
          </div>
        ) : null
      )}

      {/* Container for Team section */}
      <div className="max-w-[1295px] mx-auto py-10 lg:py-14">
        <Container className="px-4 md:px-0">
          {/* Title and subtitle for the Team section */}
          <CardTitle
            title={servicetitle}
            subtitle="Stay in the know with insights from industry experts."
            servicetitle={servicetitle} // Pass servicetitle to CardTitle
          />

          {/* Displaying CardMember component */}
          <CardMember />
        </Container>
      </div>
      {/* Footer component */}
      <Footer />
    </div>
  );
}
