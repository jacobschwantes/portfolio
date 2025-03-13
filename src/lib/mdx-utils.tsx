import fs from "fs";
import path from "path";
import { Meta, Project, Post } from "./types";
import { compileMDX } from "next-mdx-remote/rsc";
import rehypePrettyCode from "rehype-pretty-code";
import { CopyCodeButton } from "@/components/copy-code-button";

const PROJECTS_FILE_PATH = "src/content/projects";
const BLOGS_FILE_PATH = "src/content/blog";

import { visit } from "unist-util-visit";
import FullScreenImage from "@/components/mdx/image";
import { cn } from "./utils";

const loadMDXFiles = async (directoryPath: string) => {
	try {
		const filenames = fs.readdirSync(path.join(directoryPath));
		const mdxFiles = await Promise.all(
			filenames.map((filename) => parseMDXFile(filename, directoryPath))
		);
		return mdxFiles;
	} catch (e) {
		console.log(e);
	}
};

const parseMDXFile = async (filename: string, directory: string) => {
	const mdxComponents = {
		pre: (props: React.HTMLProps<HTMLPreElement>) => {
			// @ts-expect-error
			const code = props.raw;
			// @ts-expect-error
			const filename = JSON.parse(props.meta ?? "{}").filename;
			return (
				<div className="relative flex flex-col">
					<div
						className={cn(
							"flex absolute  justify-between  items-center ",
							filename
								? "bg-zinc-100 border border-zinc-200 rounded-t-2xl top-0 left-0 right-0 px-2 py-1 w-full"
								: "p-3 top-0 right-0"
						)}
					>
						{filename && (
							<span className="text-zinc-500 text-sm block px-1">
								{filename}
							</span>
						)}
						<CopyCodeButton code={code} />
					</div>
					<pre className={cn("not-prose", filename && "pt-10")} {...props} />
				</div>
			);
		},
		Image: FullScreenImage,
	};

	try {
		const markdownFile = fs.readFileSync(
			path.join(directory, filename),
			"utf-8"
		);
		const { content, frontmatter } = await compileMDX<Meta>({
			source: markdownFile,
			options: {
				rsc: true,
				mdxOptions: {
					rehypePlugins: [
						() => (tree) => {
							visit(tree, (node) => {
								if (node?.type === "element" && node?.tagName === "pre") {
									const [codeEl] = node.children;

									if (codeEl.tagName !== "code") return;

									const meta = codeEl?.data?.meta;

									if (meta) {
										type CodeBlockMeta = {
											filename?: string;
											format?: string;
										};
										const output: CodeBlockMeta = {};
										meta.split(" ").forEach((item: string) => {
											const [key, value] = item.split("=");
											output[key as keyof CodeBlockMeta] = value;
										});

										if (output.filename) {
											node.properties = node.properties || {};
											node.properties.filename = output.filename;
										}

										node.meta = JSON.stringify(output);
									}

									node.raw = codeEl.children?.[0].value;
								}
							});
						},
						[
							// @ts-expect-error
							rehypePrettyCode,
							{
								// theme: {
								// 	dark: "material-theme-darker",
								// 	light: "github-light",
								// },
								theme: "github-light",
							},
						],
						() => (tree) => {
							visit(tree, (node) => {
								if (!node.children) return;

								for (const child of node.children) {
									if (child.tagName === "pre") {
										child.properties["raw"] = node.raw;
										child.properties["meta"] = node.meta;
									}
								}
							});
						},
					],
				},
				parseFrontmatter: true,
			},
			components: mdxComponents,
		});

		return {
			meta: frontmatter,
			slug: filename.replace(/\.mdx$/, ""),
			content,
		};
	} catch (e) {
		throw new Error(`Failed to parse MDX File: ${filename}: ${e}`);
	}
};

export const getProjects = async (): Promise<Project[]> => {
	const files = (await loadMDXFiles(PROJECTS_FILE_PATH)) as Project[];
	return files
		.filter(
			(project) => process.env.NODE_ENV == "development" || !project.meta.draft
		)
		.sort((a, b) => a.meta.priority - b.meta.priority);
};

export const getPosts = async (): Promise<Post[]> => {
	const files = (await loadMDXFiles(BLOGS_FILE_PATH)) as Post[];
	return files
		.filter(
			(post) => process.env.NODE_ENV === "development" || !post.meta.draft
		)
		.sort((a, b) => b.meta.date - a.meta.date);
};

export const getProjectById = async (id: string): Promise<Project> =>
	(await parseMDXFile(`${id}.mdx`, PROJECTS_FILE_PATH)) as Project;

export const getPostById = async (id: string): Promise<Post> =>
	(await parseMDXFile(`${id}.mdx`, BLOGS_FILE_PATH)) as Post;
