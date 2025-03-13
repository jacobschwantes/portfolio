interface PageHeaderProps {
	title: string;
	children?: React.ReactNode;
}
function PageHeader({ title, children }: PageHeaderProps) {
	return (
		<header className="dark:text-zinc-300 flex flex-col gap-3">
			<h2 className="dark:text-zinc-200 text-zinc-900 font-medium text-xl">
				{title}
			</h2>
			<div className="dark:text-zinc-300 text-zinc-800">{children}</div>
		</header>
	);
}

export default PageHeader;
