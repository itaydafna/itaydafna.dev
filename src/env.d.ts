/// <reference path="../.astro/types.d.ts" />
/// <reference types="@astrojs/image/client" />

declare module "*.svg" {
	import React = require("react");
	export const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>;
	const src: string;
	export default src;
}
