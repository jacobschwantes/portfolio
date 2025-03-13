import ProjectCard, { ProjectCard2 } from "@/components/project-card";
import { getProjects } from "@/lib/mdx-utils";
import { Metadata } from "next";

export const metadata: Metadata = {
	applicationName: "Jacob Schwantes",
	title: "Jacob Schwantes | Projects",
	description:
		"Showcase of my notable work, exploring challenges and solutions.",
};

export default async function Page() {
	const projects = await getProjects().catch((err) => {
		console.error(err);
		return [];
	});
	return (
		<main className="flex flex-col gap-4">
			{/* <p>
				I love building products that help people. I build web apps, distributed
				systems, and more. These are some of the projects I&apos;m most proud
				of.
			</p> */}
			<h2 className="text-lg font-medium">Projects</h2>
			<div className="grid-cols-1 grid sm:gap-4 gap-8">
				{projects.map((project, i) => (
					<ProjectCard2 key={project.slug} project={project} />
				))}
			</div>
		</main>
	);
}
