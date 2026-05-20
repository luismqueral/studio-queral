<div class="mw6 center tl mb4">

a few months ago I wrote about a [100-line element inspector](/notes/element-inspector) — a script that copies CSS selectors to your clipboard so you can point at things when talking to an LLM. it worked, but I kept wanting more.

I'd copy a selector, paste it into Claude, type "make this bolder" — and then realize I actually wanted to say three things about three different elements. and I wanted to sketch an arrow, and edit the text directly to show what I meant rather than describe it.

so the inspector grew into something else.

</div>

---

<div class="mw6 center tl mb4">

### what it is now

a floating toolbar you drop onto any page. one script tag, no dependencies, no build step.

```html
<script src="https://queral.studio/dom-tools.min.js"></script>
```

you get a pill-shaped bar at the bottom of the screen with a handful of modes:

**select** — hover to see element boundaries, click to open a popover where you type what you'd change. your note sticks as a bubble anchored to the element.

**edit text** — double-click any text element and just... type. the change is tracked silently, and when you copy, the before/after shows up in the output.

**draw** — freehand annotation directly on the page. the canvas lives inside the page content, so when you zoom it scales with everything else.

</div>

---

<div class="mw6 center tl mb4">

### the workflow it enables

the thing I was actually building toward: **describe a full round of design feedback in one shot**.

instead of:
> "make the header smaller"
>
> *wait*
>
> "also move the CTA up"
>
> *wait*
>
> "and change 'Get Started' to 'Try it'"

you load the page, click around, leave notes, edit some text inline, draw an arrow pointing at the thing that's wrong, and hit copy. what lands in your clipboard:

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

one paste, one generation, one diff to review. the LLM gets selectors, plain-language intent, and concrete text changes it can apply verbatim.

</div>

---

<div class="mw6 center tl mb4">

### canvas zoom

I added figma-style zoom (cmd+scroll) mostly as a convenience. but it turned the tool into something closer to a design canvas.

when you zoom out, the page floats in a grey field with a subtle border. there's a minimap, you can pan with spacebar, and the draw layer scales with the content.

it stops feeling like "a webpage with annotations" and starts feeling like "a design artifact you're marking up." everything stays interactive — click elements, edit text, leave notes — all while zoomed to 40%.

the zoom is pure CSS transforms on a wrapper div. no rasterization, no canvas rendering of the page.

</div>

---

<div class="mw6 center tl mb4">

### what I learned building it

**the communication bottleneck is real.** LLMs are fast at generating code — the slow part is telling them what you want with enough precision that they get it right on the first try.

**inline editing is underrated.** when I want to change a headline from "Welcome to our platform" to "Make something," the fastest way to communicate that is to just *type it*. the tool tracks the diff automatically.

**annotations compound.** five notes on five elements, plus two text edits, plus a sketch — that's a complete design review in one clipboard copy. the structured output means the LLM can process them all in one pass without asking clarifying questions.

</div>

---

<div class="mw6 center tl mb4">

### technical notes

~300KB unminified, zero dependencies. the architecture is a module registry — each tool registers independently and can be toggled on/off.

the trickiest part was making everything coexist. when you're in draw mode, hover outlines need to stop; when you zoom, the draw canvas scales with the page but the toolbar stays fixed; when you hold cmd for zoom-scroll, selection hover suppresses.

it boots via `Esc Esc` (double-tap escape) on any page, or automatically if `?dom-tools` is in the URL.

</div>

---

<div class="mw6 center tl mb4">

### try it

it's running on this page right now — look at the toolbar at the bottom. click around, leave a note, hit copy.

add it to any project with one script tag and double-tap escape:

```html
<script src="https://queral.studio/dom-tools.min.js"></script>
```

[project page](https://luismqueral.github.io/dom-tools/?dom-tools) · [source on GitHub](https://github.com/luismqueral/dom-tools)

</div>
