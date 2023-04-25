---
title: "My take on Astro markdown linkable anchor headings"
publishDate: "01 May 2023"
description: "my-take-on-astro-markdown-anchor-headings.md frontmatter does not match collection"
tags: ["k"]
---

Anchor headings are a great way to bookmark or share a specific section in an article. This is why this was one of the first features I wanted to add to my blog - built with [AstroJs](https://docs.astro.build/en/getting-started/) (the one you are currently reading 😀). Googling for a simple way to achieve this, I did come by several existing solutions. However, for the time being, none of these managed to get exact result I was aiming at. In the end, I came up with a very simple vanilla-js solution which did the trick.

## Requirements list:

Before stating to look for a solution, there were a few things I knew I wanted this feature to include.

- The headings should be clickable links. Clicking on them should link to the relevant url path in the article.
- Hovering the headings should reveal a link icon to the left of the heading.
- This should support the headings in the markdown files in my blog.
- Clicking the headings should smoothly scroll the heading to the top of the page.

## The :
