---
title: "My take on Astro markdown linkable headings"
publishDate: "01 May 2023"
description: "A simple vanilla-js solution for making markdown headings in an AstroJS site, clickable anchor links"
tags: ["Astro", "Javascript", "CSS", "HTML", "Tailwind"]
---

Anchor headings are a great way to bookmark or share a specific section in an article. That's why this was one of the first features I wanted to add to my blog - built with [AstroJs](https://docs.astro.build/en/getting-started/) (the one you are currently reading 😀). Googling for a simple way to achieve this, I did come by several existing solutions. However, for the time being, none of these managed to get the exact result I was aiming at.
In the end, I came up with a very simple vanilla-js solution which did the trick.

## Requirements list:

Before stating to look for a solution, there were a few things I knew I wanted this feature to include:

- The markdown headings should be clickable links. Clicking on them should link to the relevant url path in the article.
- Hovering the headings should reveal a link icon to the left of the heading.
- This solution should be applied to the headings in the markdown files in my blog.
- Clicking the headings should smoothly scroll and position the heading to the top of the page.

## The BlogPost.astro component:

My project includes a `BlogPost.astro` component. This components is responsible for the general layout and functionality of my posts and it is the one which wraps my markdown content. I figured that I could probably add some simple javascript to turn the headings in the markdown content into anchor links. Here is a simplified version of this component:


```astro
---
import BaseLayout from "./Base.astro";
... 

---

<script>
  // markdown linkable headings javascript should go here
</script>

<BaseLayout>
        ... 
		<article>
			<slot />
		</article>
        ...
</BaseLayout>

```

## The solution implementation

And indeed, adding these few lines to the script tag did the trick: 

```js
const linkSvg = ` 
<svg 
    xmlns="http://www.w3.org/2000/svg" 
    class="inline-block h-6 w-6 absolute bottom-0 -left-6 top-1.5" 
    aria-hidden="true" 
    focusable="false" 
    viewBox="0 0 24 24" 
    stroke-width="1" stroke="currentColor" 
    fill="none" 
    stroke-linecap="round" 
    stroke-linejoin="round">
        <path d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z">
</svg>
`;

const anchorHeadings = document.querySelectorAll("h2, h3, h4, h5, h6");

	[...anchorHeadings]
		.forEach((heading) => {
			const anchor = document.createElement("a");
			anchor.className = "group relative cursor-pointer";
			anchor.href = `#${heading.id}`;
			heading.parentNode!.insertBefore(anchor, heading);
			
			const linkIconWrapper = document.createElement("div");
			linkIconWrapper.className = "hidden group-hover:block";

			linkIconWrapper.innerHTML = linkSvg;
			anchor.appendChild(linkIconWrapper);
			anchor.appendChild(heading);
		});
```

Let's break this down: 

First I'm grabbing all the headings in the post using this line: 

```js
const anchorHeadings = document.querySelectorAll("h2, h3, h4, h5, h6");
```

Notice I'm not selecting `h1` - that's because I didn't want my main blog-post title to be a linkable anchor link.

Next, I'm iterating over the selected heading using `forEach`. For each heading, I'm using the `document` API to wrap it with an anchor tag, linking to the heading it is wrapping. I'm also creating a wrapper for the link svg icon and injecting the icon markup into it using the `innerHTML` property. 
Notice that I'm adding [Tailwind](https://tailwindcss.com/) classes to the elements I'm creating in order to set up the layout and behavior of my headings. For example, in order to show the link-icons only upon hovering the heading I added the following classes to the `linkIconWrapper`: `hidden group-hover:block`. Of course, this is just a personal preference and you could use any other CSS solution in order to achieve the same result.


## Smooth scrolling the clicked heading to the top of the screen

The last thing left to take care of is smooth-scrolling the clicked heading to the top of the page. 
Regarding the positioning of the heading, well, that's actually the default browser behavior. When linking to an element's id using an anchor link the linked element will be positioned at the top of the view-port by default after clicking the link. By wrapping each of my headings with and anchor tag linking to that heading, I got this taken care of.
As for for making this scroll transition smooth, this also turned out to be really simple. All I had to do was add the following css rule to my sites global html: 

```css
html {
  scroll-behavior: smooth;
}
```

This simple rule makes sure that any auto-scrolling performed withing my site will happen in a smooth transition.


## Conclusion

In this short post, I showed a simple vanilla-javascript solution for turning the headings in my AstroJS blog's markdown posts into clickable anchor links. Feel free to peek into [my blog's source code](https://github.com/itaydafna/itaydafna.dev) in order to see how this solution is implemented there.
