import type { APIContext, GetStaticPathsResult } from "astro";
import { getCollection, getEntryBySlug } from "astro:content";
import satori, { SatoriOptions } from "satori";
import { html } from "satori-html";
import { Resvg } from "@resvg/resvg-js";
import siteConfig from "@/site-config";
import { getFormattedDate } from "@/utils";

const monoFontReg = await fetch(
	"https://api.fontsource.org/v1/fonts/roboto-mono/latin-400-normal.ttf"
);

const monoFontBold = await fetch(
	"https://api.fontsource.org/v1/fonts/roboto-mono/latin-700-normal.ttf"
);

const ogOptions: SatoriOptions = {
	width: 1200,
	height: 630,
	// debug: true,
	embedFont: true,
	fonts: [
		{
			name: "Roboto Mono",
			data: await monoFontReg.arrayBuffer(),
			weight: 400,
			style: "normal",
		},
		{
			name: "Roboto Mono",
			data: await monoFontBold.arrayBuffer(),
			weight: 700,
			style: "normal",
		},
	],
};

const markup = (title: string, pubDate: string) => html`<div
	tw="flex flex-col w-full h-full bg-[#1d1f21] text-[#c9cacc]"
>
	<div tw="flex flex-col flex-1 w-full p-10 justify-center">
		<p tw="text-2xl mb-6">${pubDate}</p>
		<h1 tw="text-6xl font-bold leading-snug text-white">${title}</h1>
	</div>
	<div tw="flex items-center justify-between w-full p-10 border-t border-[#2bbc89] text-xl">
		<div tw="flex items-center">
			<svg
				height="800px"
				width="800px"
				version="1.1"
				id="Layer_1"
				xmlns="http://www.w3.org/2000/svg"
				xmlns:xlink="http://www.w3.org/1999/xlink"
				viewBox="0 0 511.883 511.883"
				xml:space="preserve"
			>
				<polygon
					style="fill:#CCD1D9;"
					points="341.251,479.885 170.618,479.885 191.894,373.316 319.942,373.285 "
				/>
				<g>
					<path
						style="fill:#E6E9ED;"
						d="M511.883,383.909c0,5.905-4.781,10.653-10.67,10.653H10.654C4.78,394.561,0,389.814,0,383.908
		   V42.651c0-5.889,4.78-10.653,10.654-10.653h490.559c5.889,0,10.67,4.764,10.67,10.653V383.909z"
					/>
					<path
						style="fill:#E6E9ED;"
						d="M341.251,479.885H170.618c-5.874,0-10.654-4.779-10.654-10.653c0-5.905,4.78-10.686,10.654-10.686
		   h170.633c5.889,0,10.669,4.78,10.669,10.686C351.92,475.107,347.139,479.885,341.251,479.885z"
					/>
				</g>
				<path
					style="fill:#656D78;"
					d="M501.213,31.998H10.654C4.78,31.998,0,36.762,0,42.651v287.926h511.883V42.651
	   C511.883,36.762,507.102,31.998,501.213,31.998z"
				/>
				<path
					style="fill:#434A54;"
					d="M266.595,362.569c0,5.905-4.765,10.685-10.654,10.685c-5.889,0-10.669-4.779-10.669-10.685
	   c0-5.874,4.78-10.653,10.669-10.653C261.83,351.916,266.595,356.695,266.595,362.569z"
				/>
				<path
					style="fill:#FC6E51;"
					d="M373.243,74.644H53.317c-5.89,0-10.669,4.78-10.669,10.669c0,5.89,4.78,10.67,10.669,10.67h319.926
	   c5.889,0,10.67-4.78,10.67-10.67C383.913,79.424,379.131,74.644,373.243,74.644z"
				/>
				<path
					style="fill:#AC92EB;"
					d="M53.317,138.63h170.632c5.89,0,10.654-4.765,10.654-10.654c0-5.905-4.764-10.669-10.654-10.669
	   H53.317c-5.89,0-10.669,4.764-10.669,10.669C42.647,133.865,47.427,138.63,53.317,138.63z"
				/>
				<path
					style="fill:#48CFAD;"
					d="M53.317,181.29h234.618c5.89,0,10.654-4.78,10.654-10.669s-4.765-10.653-10.654-10.653H53.317
	   c-5.89,0-10.669,4.764-10.669,10.653C42.647,176.51,47.427,181.29,53.317,181.29z"
				/>
				<path
					style="fill:#5D9CEC;"
					d="M53.317,223.938l149.293,0.016c5.905,0,10.669-4.78,10.669-10.669
	   c0-5.889-4.764-10.669-10.669-10.669H53.317c-5.89,0-10.669,4.78-10.669,10.669C42.647,219.173,47.427,223.938,53.317,223.938z"
				/>
				<path
					style="fill:#FFCE54;"
					d="M330.581,245.275H53.317c-5.89,0-10.669,4.78-10.669,10.654c0,5.905,4.78,10.67,10.669,10.67h277.264
	   c5.905,0,10.67-4.765,10.67-10.654C341.251,250.057,336.486,245.275,330.581,245.275z"
				/>
				<path
					style="fill:#ED5564;"
					d="M138.625,287.93H53.317c-5.89,0-10.669,4.781-10.669,10.654c0,5.905,4.78,10.686,10.669,10.686
	   h85.309c5.905,0,10.669-4.78,10.669-10.686C149.295,292.711,144.53,287.93,138.625,287.93z"
				/>
			</svg>
			<p tw="ml-3 font-semibold">${siteConfig.title}</p>
		</div>
		<p>by ${siteConfig.author}</p>
	</div>
</div>`;

export async function get({ params: { slug } }: APIContext) {
	const post = await getEntryBySlug("post", slug!);
	const title = post?.data.title ?? siteConfig.title;
	const postDate = getFormattedDate(post?.data.publishDate ?? Date.now(), {
		weekday: "long",
	});
	const svg = await satori(markup(title, postDate), ogOptions);
	const png = new Resvg(svg).render().asPng();
	return {
		body: png,
		encoding: "binary",
	};
}

export async function getStaticPaths(): Promise<GetStaticPathsResult> {
	const posts = await getCollection("post");
	return posts.filter(({ data }) => !data.ogImage).map(({ slug }) => ({ params: { slug } }));
}
