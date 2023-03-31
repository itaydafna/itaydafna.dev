import { useAnimationControls } from "framer-motion";
import { ReactNode, useCallback, useMemo } from "react";

import { AnimatedIconWrapper } from "../components/AnimatedIconWrapper";

import {
	FULL_VERTICAL_DURATION,
	LOWER_SCALE_BOUNDARY,
	UPPER_SCALE_BOUNDARY,
	TOOTH_SPARKLE_REPEAT_DELAY,
	TOOTH_SPARKLE_DELAY,
	TOOTH_SPARKLE_DURATION,
	ICONS_SCALE_DURATION,
} from "../constants/animation.constants";
import { ICONS } from "../constants/icons";
import {
	CONTAINER_HEIGHT,
	FULL_Y,
	HIDDEN_PADDING,
	ICONS_GAP,
	ICON_EDGE,
	NUM_LANES,
	ProfilePicSize,
} from "../constants/profile-pic-dimensions.constants";
import type { Scale } from "../types/animation.types";

import {
	generateScaleTimes,
	generateXIterations,
	generateXTimes,
} from "../utils/icon-animation.utils";

type PositionedIconsAccumulator = {
	positionedIcons: ReactNode[];
	currentX: number;
	currentY: number;
	currentScale: Scale;
};

export const useIconsAnimation = (size: ProfilePicSize) => {
	const iconsAnimationControls = useAnimationControls();

	const { positionedIcons } = useMemo(
		() =>
			ICONS.reduce(
				(
					{ positionedIcons, currentX, currentY, currentScale }: PositionedIconsAccumulator,
					Icon,
					idx
				) => {
					const positionedIcon = (
						<AnimatedIconWrapper
							key={idx}
							initialX={currentX}
							initialY={currentY}
							initialScale={currentScale}
							controls={iconsAnimationControls}
						>
							<Icon width={ICON_EDGE(size)} height={ICON_EDGE(size)} />
						</AnimatedIconWrapper>
					);

					positionedIcons.push(positionedIcon);

					let nextY: number;
					const isOddColumn = currentX % ICONS_GAP(size) === 0;

					if (
						isOddColumn &&
						currentY + ICONS_GAP(size) === ICONS_GAP(size) + CONTAINER_HEIGHT(size)
					) {
						nextY = 0;
					} else if (
						!isOddColumn &&
						currentY + ICONS_GAP(size) === CONTAINER_HEIGHT(size) + ICON_EDGE(size)
					) {
						nextY = -ICON_EDGE(size);
					} else {
						nextY = currentY + ICONS_GAP(size);
					}

					const nextX = currentY > nextY ? currentX + ICON_EDGE(size) : currentX;

					const nextScale = currentScale.isGrowing
						? { value: UPPER_SCALE_BOUNDARY, isGrowing: false }
						: { value: LOWER_SCALE_BOUNDARY, isGrowing: true };

					return {
						positionedIcons,
						currentX: nextX,
						currentY: nextY,
						currentScale: nextScale,
					};
				},
				{
					positionedIcons: [],
					currentX: 0,
					currentY: -ICON_EDGE(size),
					currentScale: {
						value: LOWER_SCALE_BOUNDARY,
						isGrowing: true,
					},
				}
			),
		[iconsAnimationControls, size]
	);

	const startIconsAnimation = useCallback(() => {
		iconsAnimationControls.start(({ y, x, scale }) => {
			const initialTimeToTopPortion = (y + HIDDEN_PADDING(size)) / FULL_Y(size);
			const xIterations = generateXIterations(x, size);
			const xTimes = generateXTimes(initialTimeToTopPortion, size);

			return {
				y: [y, -HIDDEN_PADDING(size), CONTAINER_HEIGHT(size) + HIDDEN_PADDING(size), y],
				x: xIterations,
				scale: [
					scale.value,
					scale.isGrowing ? UPPER_SCALE_BOUNDARY : LOWER_SCALE_BOUNDARY,
					scale.isGrowing ? LOWER_SCALE_BOUNDARY : UPPER_SCALE_BOUNDARY,
					scale.value,
				],
				transition: {
					y: {
						ease: "linear",
						repeat: Infinity,
						repeatType: "loop",
						duration: FULL_VERTICAL_DURATION,
						times: [0, initialTimeToTopPortion, initialTimeToTopPortion, 1],
					},
					x: {
						duration: FULL_VERTICAL_DURATION * NUM_LANES(size),
						times: xTimes,
						ease: "linear",
						repeat: Infinity,
						repeatType: "loop",
					},
					scale: {
						duration: ICONS_SCALE_DURATION,
						times: generateScaleTimes(scale),
						ease: "linear",
						repeat: Infinity,
						repeatType: "loop",
					},
				},
			};
		});
	}, [iconsAnimationControls]);

	const stopIconsAnimation = useCallback(() => {
		iconsAnimationControls.stop();
	}, [iconsAnimationControls]);

	return {
		iconsAnimationControls,
		positionedIcons,
		startIconsAnimation,
		stopIconsAnimation,
	};
};

export const useToothSparkleAnimation = () => {
	const toothSparkleAnimationControls = useAnimationControls();
	const startToothSparkleAnimation = useCallback(() => {
		toothSparkleAnimationControls.start({
			opacity: [0, 1, 0],
			scale: [0, 1, 1],
			transition: {
				repeat: Infinity,
				repeatType: "loop",
				repeatDelay: TOOTH_SPARKLE_REPEAT_DELAY,
				delay: TOOTH_SPARKLE_DELAY,
				duration: TOOTH_SPARKLE_DURATION,
			},
		});
	}, [toothSparkleAnimationControls]);

	const stopToothSparkleAnimation = useCallback(() => {
		toothSparkleAnimationControls.stop();
	}, [toothSparkleAnimationControls]);

	return {
		toothSparkleAnimationControls,
		startToothSparkleAnimation,
		stopToothSparkleAnimation,
	};
};
