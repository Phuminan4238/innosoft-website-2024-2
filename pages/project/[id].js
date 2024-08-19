// pages/project/[id].js
import { useRouter } from "next/router";
import NavBar from "../../components/layout/Navbar";
import PageTitle from "@/components/common/PageTitle";
import projects from "../api/projects"; // Import your projects array

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
      {/* <div className="p-4 sm:p-6 lg:px-0 lg:py-4">
        <h2 className="text-h2 font-bold">{project.title}</h2>
        <p className="text-body">{project.category}</p>
        <p className="text-body">{project.description}</p>
        <p className="text-body">Project ID: {project.id}</p>
      </div> */}
    </div>
  );
}
