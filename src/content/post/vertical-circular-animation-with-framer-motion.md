---
title: "Vertical Circular Animation using Framer Motion"
publishDate: "02 April 2023"
description: "A step by step tutorial on how to use Spring Boot to run a Spark application on a local Minikube K8S cluster."
tags: ["React", "Framer-Motion", "SVG"]
---

I love UI animations. They can really bring to life any web page they are added to, and from a developer's perspective, they are really fun to write and create. They often present very interesting challenges such as timing and orchestration and leave a lot of room for creativity for the person implementing them.

When writing animations for a React application, my usual go-to library is framer-motion. Among many other things, I really love it's rich and declarative API, the way it seamlessly integrates with React styling frameworks some as styled-components, it's vast support for SVG and it's smooth and performant output.

When working on the animation for my blog's profile-picture (hover on top of it in case you missed it 😀), I knew I wanted the icons in the background to transition infinitely in vertical lanes from the bottom to the top of the container. The inspiration was the old arcade games (i.e. "Pac-man") where when a character would transition out of the screen in one end it would immediately appear on the opposite end. So, for my case, if you can imagine the image container divided to N invisible vertical lanes, I wanted each icon on a given lane to move from bottom to top inside the lane and then to appear on the adjacent lane to the right when it reaches the top of the container. Once an icon reaches the top of the last rightmost lane it should appear on the bottom of the first - leftmost lane.

Sounds like a pretty simple and common use-case, right? Well, implementing this with framer-motion resulted in quite some time of exploration and trial and error. Let's jump straight into how I got this to work.

For this example I will use a `rect` element inside an `svg` container. The `svg` container is `300px` wide and the `rect` is `100px` wide so you can imagine the container is divided into 3 `100px` vertical lanes in which the rect should transition.

The first is to get the rect to move infinitely in the same lane from the bottom to the top of the container. This turned out to be very simple and required very little code:

```jsx
import { motion } from "framer-motion";

const VerticalCircularAnimation = () => {
	return (
		<svg height={300} width={300} style={{ border: "1px solid black" }}>
			<motion.rect
				height={100}
				width={100}
				fill="green"
				animate={{
					y: [300, -100],
				}}
				transition={{
					y: {
						duration: 5,
						ease: "linear",
						repeat: Infinity,
						repeatType: "loop",
					},
				}}
			/>
		</svg>
	);
};

export default VerticalCircularAnimation;
```

Basically, all it required was animating the `y` property of the `rect` from the full height of the container to minus the height of the `rect` using the `motion` `animate` prop. This creates the illusion that the `rect` appears at the bottom of the container and disappears when it reaches the top. the combination of the `ease: "linear"`, `repeat: Infinity` and `repeatType: "loop"` help achieve the infinite vertical circular effect:

<iframe src="https://codesandbox.io/embed/vertical-only-pjzo1c?fontsize=14&hidenavigation=1&module=%2Fsrc%2FVertialCircularAnimation.js&theme=dark"
     style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
     title="vertical-only"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
   ></iframe>
