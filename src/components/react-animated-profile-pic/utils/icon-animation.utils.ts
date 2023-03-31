import {
	UPPER_SCALE_BOUNDARY,
	SCALE_DELTA,
	LOWER_SCALE_BOUNDARY,
	SCALE_DELTA_TIME_RATIO,
} from "../constants/animation.constants";
import {
	NUM_LANES,
	ICON_EDGE,
	CONTAINER_WIDTH,
	ProfilePicSize,
} from "../constants/profile-pic-dimensions.constants";
import type { Scale } from "../types/animation.types";

export function generateXIterations(x: number, size: ProfilePicSize) {
	const iterations: number[] = [];
	Array.from({ length: NUM_LANES(size) }).forEach((_, i) => {
		if (x + i * ICON_EDGE(size) >= CONTAINER_WIDTH(size)) {
			iterations.push((x + i * ICON_EDGE(size)) % CONTAINER_WIDTH(size));
			if (i !== NUM_LANES(size) - 1) {
				iterations.push((x + i * ICON_EDGE(size)) % CONTAINER_WIDTH(size));
			}
		} else {
			iterations.push(x + i * ICON_EDGE(size));
			if (i !== NUM_LANES(size) - 1) {
				iterations.push(x + i * ICON_EDGE(size));
			}
		}
	});

	return iterations;
}

export function generateXTimes(initialTimeToTopPortion: number, size: ProfilePicSize) {
	const times = [0];
	const laneTimePortion = 1 / NUM_LANES(size);

	Array.from({ length: NUM_LANES(size) - 1 }).forEach((_, i) => {
		times.push(laneTimePortion * initialTimeToTopPortion + i * laneTimePortion);
		times.push(laneTimePortion * initialTimeToTopPortion + i * laneTimePortion);
	});

	return times;
}

export function generateScaleTimes(scale: Scale): number[] {
	const initialTimeRatioToScaleEdge: number = getInitialTimeRatioToScaleEdge(scale);
	return [initialTimeRatioToScaleEdge, initialTimeRatioToScaleEdge + 2 * SCALE_DELTA_TIME_RATIO, 1];
}

function getInitialTimeRatioToScaleEdge(scale: Scale): number {
	if (scale.isGrowing) {
		if (scale.value > 1) {
			return (SCALE_DELTA_TIME_RATIO * (UPPER_SCALE_BOUNDARY - scale.value)) / SCALE_DELTA;
		} else {
			return SCALE_DELTA_TIME_RATIO + (SCALE_DELTA_TIME_RATIO * (1 - scale.value)) / SCALE_DELTA;
		}
	} else {
		if (scale.value < 1) {
			return (SCALE_DELTA_TIME_RATIO * (scale.value - LOWER_SCALE_BOUNDARY)) / SCALE_DELTA;
		} else {
			return SCALE_DELTA_TIME_RATIO + (SCALE_DELTA_TIME_RATIO * (scale.value - 1)) / SCALE_DELTA;
		}
	}
}
