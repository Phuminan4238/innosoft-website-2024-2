import React from "react";
// components
import NavBar from "../components/layout/Navbar"; // Navigation bar component
import PageTitle from "@/components/common/PageTitle"; // Page title component
import Team from "@/components/specific/Member"; // Team component
import Container from "../components/layout/Container"; // Container component for layout
import Footer from "@/components/layout/Footer"; // Footer component
import CardTitle from "@/components/common/CardTitle"; // Title component for cards
import CardMember from "@/components/specific/CardMember"; // Member card component

export default function Teams() {
  const servicetitle = "Our Team"; // Define servicetitle
  const servicesubtitle =
    "Stay in the know with insights from industry experts."; // Define servicesubtitle

  return (
    <div>
      <NavBar /> {/* Render the navigation bar */}
      <PageTitle
        pageTitle="Meet our team"
        includePrimaryBackground={true}
        pageSubtitle="Learn more about our mission and values."
      />
      <Container>
        <Team /> {/* Render the Team component */}
        {/* Render CardTitle component for team section */}
        <CardTitle title={servicetitle} subtitle={servicesubtitle} />
        <CardMember /> {/* Render CardMember component */}
        {/* Render another CardTitle component for team section */}
        <CardTitle title={servicetitle} subtitle={servicesubtitle} />
        <CardMember /> {/* Render another CardMember component */}
      </Container>
      <Footer /> {/* Render the footer */}
    </div>
  );
}
