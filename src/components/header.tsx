"use client";
import { Button } from "@/components/ui/button";
import {
	Sheet,
	SheetClose,
	SheetContent,
	SheetDescription,
	SheetFooter,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "@/components/ui/sheet";
import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import * as React from "react";

const routes = [
	{
		name: "Home",
		path: "/",
	},
	{
		name: "Projects",
		path: "/projects",
	},
	{
		name: "Writing",
		path: "/blog",
	},
];

function Header() {
	const pathname = usePathname();

	return (
		<header className="sm:py-8 py-6 flex justify-between items-center">
			<Link
				href="/"
				className="dark:text-zinc-200 text-zinc-800 text-lg font-medium "
			>
				Jacob Schwantes
			</Link>
			<nav className="md:flex hidden">
				<ul className="flex gap-5 items-center">
					{routes.map((item) => (
						<li className="flex items-center group" key={item.name}>
							<Link
								className={clsx(
									"dark:hover:text-zinc-200 transition-colors duration-300",
									(pathname === "/" && item.path === "/") ||
										(pathname.includes(item.path) && item.path != "/")
										? "dark:text-zinc-100 text-zinc-900"
										: "dark:text-zinc-400 text-zinc-700 hover:text-zinc-900"
								)}
								href={item.path}
							>
								{item.name}
							</Link>
						</li>
					))}
				</ul>
			</nav>
			<nav className="md:hidden">
				<DropdownMenuNavigation active={pathname} />
			</nav>
		</header>
	);
}

export default Header;

export function DropdownMenuNavigation({ active }: { active: string }) {
	const [open, setOpen] = React.useState(false);
	return (
		<Sheet open={open} onOpenChange={setOpen}>
			<SheetTrigger asChild>
				<Button variant="outline">
					<HamburgerMenuIcon aria-label="Navigation Menu" className="" />
					<span className="sr-only">Navigation Menu</span>
				</Button>
			</SheetTrigger>
			<SheetContent>
				<SheetHeader>
					<SheetTitle className="text-left">Navigation</SheetTitle>
				</SheetHeader>
				<div className="grid gap-4 py-4">
					{routes.map(({ name, path }) => (
						<Link key={name} href={path} onClick={() => setOpen(false)}>
							<Button
								variant={active === path ? "default" : "outline"}
								className="w-full"
							>
								{name}
							</Button>
						</Link>
					))}
				</div>
				<SheetFooter></SheetFooter>
			</SheetContent>
		</Sheet>
	);
}
