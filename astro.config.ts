import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import tailwind from "@astrojs/tailwind";
import sitemap from "@astrojs/sitemap";
import prefetch from "@astrojs/prefetch";
import rehypeExternalLinks from "rehype-external-links";
import svgr from "vite-plugin-svgr";

// https://astro.build/config
import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
	site: "https://itaydafna.dev",
	integrations: [
		mdx({
			extendMarkdownConfig: true,
		}),
		tailwind({
			config: {
				applyBaseStyles: false,
			},
		}),
		// image({
		// 	serviceEntryPoint: "@astrojs/image/sharp",
		// }),
		sitemap(),
		prefetch(),
		react(),
	],
	markdown: {
		rehypePlugins: [
			[
				rehypeExternalLinks,
				{
					target: "_blank",
					rel: "noreferrer",
				},
			],
		],
		shikiConfig: {
			theme: "dracula",
			wrap: true,
		},
	},
	vite: {
		plugins: [svgr()],
		optimizeDeps: {
			exclude: ["@resvg/resvg-js"],
		},
	},
});
