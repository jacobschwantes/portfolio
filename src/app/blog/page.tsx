import PageHeader from "@/components/page-header";
import Posts from "@/components/posts";
import SectionHeader from "@/components/section-header";
import type { Metadata } from "next";

export const metadata: Metadata = {
	applicationName: "Jacob Schwantes",
	title: "Jacob Schwantes | Writing",
	description:
		"Exploring my projects, workflow, and perspectives on technology.",
};

function Page() {
	return (
		<main className="gap-2 flex flex-col">
			{/* <p>
				I write about my projects, workflow, and perspectives on technology.
			</p> */}
			<h2 className="text-lg font-medium">Writing</h2>
			<Posts />
		</main>
	);
}
export default Page;


// Low key mayube we should jsut use the applicaiton logo instead of the name or seomthing