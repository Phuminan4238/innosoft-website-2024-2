import React from "react";
// Components
import NavBar from "../components/layout/Navbar";
import PageTitle from "@/components/common/PageTitle";
import Container from "../components/layout/Container";
import Footer from "@/components/layout/Footer";
import TeamTitle from "@/components/common/TeamTitle";
import CardMember from "@/components/specific/CardMember";

export default function Teams() {
  return (
    <div>
      <NavBar />
      <PageTitle
        pageTitle="Meet our team"
        includePrimaryBackground={true}
        pageSubtitle="Learn more about our mission and values."
      />
      <Container>
        {/* Staff Section */}

        <CardMember category="staff" />

        {/* Partner Section */}
        <TeamTitle
          title="Our Partners"
          subtitle="Collaborating with industry leaders."
        />
        <CardMember category="partner" />
      </Container>
      <Footer />
    </div>
  );
}
