import { Project } from "@/lib/types";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

export default function ProjectCard({ project }: { project: Project }) {
	return (
		<Link key={project.slug} href={`/project/${project.slug}`}>
			<div className=" bg-zinc-50 dark:bg-zinc-900 rounded-2xl group flex flex-col overflow-hidden w-full aspect-[4/3] relative border border-zinc-100 dark:border-zinc-800">
				<div className=" relative flex-1 md:group-hover:scale-[1.03] ease-out transition-all duration-500 mb-12 ">
					<Image
						priority
						fill
						alt={`preview image of ${project.meta.name} project`}
						className="object-cover h-full w-full  md:group-hover:saturate-125 md:group-hover:brightness-100 md:brightness-[99%] transitional duration-300 ease-out"
						src={`/images/projects/${project.slug}/preview.png`}
					/>
					<div className="bg-zinc-100 dark:bg-zinc-800/30  h-10 absolute blur-xl bottom-0 w-full" />
				</div>
				<div className="flex flex-col p-4 absolute bottom-0 w-full  ">
					<h3 className="relative z-10 text-zinc-800 dark:text-zinc-200">
						{project.meta.name}
					</h3>
					<p className="text-sm text-zinc-600 dark:text-zinc-300 relative z-10">
						{project.meta.description}
					</p>
					<div className="bg-zinc-100 dark:bg-zinc-800/30 inset-0 absolute blur-xl"></div>
				</div>
			</div>
		</Link>
	);
}

export function ProjectCard2({ project }: { project: Project }) {
	return (
		<Link key={project.slug} href={`/project/${project.slug}`}>
			<div className=" bg-white dark:bg-zinc-900 rounded-2xl group flex overflow-hidden w-full relative border border-zinc-100 dark:border-zinc-800 h-44 justify-between ">
				<div className="absolute top-4 right-4">
					<ArrowUpRight className="h-4 w-4 text-zinc-500 dark:text-zinc-300" />
				</div>

				<div className="aspect-[4.5/3] h-full bg-zinc-50">
					<div className="relative md:group-hover:scale-[1.02] ease-out transition-all duration-500 h-full w-full">
						<Image
							priority
							fill
							alt={`preview image of ${project.meta.name} project`}
							className="object-cover h-full w-full  md:group-hover:saturate-125 md:group-hover:brightness-100 md:brightness-[99%] transition-all duration-300 ease-out"
							src={`/images/projects/${project.slug}/preview.png`}
						/>
						<div className="bg-zinc-100 dark:bg-zinc-800/30  h-10 absolute blur-xl bottom-0 w-full" />
					</div>
				</div>
				{/* <div className="h-full bg-gradient-to-r from-zinc-50 to-white">

				</div> */}
				<div className="flex flex-col px-5 py-4 w-full pr-16  ">
					<h3 className="relative z-10 text-zinc-800 dark:text-zinc-200 font-normal">
						{project.meta.name}
					</h3>
					{/* <p className="text-sm text-zinc-500 dark:text-zinc-300 relative z-10 leading-none">
						{project.meta.product}
					</p> */}
					<p className="text-sm text-zinc-600 dark:text-zinc-300 relative z-10 py-3">
						{project.meta.summary}
					</p>
					<p className="text-sm text-zinc-500 dark:text-zinc-300 relative z-10 mt-auto">
						{project.meta.time}
					</p>
				</div>
			</div>
		</Link>
	);
}
