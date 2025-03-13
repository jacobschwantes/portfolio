import Posts from "@/components/posts";
import SectionHeader from "../components/section-header";
import Projects from "@/components/projects";
import Link from "next/link";
import {
	EnvelopeClosedIcon,
	GitHubLogoIcon,
	LinkedInLogoIcon,
} from "@radix-ui/react-icons";

export const metadata = {
	applicationName: "Jacob Schwantes",
	title: "Jacob Schwantes",
	description: "Showcasing my notable work and writings on technology.",
};

const UnderlineLink = ({
	href,
	children,
	external = false,
}: {
	href: string;
	children: React.ReactNode;
	external?: boolean;
}) => (
	<Link
		target={external ? "_blank" : undefined}
		href={href}
		className="border-b-2 border-zinc-200"
	>
		{children}
	</Link>
);

export default async function Page() {
	return (
		<main className="gap-12 flex flex-col">
			<section className="dark:text-zinc-300 flex flex-col gap-3">
				<div className="flex flex-col gap-1.5">
					<p className="dark:text-zinc-300 text-zinc-800">
						Software developer and Computer Science student at the{" "}
						<UnderlineLink href="https://twin-cities.umn.edu/" external>
							University of Minnesota
						</UnderlineLink>
						.
					</p>
					<p className="text-zinc-800 dark:text-zinc-300">
						I&apos;m passionate about creating products that balance technical
						excellence with thoughtful design. Interested in my work?{" "}
						<UnderlineLink href="/projects">
							Check out my projects
						</UnderlineLink>{" "}
						or{" "}
						<UnderlineLink external href="mailto:hey@jacobschwantes.com">
							get in touch
						</UnderlineLink>
						.
					</p>
				</div>
				<div className="flex -ml-3 ">
					<Link
						target="_blank"
						className="whitespace-pre gap-1.5 dark:text-zinc-300 group flex items-center md:dark:hover:text-zinc-200 transition-all duration-300 text-zinc-700 md:hover:text-zinc-950 py-1.5 px-3 rounded-lg md:group-hover/list:opacity-75 md:hover:bg-zinc-100/50 md:dark:hover:bg-zinc-800/50 md:hover:!opacity-100 "
						href="https://www.linkedin.com/in/jacobschwantes/"
					>
						<LinkedInLogoIcon className="w-4 h-4 dark:group-hover:text-zinc-200 group-hover:text-zinc-950" />
						LinkedIn
					</Link>
					<Link
						target="_blank"
						className="whitespace-pre gap-1.5 dark:text-zinc-300 group flex items-center md:dark:hover:text-zinc-200 transition-all duration-300 text-zinc-700 md:hover:text-zinc-950 py-1.5 px-3 rounded-lg md:group-hover/list:opacity-75 md:hover:bg-zinc-100/50 md:dark:hover:bg-zinc-800/50 md:hover:!opacity-100 "
						href="https://github.com/jacobschwantes"
					>
						<GitHubLogoIcon className="w-4 h-4 dark:group-hover:text-zinc-200 group-hover:text-zinc-950" />
						GitHub
					</Link>
					<Link
						target="_blank"
						className="whitespace-pre gap-1.5 dark:text-zinc-300 group flex items-center md:dark:hover:text-zinc-200 transition-all duration-300 text-zinc-700 md:hover:text-zinc-950 py-1.5 px-3 rounded-lg md:group-hover/list:opacity-75 md:hover:bg-zinc-100/50 md:dark:hover:bg-zinc-800/50 md:hover:!opacity-100 "
						href="mailto:hey@jacobschwantes.com"
					>
						<EnvelopeClosedIcon className="w-4 h-4 dark:group-hover:text-zinc-200 group-hover:text-zinc-950" />
						Email
					</Link>
				</div>
			</section>

			<section className="gap-4 flex flex-col pb-2">
				<SectionHeader
					title="Projects"
					buttonLabel="View more"
					href="/projects"
				/>
				<Projects limit={2} />
			</section>

			{/* <section className="gap-1 flex flex-col">
				<SectionHeader title="Writing" href="/blog" buttonLabel="View more" />
				<Posts />
			</section> */}
		</main>
	);
}
