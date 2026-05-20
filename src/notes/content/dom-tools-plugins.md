<div class="mw6 center tl mb4">

DOM-Tools started as a single script. one file, zero dependencies, drop it on any page. that constraint was the whole point — but it also meant every new idea had to earn its way into the bundle.

some ideas don't belong in the bundle. they're too weird, too heavy, too experimental. but they still want access to the toolbar, the state, the helpers. they want to be *part* of the tool without being *inside* it.

</div>

---

<div class="mw6 center tl mb4">

### plugins

so I added a plugin API. a plugin is a standalone JS file — an IIFE that calls `window.DomTools.registerPlugin(definition)` and gets a toolbar button, lifecycle hooks, and access to everything the built-in tools have.

the loading is order-independent. if the plugin loads before dom-tools boots, it goes into a queue. if it loads after, it registers immediately. either way the plugin author doesn't care.

```html
<script src="dom-tools.min.js"></script>
<script src="plugins/morphizer.js" async></script>
<script src="plugins/dom-synth.js" async></script>
```

</div>

---

<div class="mw6 center tl mb4">

### what a plugin gets

the `init(api)` function receives an object with everything you need:

- **state** — the shared state object (what's hovered, selected, which mode is active)
- **helpers** — `showToast`, `nudge`, `flashElement`, `getSelector`, `copyText`
- **UI** — `createPanel()` gives you a draggable floating panel with a title bar
- **toolbar** — your button shows up automatically from the `button` definition
- **constants** — z-indexes, colors, the inspector UI set

a plugin follows the same interface as built-in features: `init`, `activate`, `deactivate`, `toggle`. the toolbar handles mutual exclusion — only one tool active at a time. you don't think about it.

</div>

---

<div class="mw6 center tl mb4">

### morphizer

the first plugin I built captures the page as a WebGL texture and runs it through a fragment shader in real-time. five effects: wave, ripple, pixelate, chromatic aberration, melt.

it uses `getDisplayMedia` to grab the rendered tab at 60fps — no html2canvas, no DOM rasterization, just the actual pixels the GPU already composited. the shader canvas sits on top with `pointer-events: none` so the page stays interactive underneath.

the control panel has intensity, frequency, and speed sliders. there's a freeze toggle (stop updating the texture, keep the shader animating) and a PNG capture button. the whole thing is ~400 lines.

</div>

---

<div class="mw6 center tl mb4">

### dom synth

the second plugin turns the page into a step sequencer. click any element to add it as a track. hit play and the page lights up on every beat.

the mapping: element position becomes pitch (top = high, bottom = low). width becomes note duration. height becomes filter cutoff. background color hue picks the oscillator type. font size controls velocity. the result is that visually dense pages sound busier, and minimal pages sound sparse. it's surprisingly musical.

the sequencer uses the Web Audio API's `currentTime` for sample-accurate scheduling — no setTimeout drift. visual feedback is `el.animate()` glow pulses that run on the compositor, so even at 200 BPM there's no layout thrash.

</div>

---

<div class="mw6 center tl mb4">

### the 20-line skeleton

if you want to write your own plugin, this is all you need:

```js
(function() {
  const plugin = {
    id: 'my-plugin',
    label: 'My Plugin',
    enabledByDefault: true,
    button: {
      icon: '<svg>...</svg>',
      tooltip: 'My Plugin',
      color: '#f59e0b',
      order: 60,
    },
    init(api) { this._api = api; },
    activate() { this._api.showToast('hello'); },
    deactivate() {},
    toggle() { this.activate(); return true; },
  };

  const dt = window.DomTools || (window.DomTools = { _pendingPlugins: [] });
  if (dt.registerPlugin) dt.registerPlugin(plugin);
  else dt._pendingPlugins.push(plugin);
})();
```

drop that in a script tag after dom-tools and you have a toolbar button that says hello. everything else — panels, state, clipboard, selectors — is on the `api` object.

</div>

---

<div class="mw6 center tl mb4">

### why this matters

the core stays lean. ~300KB, zero dependencies, does exactly what it needs to do. plugins can be heavy, experimental, GPU-intensive, audio-driven — whatever. they load independently, fail independently, and don't bloat the thing everyone else is using.

it also means other people can write plugins without touching the core. the API surface is small and stable. if you can write an IIFE and implement `activate/deactivate`, you have a plugin.

[source on GitHub](https://github.com/luismqueral/dom-tools) — plugins live on their own branches (`plugin/morphizer`, `plugin/dom-synth`).

</div>
