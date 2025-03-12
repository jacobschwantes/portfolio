"use client";

import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";

export default function FullScreenImage(
	props: React.ComponentProps<"img"> & { caption?: string; preload?: boolean }
) {
	const [isFullScreen, setIsFullScreen] = useState(false);

	// escape key handler
	useEffect(() => {
		const handleEscape = (e: KeyboardEvent) => {
			if (e.key === "Escape" && isFullScreen) {
				setIsFullScreen(false);
			}
		};

		document.addEventListener("keydown", handleEscape);
		return () => document.removeEventListener("keydown", handleEscape);
	}, [isFullScreen]);

	return (
		<div className="flex flex-col">
			<div
				className={
					isFullScreen
						? "fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75 cursor-zoom-out"
						: "cursor-zoom-in"
				}
				onClick={() => setIsFullScreen(!isFullScreen)}
			>
				<div
					className={cn(
						"bg-zinc-50 dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 p-10 rounded-2xl overflow-hidden w-full aspect-video relative flex items-center justify-center mt-6",
						isFullScreen && "rounded-none p-0 bg-zinc-50/50"
					)}
				>
					<img
						className={
							isFullScreen
								? "max-h-screen max-w-full object-contain"
								: "w-auto rounded-lg object-fit shadow-2xl shadow-zinc-300 max-h-[100%]"
						}
						src={props.src}
						alt={props.alt}
						style={{ pointerEvents: isFullScreen ? "none" : "auto" }}
						{...props}
						loading={props.preload ? "eager" : "lazy"}
					/>
				</div>
				{isFullScreen && (
					<style jsx global>{`
						body {
							overflow: hidden;
						}
					`}</style>
				)}
			</div>
			{props.caption && (
				<p className="text-zinc-500 dark:text-zinc-400 text-sm text-center">
					{props.caption}
				</p>
			)}
		</div>
	);
}
