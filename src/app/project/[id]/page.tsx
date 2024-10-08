import { getProjects, getProjectById } from "@/lib/mdx-utils";
import Projects from "@/components/projects";
import Link from "next/link";
import { GitHubLogoIcon, LightningBoltIcon } from "@radix-ui/react-icons";
import SectionHeader from "@/components/section-header";
import type { Metadata } from "next";
interface PageProps {
	params: { id: string };
}

export async function generateMetadata({
	params,
}: Readonly<PageProps>): Promise<Metadata> {
	const { meta } = await getProjectById(params.id);

	return {
		title: `${meta.name} | Jacob Schwantes`,
		description: meta.description,
		openGraph: {
			images: [`/og/projects?id=${meta.name}&description=${meta.description}`],
		},
	};
}

async function Home({ params }: Readonly<PageProps>) {
	const { meta, content, slug } = await getProjectById(params.id);
	const images = meta.images.map(
		(filename: string) => `/images/projects/${slug}/${filename}`
	);

	return (
		<main className="flex flex-col py-8 gap-4 max-w-7xl mx-auto w-full overflow-x-hidden md:overflow-x-visible">
			{meta.draft && (
				<div className="w-full">
					<SectionHeader title="This is a draft" />
				</div>
			)}
			<section className=" flex flex-col md:flex-row space-y-5 md:space-y-0 justify-between items-start">
				<div className="space-y-2">
					<h1 className="md:text-3xl text-2xl  font-medium leading-tight text-zinc-900 dark:text-zinc-200">
						{meta.name}
					</h1>
					<p className=" md:text-lg text-zinc-600 dark:text-zinc-300">
						{meta.description}
					</p>
				</div>
				<div className="flex gap-1">
					{meta.demo && (
						<Link
							target="_blank"
							className="whitespace-pre gap-1.5 dark:text-zinc-300 group flex items-center md:dark:hover:text-zinc-200 transition-all duration-300 text-zinc-700 md:hover:text-zinc-950 py-1.5 px-3 rounded-lg md:group-hover/list:opacity-75 md:hover:bg-zinc-100/50 md:dark:hover:bg-zinc-800/50 md:hover:!opacity-100 "
							href={meta.demo}
						>
							<LightningBoltIcon className="w-4 h-4 dark:group-hover:text-zinc-200 group-hover:text-zinc-950" />
							Website
						</Link>
					)}
					{meta.repo && (
						<Link
							target="_blank"
							className="whitespace-pre gap-1.5 dark:text-zinc-300 group flex items-center md:dark:hover:text-zinc-200 transition-all duration-300 text-zinc-700 md:hover:text-zinc-950 py-1.5 px-3 rounded-lg md:hover:bg-zinc-100/50 md:dark:hover:bg-zinc-800/50 md:hover:!opacity-100 "
							href={meta.repo}
						>
							<GitHubLogoIcon className="  h-4 w-4 dark:group-hover:text-zinc-200 group-hover:text-zinc-950" />
							Code
						</Link>
					)}
				</div>
			</section>
			<section className="prose mx-auto dark:prose-invert prose-headings:font-medium dark:prose-headings:text-zinc-200 prose-headings:text-zinc-800 max-w-5xl">
				{content}
			</section>
			<section className=" border-zinc-200 flex flex-col items-start py-6 pt-8 gap-16 ">
				<div className="flex justify-between items-start w-full">
					<div className="grid grid-cols-2 w-auto flex-shrink gap-x-8 gap-y-1">
						<p className=" font-medium text-zinc-900 dark:text-zinc-300">
							Platform
						</p>
						<p className="text-zinc-600  dark:text-zinc-400">{meta.platform}</p>
						<p className=" font-medium text-zinc-900 dark:text-zinc-300">
							Stack
						</p>
						<p className="text-zinc-600 dark:text-zinc-400 ">{meta.stack}</p>
						{/* <p className=" font-medium text-zinc-900">Tags</p>
            <p className="text-zinc-600 ">{meta.tags}</p> */}
					</div>
				</div>
				<div className="w-full flex flex-col gap-6">
					<SectionHeader
						title="More projects"
						href="/projects"
						buttonLabel="All"
					/>
					<Projects currentProject={slug} random limit={2} />
				</div>
			</section>
		</main>
	);
}
export default Home;

export async function generateStaticParams() {
	const files = await getProjects();
	return files.map((project) => ({
		id: project.slug,
	}));
}
