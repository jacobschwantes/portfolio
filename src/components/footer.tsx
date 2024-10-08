import Socials from "@/components/social-links";

function Footer() {
	return (
		<footer className="flex justify-between items-center gap-x-3 py-8  dark:text-zinc-300 text-zinc-600 text-sm">
			<div className="">
				&copy; <time>2024</time>
				<span> webdevjake</span>
			</div>
			<Socials />
		</footer>
	);
}

export default Footer;
