---
title: "Vertical Circular Animation using Framer Motion"
publishDate: "02 April 2023"
description: "Implementing an infinite transition of SVG elements in vertical container lanes using React and Framer Motion"
tags: ["React", "Framer-Motion", "SVG", "Animation"]
---

I love UI animations. They can really bring any web page to life and from a developer's perspective, they are really fun to write and optimize. They often present very interesting challenges such as timing and orchestration and leave a lot of room for creativity and imagination for the person implementing them.

When writing animations for a React application, my usual go-to library is [Framer Motion](https://www.framer.com/motion/). Among many other things, I really love it's rich and declarative API, the way it integrates seamlessly with React styling frameworks such as [styled-components](https://styled-components.com/), it's vast support for SVG and it's smooth and performant output.

## The challenge

When working on the animation for my [blog's profile-picture](https://www.itaydafna.dev/about/) (hover on top of it in case you missed it 😀), I knew I wanted the icons in the background to transition infinitely in vertical lanes from the bottom to the top of the container. The inspiration was the old arcade games (i.e. "Pac-man") where when a character would transition out of the screen in one end it would immediately appear on the opposite end. So for my case - if you can imagine the image container divided to N invisible vertical lanes - I wanted each icon on a given lane to move from bottom to top inside the lane and then to appear on the adjacent lane to the right when it reaches the top of the container. Once an icon reaches the top of the last rightmost lane it should appear on the bottom of the first - leftmost lane.

Sounds like a pretty simple and common use-case, right? Well, implementing this with framer-motion resulted in quite some exploration and trial and error. Let's jump straight into how I eventually got this to work.

## Vertical Circular Animation in a Single Lane

For this example I will use a `rect` element inside an `svg` container. The `svg` container is `300px` wide and the `rect` is `100px` wide so you can imagine the container is divided to 3 `100px` vertical lanes in which the `rect` should transition.

The first challenge was to get the `rect` to move infinitely in the same lane from the bottom to the top of the container. This turned out to be very simple and required very little code:

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

## Horizontal Circular Animation - Switching Vertical Lanes

Getting the items to horizontally "jump" between lanes once they reach the top of the container was a bit trickier. To better explain how I got this to work, I removed the vertical animation from the example and kept only the transition on the `x` axis:

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
					x: [0, 0, 100, 100, 200, 200],
				}}
				transition={{
					x: {
						ease: "linear",
						repeat: Infinity,
						repeatType: "loop",
						duration: 2 * 3,
						times: [0, 1 / 3, 1 / 3, 2 / 3, 2 / 3, 1],
					},
				}}
			/>
		</svg>
	);
};

export default VerticalCircularAnimation;
```

<iframe src="https://codesandbox.io/embed/horizontal-only-se083n?fontsize=14&hidenavigation=1&module=%2Fsrc%2FVerticalCircularAnimation.js&theme=dark"
     style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
     title="horizontal-only"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
   ></iframe>

So let's break down what's going on here. The interesting parts are the `animate.x` prop and the `transition.x.times` prop. The `animate.x` is provided with an array of `x` axis positions through which the `rect` should transition, while the corresponding `transition.x.times` prop specifies which time-portion out of the entire transition it should take it to transitioning from each position to the next.
So basically, I'm telling the `rect` to stay at `x=0` (first-lane) for the first third of the transition. Then, it should jump to `x=100` (second-lane) and stay there for second third of the transition. Finally, it should jump to `x=200` (3rd lane) and spend the last third of the transition there, and repeat this entire flow infinitely.
Notice that the transition duration is 3 times the duration of each vertical duration. This ensures the `rect` will change lanes each time it completes transitioning from bottom to top.

## Putting it all together

And once we combine both `x` and `y` transitions, we can see the initial goal was achieved:

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
					x: [0, 0, 100, 100, 200, 200],
				}}
				transition={{
					y: {
						duration: 2,
						ease: "linear",
						repeat: Infinity,
						repeatType: "loop",
					},
					x: {
						ease: "linear",
						repeat: Infinity,
						repeatType: "loop",
						duration: 6,
						times: [0, 1 / 3, 1 / 3, 2 / 3, 2 / 3, 1],
					},
				}}
			/>
		</svg>
	);
};

export default VerticalCircularAnimation;
```

<iframe src="https://codesandbox.io/embed/vertical-circular-final-qy2rdn?fontsize=14&hidenavigation=1&module=%2Fsrc%2FVerticalCircularAnimation.js&theme=dark"
     style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
     title="vertical-circular-final"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
   ></iframe>

## Summary

In this post, I shared my implementation of vertical circular animation using React framer-motion. The animation I used for my profile image was actually a bit more complex. It presented additional animation challenges such as animating an element who's initial position isn't at the bottom of the container, or pausing an animated element upon a mouse-out event and keeping its position state in case the animation should be resumed. However, the basis for all the calculation I used there was the implementation described in this post.

## Final thought

One necessary optimization to the code shown here is to use constants for all the element-dimensions and animation durations and not leave [magic numbers](https://refactoring.guru/replace-magic-number-with-symbolic-constant) scattered around the code. However, since this example is very small and pretty straightforward, I decided to keep everything inside the markup and not make the reader look around for the constant declarations.
