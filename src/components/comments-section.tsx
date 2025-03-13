"use client";
import Giscus from "@giscus/react";
export function CommentsSection() {
	return (
		<Giscus
			id="comments"
			repo="jacobschwantes/portfolio"
			repoId="R_kgDOJy30LQ"
			category="Announcements"
			categoryId="DIC_kwDOJy30Lc4CnmXK"
			mapping="og:title"
			strict="0"
			reactionsEnabled="1"
			emitMetadata="0"
			inputPosition="bottom"
			theme="light"
			lang="en"
		/>
	);
}
