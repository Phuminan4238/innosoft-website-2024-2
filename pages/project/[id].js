// pages/project/[id].js
import { useRouter } from "next/router";
import NavBar from "../../components/layout/Navbar";
import PageTitle from "@/components/common/PageTitle";
import projects from "../api/projects"; // Import your projects array
import Container from "@/components/layout/Container";

export default function ProjectDetail() {
  const router = useRouter();
  const { id } = router.query;

  // Find the project by its ID
  const project = projects.find((project) => project.id === Number(id));

  if (!project) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <NavBar />
      <PageTitle
        pageTitle={`${project.title} (${project.id})`}
        includePrimaryBackground={false}
        pageSubtitle={`${project.category} - ${project.description}`}
      />
      <Container>
        <img
          src={project.imageUrl}
          // alt={service.title}
          className="w-full h-[560px] mt-4 rounded-lg object-contain"
        />
      </Container>
      <Container className="pt-10">
        <p>{project.content}</p>
      </Container>
      {/* <div className="p-4 sm:p-6 lg:px-0 lg:py-4">
        <h2 className="text-h2 font-bold">{project.title}</h2>
        <p className="text-body">{project.category}</p>
        <p className="text-body">{project.description}</p>
        <p className="text-body">Project ID: {project.id}</p>
      </div> */}
      <Container className="pb-20"></Container>
    </div>
  );
}
