import { FC, useCallback, useState } from "react";
import { motion } from "framer-motion";

import { ReactComponent as Sparkle } from "../assets/sparkle.svg";

import {
	PROFILE_IMAGE_SCALE_DURATION_MS,
	PROFILE_IMAGE_SCALE_DURATION_SECONDS,
} from "../constants/animation.constants";

import { useIconsAnimation, useToothSparkleAnimation } from "../hooks/animation.hooks";
import {
	CONTAINER_HEIGHT,
	CONTAINER_WIDTH,
	ICON_EDGE,
	ProfilePicSize,
} from "../constants/profile-pic-dimensions.constants";

type Props = {
	size: ProfilePicSize;
};

const AnimatedProfile: FC<Props> = ({ size }) => {
	const { positionedIcons, startIconsAnimation, stopIconsAnimation } = useIconsAnimation(size);
	const { toothSparkleAnimationControls, startToothSparkleAnimation, stopToothSparkleAnimation } =
		useToothSparkleAnimation();

	const [isHovered, setIsHovered] = useState(false);
	const [isOnHoverDisabled, setIsOnHoverDisabled] = useState(false);

	const onMouseEnter = useCallback(() => {
		if (isOnHoverDisabled) return;
		setIsHovered(true);
		startIconsAnimation();
		startToothSparkleAnimation();
	}, [startIconsAnimation, startToothSparkleAnimation, isOnHoverDisabled]);

	const onMouseLeave = useCallback(() => {
		setIsHovered(false);
		stopToothSparkleAnimation();
		setIsOnHoverDisabled(true);
		setTimeout(() => {
			stopIconsAnimation();
			setIsOnHoverDisabled(false);
		}, PROFILE_IMAGE_SCALE_DURATION_MS);
	}, [stopIconsAnimation, stopToothSparkleAnimation]);

	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			height={CONTAINER_HEIGHT(size)}
			width={CONTAINER_WIDTH(size)}
			style={{ border: "1px solid black" }}
			onMouseLeave={onMouseLeave}
			onMouseEnter={onMouseEnter}
		>
			{positionedIcons}
			<motion.image
				href="/profile-pic-no-bg.png"
				height={ICON_EDGE(size) * 13}
				width={ICON_EDGE(size) * 13}
				animate={{ scale: isHovered ? 1.1 : 1 }}
				transition={{ duration: PROFILE_IMAGE_SCALE_DURATION_SECONDS }}
				x={"-15%"}
				y={0}
			/>
			{
				<motion.g
					initial={{ x: "47%", y: "52%", scale: 0, opacity: 0 }}
					animate={toothSparkleAnimationControls}
					style={{ transformOrigin: "50% 50%" }}
				>
					<Sparkle
						height={"6%"}
						width={"6%"}
						style={{ visibility: isHovered ? "visible" : "hidden" }}
					/>
				</motion.g>
			}
		</svg>
	);
};

export default AnimatedProfile;
