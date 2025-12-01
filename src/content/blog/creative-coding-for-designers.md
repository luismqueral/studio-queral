---
title: "Creative Coding for Designers"
description: "You don't need to be a programmer to make generative art"
date: 2025-10-22
tags: ["creative-coding", "generative", "art"]
draft: false
---

I learned to code because I wanted to make things I couldn't make in Photoshop.

## The Myth

There's this idea that creative coding requires years of programming experience. That you need to understand algorithms and data structures before you can make anything interesting.

This is wrong.

## What You Actually Need

**30 minutes with p5.js.** That's it. Open the [web editor](https://editor.p5js.org/), type this:

```javascript
function setup() {
  createCanvas(400, 400);
}

function draw() {
  circle(mouseX, mouseY, 50);
}
```

You just made interactive art. The circle follows your mouse.

## Why It Matters for Designers

Creative coding teaches you to think in systems. Instead of designing one screen, you design the rules that generate screens. Instead of choosing one color, you define the relationships between colors.

This mindset transfers directly to design systems work.

## Resources That Actually Help

- **[The Coding Train](https://thecodingtrain.com/)** – Daniel Shiffman makes everything approachable
- **[Generative Design](http://www.generative-gestaltung.de/)** – The book that got me started
- **[Observable](https://observablehq.com/)** – See how others think in code

Don't wait until you feel ready. Make something ugly today.

