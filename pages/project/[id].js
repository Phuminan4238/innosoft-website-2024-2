import { useRouter } from "next/router";
import NavBar from "../../components/layout/Navbar";
import PageTitle from "@/components/common/PageTitle";
import Container from "@/components/layout/Container";

// Fetch project details on the server side
export async function getServerSideProps(context) {
  const { id } = context.params;

  try {
    const res = await fetch(
      `https://202.44.12.87:1337/api/projects/${id}?populate=uploadfiles.data`
    );
    if (!res.ok) {
      throw new Error("Failed to fetch project");
    }
    const data = await res.json();
    const project = data.data;

    // Ensure the project data is in the expected format
    if (!project) {
      return {
        notFound: true, // Show 404 page if project is not found
      };
    }

    return {
      props: {
        project,
      },
    };
  } catch (error) {
    console.error("Error fetching project:", error);
    return {
      notFound: true, // Show 404 page if there is an error
    };
  }
}

export default function ProjectDetail({ project }) {
  const router = useRouter();

  if (!project) {
    return <p>Loading...</p>; // Show loading state if project is not yet loaded
  }

  return (
    <div>
      <NavBar />
      <PageTitle
        pageTitle={`${project.attributes.name}`}
        includePrimaryBackground={false}
        pageSubtitle={`${project.attributes.category} - ${project.attributes.description}`}
      />
      <Container>
        <img
          src={`https://202.44.12.87:1337${project.attributes.uploadfiles.data.attributes.url}`}
          alt={project.attributes.name}
          className="w-full h-[560px] mt-4 rounded-lg object-contain"
        />
      </Container>
      <Container className="pt-10 text-center">
        <p className="px-6">
          {project.attributes.content || "No content available"}
        </p>
      </Container>
      <Container className="pb-20"></Container>
    </div>
  );
}
