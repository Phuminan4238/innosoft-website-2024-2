// pages/index.js
import { useMemo } from "react";
import NavBar from "../components/layout/Navbar";
import Container from "../components/layout/Container";
import Hero from "@/components/specific/Hero";
import Client from "@/components/specific/Client";
import HomeServices from "@/components/specific/HomeServices";
import HomeProjects from "@/components/specific/HomeProjects";
import HomeBlogs from "@/components/specific/HomeBlogs";
import Footer from "@/components/layout/Footer";
import Contact from "@/components/specific/Contact";

export async function getServerSideProps() {
  try {
    const [projectsRes, blogsRes] = await Promise.all([
      fetch(
        "https://innosoft.kmutt.ac.th/api/projects?populate=uploadfiles.data&sort=publishedAt:desc"
      ),
      fetch(
        "https://innosoft.kmutt.ac.th/api/blogs?populate=uploadfiles.fileupload&sort=publishedAt:desc"
      ),
    ]);

    const [projectsData, blogsData] = await Promise.all([
      projectsRes.json(),
      blogsRes.json(),
    ]);

    return {
      props: {
        projectsData: projectsData?.data || [],
        blogsData: blogsData?.data || [],
      },
    };
  } catch (err) {
    console.error("Error fetching home data:", err);
    return {
      props: {
        projectsData: [],
        blogsData: [],
      },
    };
  }
}

export default function Home({ projectsData = [], blogsData = [] }) {
  // เอาอันที่ดึงมา “อย่างเดียว” ไม่แตะ fetch
  const latestProjects = useMemo(() => projectsData.slice(0, 5), [projectsData]);
  const latestBlogs = useMemo(() => blogsData.slice(0, 6), [blogsData]);

  return (
    <div className="min-h-screen bg-white">
      <NavBar />
      <Hero />

      {/* PARTNERS */}
      <section className="md:py-10">
        <Container>
          <Client />
        </Container>
      </section>

      {/* OUR SERVICES */}
      <section className="py-10">
        <Container>
          <HomeServices />
        </Container>
      </section>

      {/* OUR PROJECTS */}
      <section className="py-10">
        <Container>
          <HomeProjects projects={latestProjects} />
        </Container>
      </section>

      {/* DISCOVER OUR BLOGS */}
      <section className="py-10 bg-[#F6F7FA]">
        <Container>
          <HomeBlogs blogs={latestBlogs} />
        </Container>
      </section>

      {/* CONTACT */}
      <section className="py-10" id="contact">
        <Container>
          <Contact
            title="Need to start a project with us?"
            subtitle="กรอกข้อมูลติดต่อไว้ แล้วทีมเราจะติดต่อกลับภายใน 1 วันทำการ"
          />
        </Container>
      </section>

      <Footer />
    </div>
  );
}
