import type { Metadata } from "next";
import { getPostById, getPosts } from "@/lib/mdx-utils";
import SectionHeader from "@/components/section-header";
import { CommentsSection } from "@/components/comments-section";

interface PageProps {
	params: { id: string };
}

export async function generateMetadata({
	params,
}: Readonly<PageProps>): Promise<Metadata> {
	const { meta } = await getPostById(params.id);

	return {
		title: `${meta.title}`,
		description: meta.description,
		openGraph: {
			images: [`/og/blog?title=${meta.title}`],
		},
	};
}

async function Home({ params }: Readonly<PageProps>) {
	const { meta, content } = await getPostById(params.id);
	return (
		<div className="flex flex-col pt-4 gap-16 max-w-7xl mx-auto">
			{/* {meta.draft && (
				<div className="w-full">
					<SectionHeader title="This is a draft" />
				</div>
			)} */}
			<main className="prose mx-auto dark:prose-invert prose-headings:font-medium dark:prose-headings:text-zinc-200 prose-headings:text-zinc-800 prose-sm max-w-5xl prose-h1:text-2xl">
				{content}
			</main>
			<CommentsSection />
		</div>
	);
}

export default Home;

export async function generateStaticParams() {
	const posts = await getPosts();
	return posts.map(({ slug }) => ({
		id: slug,
	}));
}
