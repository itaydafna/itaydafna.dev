import { useState, FC, ReactNode, useCallback } from "react";
import { motion, AnimationControls } from "framer-motion";

type Props = {
	initialY: number;
	initialX: number;
	initialScale: { value: number; isGrowing: boolean };
	children: ReactNode;
	controls: AnimationControls;
};

export const AnimatedIconWrapper: FC<Props> = ({
	initialY,
	initialX,
	initialScale,
	children,
	controls,
}) => {
	const [y, setY] = useState(initialY);
	const [x, setX] = useState(initialX);
	const [scale, setScale] = useState(initialScale);

	const onUpdate = useCallback(({ y, x, scale }: { y: number; x: number; scale: number }) => {
		setY(y);
		setX(x);
		setScale(({ value }) => ({ value: scale, isGrowing: value < scale }));
	}, []);

	return (
		<motion.g
			custom={{ y, x, scale }}
			initial={{ y, x, scale: scale.value }}
			x={x}
			y={y}
			animate={controls}
			onUpdate={onUpdate}
		>
			{children}
		</motion.g>
	);
};
