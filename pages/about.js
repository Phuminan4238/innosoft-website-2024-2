import React from "react";
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

// API data
import missions from "./api/mission"; // Import missions data from the API

// Functional component for the About page
export default function About() {
  const servicetitle = "Our Team"; // Define servicetitle here

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

      {/* Displaying a BlogCard component */}
      <BlogCard />

      {/* Container for Missions section */}
      <Container>
        <PageTitle
          pageTitle="Missions"
          includePrimaryBackground={false}
          pageSubtitle="A peep at some distant orb has power to raise and purify our thoughts like a strain of sacred music, or a noble picture, or a passage from the grander poets."
        />

        {/* Grid layout for displaying missions */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4">
          {/* Mapping over missions data and rendering CardMission components */}
          {missions.map((mission) => (
            <CardMission
              key={mission.id}
              category={mission.category}
              title={mission.title}
              description={mission.description}
              imageUrl={mission.imageUrl}
              linkUrl={`/mission/${mission.id}`}
              showButton={false} // Adjust based on your project needs
              isIndex={true} // Assuming you have an isIndex prop
            />
          ))}
        </div>
      </Container>

      {/* Image section */}
      <div className="max-w-[1295px] mx-auto py-10 lg:py-14">
        <div className="relative h-[642px] sm:h-[400px] md:h-[500px] lg:h-[550px] xl:h-[642px] rounded-lg overflow-hidden">
          <img
            className="absolute top-0 left-0 w-full h-full object-cover rounded-lg"
            src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fG1lZXRpbmd8ZW58MHx8MHx8fDA%3D"
            alt="Image Description"
          />
        </div>
      </div>

      {/* Container for Team section */}
      <Container>
        {/* Title and subtitle for the Team section */}
        <CardTitle
          title={servicetitle}
          subtitle="Stay in the know with insights from industry experts."
          servicetitle={servicetitle} // Pass servicetitle to CardTitle
        />

        {/* Displaying CardMember component */}
        <CardMember />
      </Container>

      {/* Footer component */}
      <Footer />
    </div>
  );
}
