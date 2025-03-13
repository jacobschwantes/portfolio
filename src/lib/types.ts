import { z } from "zod";

export const postMetaScheme = z.object({
	draft: z.boolean(),
	title: z.string(),
	description: z.string(),
	date: z.number(),
});

export const projectMetaScheme = z.object({
	draft: z.boolean(),
	priority: z.number(), // priority of the project ie. 1 is highest, used to sort projects on the projects page
	name: z.string(),
	description: z.string(), // short description displayed on the narrow project card
	summary: z.string(), // longer summary displayed on the wide project card
	product: z.string(), // product type ie. web application, api, etc
	stack: z.array(z.string()), // tech stack used
	images: z.array(z.string()),
	demo: z.string().optional(), // demo url
	repo: z.string().optional(), // github repo url
	time: z.string().optional(), // year project was built ie. 2024 - present
});

export const metaScheme = z.union([postMetaScheme, projectMetaScheme]);

export type Project = {
	slug: string;
	meta: z.infer<typeof projectMetaScheme>;
	content: React.ReactElement<any, string | React.JSXElementConstructor<any>>;
};

export type Post = {
	slug: string;
	meta: z.infer<typeof postMetaScheme>;
	content: React.ReactElement<any, string | React.JSXElementConstructor<any>>;
};

export type Meta = z.infer<typeof metaScheme>;
