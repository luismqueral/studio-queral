<div class="mw6 center tl mb4">

I've been building a lot of HTML artifacts lately — research reports, data visualizations, interactive prototypes. The kind of thing where you're staring at the page in a browser, and you want to tell Claude "move that thing 8px to the left" or "change the font weight on that subtitle."

The problem is: you're pointing at pixels, but the LLM needs selectors.

</div>

---

<div class="mw6 center tl mb4">

### The gap

When I'm iterating on a page with an LLM, the conversation goes something like this:

> me: "make the spacing tighter on that section header"
>
> claude: "which section header? can you give me the selector or line number?"
>
> me: *opens devtools, clicks through the DOM tree, copies a selector, pastes it back*

That round-trip is small but constant. And it breaks flow. You're in a creative headspace — looking at the page, seeing what's wrong, wanting to fix it — and then you have to context-switch into the inspector panel, find the right node, figure out a stable selector, and type it back.

I wanted something dumber and faster.

</div>

---

<div class="mw6 center tl mb4">

### What I built

A single self-executing JavaScript file. Drop it before `</body>` and you get:

- A crosshair cursor
- Blue highlight on hover (so you can see exactly what you're about to grab)
- Click to copy the element's CSS selector + a text preview to clipboard
- Toggle on/off with `Cmd+Shift+K` or the floating button

That's it. ~100 lines. No dependencies.

```javascript
// What gets copied to clipboard:
#elementId | "Text preview of the element..."

// or, if no ID:
div.section-narrow > h3 | "Methodology"
```

The output is formatted for pasting directly into a conversation. You get the selector (so the LLM knows what to target) and a text preview (so you both have context on what you're looking at).

</div>

---

<div class="mw6 center tl mb4">

### How to use it

Add one line to any HTML file:

```html
<script src="inspector.js"></script>
```

Then just... click things. The selector lands in your clipboard. Paste it into your prompt. Done.

I keep it on by default when I'm actively iterating with Claude Code on a page. When I'm done and want to interact with the page normally, `Cmd+Shift+K` turns it off.

</div>

---

<div class="mw6 center tl mb4">

### Why this matters (a little)

The interesting thing isn't the tool — it's trivial. The interesting thing is the workflow it enables.

When you're pair-programming with an LLM on a visual artifact, the bottleneck isn't the code generation. It's the communication. You're looking at a rendered page and the LLM is looking at source code. The inspector bridges that gap — it lets you point at the screen and say "this one" in a language the LLM already understands.

It's the kind of tiny utility that doesn't deserve a npm package or a readme longer than three sentences. But it saves me maybe 30 seconds per iteration, and when you're doing 50 iterations on a page, that's 25 minutes of flow you didn't break.

</div>

---

<div class="mw6 center tl mb4">

### The code

The whole thing is a single IIFE. Here's the interesting bit — how it builds selectors:

```javascript
function getSelector(el) {
  if (el.id) return '#' + el.id;
  let path = [];
  while (el && el !== document.body) {
    let seg = el.tagName.toLowerCase();
    if (el.className && typeof el.className === 'string') {
      seg += '.' + el.className.trim().split(/\s+/).join('.');
    }
    path.unshift(seg);
    el = el.parentElement;
  }
  return path.join(' > ');
}
```

It prefers IDs (short, stable) and falls back to a full class-based path. Not always the most elegant selector, but always unique enough for the LLM to find the element in source.

[Full source on GitHub](https://github.com/luismqueral/gen-research-toolkit) (it's in `tools/inspector/`).

</div>
