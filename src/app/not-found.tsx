import CustomLink from "@/components/ui/link";

export default function NotFound() {
	return (
		<main className="mx-auto flex w-full max-w-7xl flex-auto flex-col justify-center items-center py-12">
			<h1 className="mt-4 text-3xl font-semibold tracking-tight dark:text-zinc-200 text-zinc-900">
				Page not found
			</h1>
			<p className="dark:text-zinc-400 text-zinc-800 mt-2">
				Sorry, we couldn’t find the page you’re looking for.
			</p>
			<div className="mt-4">
				<CustomLink href="/" label="Return to home" reverse />
			</div>
		</main>
	);
}
