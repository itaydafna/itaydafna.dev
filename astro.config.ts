import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import sitemap from "@astrojs/sitemap";
import prefetch from "@astrojs/prefetch";
import image from "@astrojs/image";
import rehypeExternalLinks from "rehype-external-links";
import svgr from "vite-plugin-svgr";
import partytown from "@astrojs/partytown";
import react from "@astrojs/react";

export default defineConfig({
	site: "https://itaydafna.dev",
	integrations: [
		partytown({
			// Adds dataLayer.push as a forwarding-event.
			config: {
				forward: ["dataLayer.push"],
			},
		}),
		tailwind({
			config: {
				applyBaseStyles: false,
			},
		}),
		image({
			serviceEntryPoint: "@astrojs/image/sharp",
		}),
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
