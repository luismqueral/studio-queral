<div class="mw6 center tl mb4">

A few months ago I wrote about a [100-line element inspector](/notes/element-inspector) — a dumb script that copies CSS selectors to your clipboard so you can point at things when talking to an LLM. It worked. But I kept wanting more.

I'd copy a selector, paste it into Claude, type "make this bolder" — and then realize I actually wanted to say three things about three different elements. And I wanted to sketch an arrow. And I wanted to just *edit the text directly* to show what I meant rather than describe it.

So the inspector grew into something else.

</div>

---

<div class="mw6 center tl mb4">

### DOM-Tools

It's a floating toolbar you drop onto any page. One script tag. No dependencies, no Tailwind, no build step required on the consuming end.

```html
<script src="https://queral.studio/dom-tools.min.js"></script>
```

You get a pill-shaped toolbar at the bottom of the screen with a handful of modes:

**Select** — hover to see element boundaries, click to open a popover where you type what you'd change. Your note sticks to the element as a little bubble. Click another element, leave another note. When you're done, hit "Copy All" and the whole batch exports as structured Markdown — selectors, notes, text diffs, class diffs — ready to paste into a prompt.

**Edit Text** — double-click any text element and just... type. The change is tracked silently. No popover, no extra UI. When you copy, the before/after shows up in the output.

**Draw** — freehand annotation directly on the page. Pencil cursor, color swatches, size options. Right-click to erase. The canvas lives inside the page content, so when you zoom it scales with everything else.

</div>

---

<div class="mw6 center tl mb4">

### The workflow it enables

The thing I was actually building toward: **describe a full round of design feedback in one shot**.

Instead of:
> "make the header smaller"
>
> *wait*
>
> "also move the CTA up"
>
> *wait*
>
> "and change 'Get Started' to 'Try it'"

You load the page, click around, leave notes, edit some text inline, draw an arrow pointing at the thing that's wrong, and then hit copy. What lands in your clipboard is a single structured document:

```markdown
## DOM Changes

### .hero > h1
Note: reduce font-size to 48px, less dramatic

### .cta-button
Note: move above the fold
Text: "Get Started" → "Try it"

### .sidebar
Note: see drawing — arrow indicates preferred position
```

One paste, one generation, one diff to review. The LLM gets everything it needs in one message — selectors it can find in the source, plain-language intent, and concrete text changes it can apply verbatim.

</div>

---

<div class="mw6 center tl mb4">

### Canvas zoom

This part surprised me. I added Figma-style zoom (Cmd+Scroll) mostly as a convenience — sometimes you want to zoom out and see the whole page at once. But it turned the tool into something closer to a design canvas.

When you zoom out, the page floats in a grey field with a subtle border. There's a minimap in the corner. You can pan with spacebar. The draw layer scales with the content. It stops feeling like "a webpage with annotations" and starts feeling like "a design artifact you're marking up."

The zoom is pure CSS transforms on a wrapper div. No rasterization, no canvas rendering of the page. Everything stays interactive — you can still click elements, edit text, leave notes — all while zoomed to 40%.

</div>

---

<div class="mw6 center tl mb4">

### What I learned building it

**The communication bottleneck is real.** I keep coming back to this. LLMs are fast at generating code. The slow part is telling them what you want with enough precision that they get it right on the first try. Every tool that reduces the gap between "what I'm looking at" and "what the model receives" saves multiple round-trips.

**Inline editing is underrated.** When I want to change a headline from "Welcome to our platform" to "Make something," the fastest way to communicate that is to just *type it*. Not describe it. Not say "change the h1 text to..." — just put the cursor in the word and type. The tool tracks the diff automatically.

**Annotations compound.** A single note is fine. But five notes on five elements, plus two text edits, plus a sketch — that's a complete design review in one clipboard copy. The structured output means the LLM can process them all in one pass without asking clarifying questions.

</div>

---

<div class="mw6 center tl mb4">

### Technical notes

It's ~300KB unminified, zero dependencies. The architecture is a module registry — each tool (select, draw, edit, camera, copy-selector) registers independently and can be toggled on/off. There's an experiment system in settings for features that aren't ready yet (move elements, duplicate elements).

The trickiest part was making everything coexist. When you're in draw mode, hover outlines need to stop. When you zoom, the draw canvas needs to scale with the page but the toolbar needs to stay fixed. When you hold Cmd for zoom-scroll, the selection hover needs to suppress. Lots of small state coordination problems that individually are trivial but collectively make or break the feel.

It boots via `Esc Esc` (double-tap Escape) on any page, or automatically if `?dom-tools` is in the URL.

</div>

---

<div class="mw6 center tl mb4">

### Try it

Add the script to any project and double-tap Escape:

```html
<script src="https://queral.studio/dom-tools.min.js"></script>
```

Or just visit the [project page](https://luismqueral.github.io/dom-tools/?dom-tools) — it loads itself.

[Source on GitHub.](https://github.com/luismqueral/dom-tools)

</div>
