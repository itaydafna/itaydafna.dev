export enum ProfilePicSize {
	LARGE = "LARGE",
	SMALL = "SMALL",
}

const ICON_EDGE_SIZES = {
	[ProfilePicSize.LARGE]: 50,
	[ProfilePicSize.SMALL]: 30,
};

export const ICON_EDGE = (size: ProfilePicSize) => ICON_EDGE_SIZES[size];
export const HIDDEN_PADDING = (size: ProfilePicSize) => ICON_EDGE(size);
export const CONTAINER_HEIGHT = (size: ProfilePicSize) => ICON_EDGE(size) * 11;
export const CONTAINER_WIDTH = (size: ProfilePicSize) => ICON_EDGE(size) * 10;
export const FULL_Y = (size: ProfilePicSize) => CONTAINER_HEIGHT(size) + HIDDEN_PADDING(size) * 2;
export const NUM_LANES = (size: ProfilePicSize) => CONTAINER_WIDTH(size) / ICON_EDGE(size);
//gap between 2 icons
export const ICONS_GAP = (size: ProfilePicSize) => 2 * ICON_EDGE(size);
