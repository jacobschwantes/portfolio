import { NextPageContext, NextComponentType } from "next";
import clsx from "clsx";
import { getProjects } from "@/lib/mdx-utils";
import ProjectCard from "./project-card";

interface ProjectsProps {
	wide?: boolean;
	limit?: number;
	random?: boolean;
	currentProject?: string;
}
const Projects: NextComponentType<NextPageContext, {}, ProjectsProps> = async ({
	wide,
	limit,
	random,
	currentProject,
}) => {
	const projects = await getProjects()
		.then((projects) =>
			random ? projects.sort(() => Math.random() - 0.5) : projects
		)
		.then((projects) =>
			currentProject
				? projects.filter((project) => project.slug !== currentProject)
				: projects.filter((project) => project.meta.draft !== true)
		)
		.catch((err) => {
			console.error(err);
			return [];
		});

	return (
		<div
			className={clsx(
				wide ? "grid-cols-1" : "md:grid-cols-2 grid-cols-1 ",
				"grid sm:gap-4 gap-8"
			)}
		>
			{projects.slice(0, limit ?? projects.length).map((project, i) => (
				<ProjectCard key={project.slug} project={project} />
			))}
		</div>
	);
};
export default Projects;
