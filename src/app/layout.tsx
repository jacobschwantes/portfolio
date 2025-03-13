import Header from "@/components/header";
import "./globals.css";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import clsx from "clsx";
import { Metadata } from "next";
import { CommentsSection } from "@/components/comments-section";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	openGraph: {
		siteName: "Jacob Schwantes",
	},
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<body
				className={clsx(
					"max-w-3xl mx-auto dark:bg-zinc-900 md:px-0 relative flex flex-col pb-12",
					inter.className
				)}
			>
				<div className="px-4 md:px-0">
					<Header />
					{children}
				</div>
				<Analytics />
				<SpeedInsights />
			</body>
		</html>
	);
}
