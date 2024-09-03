import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import NavBar from "@/components/layout/Navbar";
import PageTitle from "@/components/common/PageTitle";
import Container from "@/components/layout/Container";
import ServiceCard from "@/components/specific/ServiceCard";
import services from "@/pages/api/service"; // Import the services array
import Footer from "@/components/layout/Footer";

const ServicePage = () => {
  const router = useRouter();

  useEffect(() => {
    if (router.query.scrollTo) {
      const element = document.getElementById(router.query.scrollTo);
      console.log("Scroll to element:", element); // Add this line to debug
      if (element) {
        const yOffset = -80; // Adjust the offset as needed
        const y =
          element.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: "smooth" });
      }
    }
  }, [router.query.scrollTo]);

  const [services, setServices] = useState([]);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch(
          "http://10.35.29.183:1337/api/services?populate=uploadfiles.fileupload"
        );
        const data = await response.json();
        const formattedServices = data.data.map((service) => ({
          id: service.id,
          topic: service.attributes.topic,
          category: service.attributes.category,
          content_en: service.attributes.content_en,
          imageUrl: service.attributes.uploadfiles?.data?.attributes?.url
            ? `http://10.35.29.183:1337${service.attributes.uploadfiles.data.attributes.url}`
            : null, // Handle cases where the image is not available
        }));
        setServices(formattedServices);
      } catch (error) {
        console.error("Error fetching services:", error);
      }
    };

    fetchServices();
  }, []);

  return (
    <div>
      <NavBar /> {/* Render the navigation bar */}
      <PageTitle
        pageTitle="Our Services"
        includePrimaryBackground={true}
        pageSubtitle="Learn more about our mission and values."
      />
      <Container>
        <ServiceCard services={services} />{" "}
        {/* Render the ServiceCard component with services data */}
      </Container>
      <Footer /> {/* Render the footer */}
    </div>
  );
};

export default ServicePage;
