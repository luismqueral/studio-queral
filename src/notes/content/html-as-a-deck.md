<div class="mw6 center tl mb4">

I've been making a lot of HTML documents lately — research reports, data narratives, project briefs. at some point I realized I was presenting them by opening the file in a browser and hitting the down arrow.

that's a deck. that's literally what a presentation is: sections you advance through, one at a time, while you talk.

so I stopped pretending these were "documents that happen to look like slides" and started designing them as decks from the start. no Keynote, no Google Slides, no Reveal.js. just an HTML file with sections that snap to the viewport and arrow keys that move between them.

</div>

---

<div class="mw6 center tl mb4">

### why this works

three CSS/JS primitives do all the heavy lifting:

**scroll-snap** — `scroll-snap-type: y mandatory` on the container, `scroll-snap-align: start` on each section. the browser handles the physics of locking to panel boundaries.

**viewport units** — `min-height: 100vh` on each section means every "slide" fills the screen. content can overflow and scroll within, but each section starts at a full viewport.

**keyboard events** — a `keydown` listener on ArrowLeft/ArrowRight that scrolls to the previous/next section. an IntersectionObserver tracks which panel is currently visible so the keyboard always knows where you are.

that's it. the rest is styling.

</div>

---

<div class="mw6 center tl mb4">

### the minimal template

this is the smallest useful version. five sections, arrow key navigation, progress ticks at the top. copy it, open it, press right arrow.

```html
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Minimal Deck</title>
<style>
* { box-sizing: border-box; margin: 0; padding: 0; }
html { scroll-snap-type: y mandatory; scroll-behavior: smooth; }
body { font-family: -apple-system, BlinkMacSystemFont, sans-serif; }
.progress { position: fixed; top: 0; left: 0; right: 0; z-index: 100;
  display: flex; gap: 3px; padding: 0 24px; height: 3px; }
.tick { flex: 1; background: #e0e0e0; transition: background 0.4s; }
.tick.on { background: #111; }
section { min-height: 100vh; scroll-snap-align: start;
  display: flex; align-items: center; justify-content: center;
  padding: 60px 40px; }
section:nth-child(even) { background: #f5f5f2; }
.inner { max-width: 560px; }
h1 { font-size: clamp(28px, 5vw, 48px); font-weight: 700;
  line-height: 1.1; margin-bottom: 16px; }
p { font-size: 17px; line-height: 1.6; color: #444; }
</style>
</head>
<body>
<div class="progress">
  <div class="tick"></div><div class="tick"></div>
  <div class="tick"></div><div class="tick"></div>
  <div class="tick"></div>
</div>

<section><div class="inner">
  <h1>Slide one</h1>
  <p>Your opening. Set context.</p>
</div></section>

<section><div class="inner">
  <h1>Slide two</h1>
  <p>Build on the premise.</p>
</div></section>

<section><div class="inner">
  <h1>Slide three</h1>
  <p>The key insight or data point.</p>
</div></section>

<section><div class="inner">
  <h1>Slide four</h1>
  <p>Implications or next steps.</p>
</div></section>

<section><div class="inner">
  <h1>Slide five</h1>
  <p>Close it out.</p>
</div></section>

<script>
(function() {
  var sections = document.querySelectorAll('section');
  var ticks = document.querySelectorAll('.tick');
  var current = 0;

  var obs = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        current = Array.from(sections).indexOf(entry.target);
        ticks.forEach(function(t, i) {
          t.classList.toggle('on', i <= current);
        });
      }
    });
  }, { threshold: 0.5 });
  sections.forEach(function(s) { obs.observe(s); });

  document.addEventListener('keydown', function(e) {
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      e.preventDefault();
      sections[Math.min(current + 1, sections.length - 1)].scrollIntoView({ behavior: 'smooth' });
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      e.preventDefault();
      sections[Math.max(current - 1, 0)].scrollIntoView({ behavior: 'smooth' });
    }
  });
})();
</script>
</body>
</html>
```

40 lines of meaningful code. no build step, no dependencies. it just works.

</div>

---

<div class="mw6 center tl mb4">

### the narrative template

this is what I use for presenting research findings. it adds a dark hero panel, reveal animations on scroll, light/dark alternation, and a chapter number in the corner.

```html
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Narrative Deck</title>
<style>
* { box-sizing: border-box; margin: 0; padding: 0; }
:root { --fg: #111; --fg-dim: #666; --bg: #fff; --bg-alt: #f5f5f2; }
html { scroll-snap-type: y mandatory; scroll-behavior: smooth; }
body { font-family: -apple-system, BlinkMacSystemFont, sans-serif;
  color: var(--fg); background: var(--bg); }

.progress { position: fixed; top: 0; left: 0; right: 0; z-index: 100;
  display: flex; gap: 3px; padding: 0 24px; height: 3px; }
.tick { flex: 1; background: #e8e8e8; transition: background 0.5s; }
.tick.on { background: var(--fg); }
.tick.on-inv { background: #fff; }

section { min-height: 100vh; scroll-snap-align: start;
  display: flex; align-items: center; justify-content: center;
  padding: 80px 40px; position: relative; }
section.dark { background: #111; color: #fff; }
section.gray { background: var(--bg-alt); }
.inner { max-width: 640px; width: 100%; }

/* Hero */
.hero { justify-content: flex-end; align-items: flex-start;
  padding-bottom: 80px; background: #111; color: #fff; }
.hero h1 { font-size: clamp(32px, 6vw, 56px); font-weight: 700;
  line-height: 1.08; margin-bottom: 16px; }
.hero p { font-size: 17px; color: #999; max-width: 440px; line-height: 1.6; }

/* Chapter label */
.ch-num { font-size: clamp(64px, 12vw, 120px); font-weight: 700;
  color: #f0f0f0; line-height: 0.85; margin-bottom: 12px; }
section.dark .ch-num { color: #222; }

/* Reveal */
.reveal { opacity: 0; transform: translateY(30px);
  transition: opacity 0.6s ease, transform 0.6s ease; }
.reveal.visible { opacity: 1; transform: translateY(0); }

h2 { font-size: clamp(22px, 3.5vw, 32px); font-weight: 700;
  line-height: 1.15; margin-bottom: 12px; }
p { font-size: 17px; line-height: 1.65; color: var(--fg-dim); }
section.dark p { color: #aaa; }
</style>
</head>
<body>
<div class="progress">
  <div class="tick"></div><div class="tick"></div>
  <div class="tick"></div><div class="tick"></div>
  <div class="tick"></div>
</div>

<section class="hero dark">
  <div class="inner">
    <h1>Your title here</h1>
    <p>A subtitle or framing sentence that sets up the narrative arc.</p>
  </div>
</section>

<section>
  <div class="inner">
    <div class="ch-num reveal">01</div>
    <h2 class="reveal">The setup</h2>
    <p class="reveal">Context your audience needs before the insight lands.</p>
  </div>
</section>

<section class="dark">
  <div class="inner">
    <div class="ch-num reveal">02</div>
    <h2 class="reveal">The finding</h2>
    <p class="reveal">The core thing you learned. Make it concrete.</p>
  </div>
</section>

<section class="gray">
  <div class="inner">
    <div class="ch-num reveal">03</div>
    <h2 class="reveal">What it means</h2>
    <p class="reveal">Interpretation. Why should anyone care?</p>
  </div>
</section>

<section>
  <div class="inner">
    <div class="ch-num reveal">04</div>
    <h2 class="reveal">What's next</h2>
    <p class="reveal">Actions, open questions, or a call to discuss.</p>
  </div>
</section>

<script>
(function() {
  var sections = document.querySelectorAll('section');
  var ticks = document.querySelectorAll('.tick');
  var current = 0;

  // Reveal on scroll
  var revealObs = new IntersectionObserver(function(entries) {
    entries.forEach(function(e) { if (e.isIntersecting) e.target.classList.add('visible'); });
  }, { threshold: 0.15 });
  document.querySelectorAll('.reveal').forEach(function(el) { revealObs.observe(el); });

  // Track current panel + update progress
  var panelObs = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        current = Array.from(sections).indexOf(entry.target);
        var isDark = entry.target.classList.contains('dark');
        ticks.forEach(function(t, i) {
          t.classList.remove('on', 'on-inv');
          if (i <= current) t.classList.add(isDark ? 'on-inv' : 'on');
        });
      }
    });
  }, { threshold: 0.5 });
  sections.forEach(function(s) { panelObs.observe(s); });

  // Keyboard nav
  document.addEventListener('keydown', function(e) {
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      e.preventDefault();
      sections[Math.min(current + 1, sections.length - 1)].scrollIntoView({ behavior: 'smooth' });
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      e.preventDefault();
      sections[Math.max(current - 1, 0)].scrollIntoView({ behavior: 'smooth' });
    }
  });
})();
</script>
</body>
</html>
```

the hero panel grounds people — where am I, what is this. then numbered chapters give a sense of pacing and progress. the reveal animations mean content appears as you arrive, which helps when you're talking over it.

</div>

---

<div class="mw6 center tl mb4">

### the data deck

for when you need to show numbers. this one adds a stat callout pattern and a Chart.js slot (the only external dependency — a CDN script tag).

```html
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Data Deck</title>
<script src="https://cdn.jsdelivr.net/npm/chart.js@4/dist/chart.umd.min.js"></script>
<style>
* { box-sizing: border-box; margin: 0; padding: 0; }
:root { --fg: #111; --fg-dim: #555; --accent: #326891; }
html { scroll-snap-type: y mandatory; scroll-behavior: smooth; }
body { font-family: -apple-system, BlinkMacSystemFont, sans-serif; color: var(--fg); }

.progress { position: fixed; top: 0; left: 0; right: 0; z-index: 100;
  display: flex; gap: 3px; padding: 0 24px; height: 3px; }
.tick { flex: 1; background: #e8e8e8; transition: background 0.4s; }
.tick.on { background: var(--fg); }

.slide-count { position: fixed; bottom: 24px; right: 24px; font-size: 13px;
  color: #999; font-weight: 600; z-index: 100; }

section { min-height: 100vh; scroll-snap-align: start;
  display: flex; align-items: center; justify-content: center; padding: 80px 40px; }
section:nth-child(even) { background: #f8f8f6; }
.inner { max-width: 640px; width: 100%; }

h1 { font-size: clamp(28px, 5vw, 44px); font-weight: 700; line-height: 1.1; margin-bottom: 12px; }
h2 { font-size: 24px; font-weight: 700; margin-bottom: 16px; }
p { font-size: 17px; line-height: 1.6; color: var(--fg-dim); }

.stat-row { display: flex; gap: 32px; margin: 24px 0; }
.stat { text-align: center; }
.stat-num { font-size: 48px; font-weight: 700; color: var(--accent); line-height: 1; }
.stat-label { font-size: 13px; color: var(--fg-dim); margin-top: 6px; }

.chart-wrap { max-width: 500px; margin: 24px auto; }
</style>
</head>
<body>
<div class="progress">
  <div class="tick"></div><div class="tick"></div>
  <div class="tick"></div><div class="tick"></div>
</div>
<div class="slide-count"><span id="cur">1</span> / <span id="tot">4</span></div>

<section>
  <div class="inner">
    <h1>Title: the headline finding</h1>
    <p>One sentence of context so the audience knows where they are.</p>
  </div>
</section>

<section>
  <div class="inner">
    <h2>The numbers</h2>
    <div class="stat-row">
      <div class="stat"><div class="stat-num">73%</div><div class="stat-label">of launches</div></div>
      <div class="stat"><div class="stat-num">4.2</div><div class="stat-label">avg score</div></div>
      <div class="stat"><div class="stat-num">12</div><div class="stat-label">platforms</div></div>
    </div>
    <p>Brief interpretation of what the numbers mean together.</p>
  </div>
</section>

<section>
  <div class="inner">
    <h2>Distribution</h2>
    <div class="chart-wrap"><canvas id="chart1"></canvas></div>
    <p>What the shape of this chart tells you.</p>
  </div>
</section>

<section>
  <div class="inner">
    <h2>So what?</h2>
    <p>The implication. What should change based on this data.</p>
  </div>
</section>

<script>
(function() {
  var sections = document.querySelectorAll('section');
  var ticks = document.querySelectorAll('.tick');
  var curEl = document.getElementById('cur');
  var current = 0;

  var obs = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        current = Array.from(sections).indexOf(entry.target);
        curEl.textContent = current + 1;
        ticks.forEach(function(t, i) { t.classList.toggle('on', i <= current); });
      }
    });
  }, { threshold: 0.5 });
  sections.forEach(function(s) { obs.observe(s); });

  document.addEventListener('keydown', function(e) {
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      e.preventDefault();
      sections[Math.min(current + 1, sections.length - 1)].scrollIntoView({ behavior: 'smooth' });
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      e.preventDefault();
      sections[Math.max(current - 1, 0)].scrollIntoView({ behavior: 'smooth' });
    }
  });

  // Example chart
  new Chart(document.getElementById('chart1'), {
    type: 'bar',
    data: {
      labels: ['Low', 'Medium', 'High'],
      datasets: [{ data: [45, 35, 20], backgroundColor: ['#3f7f63', '#b87a00', '#555'] }]
    },
    options: { plugins: { legend: { display: false } },
      scales: { y: { beginAtZero: true } } }
  });
})();
</script>
</body>
</html>
```

the slide counter in the bottom-right is a small thing but it matters when someone asks "how many more slides?" during a meeting.

</div>

---

<div class="mw6 center tl mb4">

### the navigation pattern

all three templates share the same ~20 lines of JavaScript. here's the core of it:

```javascript
var sections = document.querySelectorAll('section');
var current = 0;

// track which section is visible
var obs = new IntersectionObserver(function(entries) {
  entries.forEach(function(entry) {
    if (entry.isIntersecting) {
      current = Array.from(sections).indexOf(entry.target);
    }
  });
}, { threshold: 0.5 });
sections.forEach(function(s) { obs.observe(s); });

// arrow keys advance
document.addEventListener('keydown', function(e) {
  if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
    e.preventDefault();
    sections[Math.min(current + 1, sections.length - 1)]
      .scrollIntoView({ behavior: 'smooth' });
  } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
    e.preventDefault();
    sections[Math.max(current - 1, 0)]
      .scrollIntoView({ behavior: 'smooth' });
  }
});
```

IntersectionObserver with `threshold: 0.5` means "when 50% of a section is visible, that's the current one." this is more reliable than scroll position math — it handles variable-height sections, works on mobile, and doesn't break when the browser chrome changes height.

the scroll behavior is `smooth` so transitions feel intentional. if you want instant jumps (more like Keynote), drop the `behavior` option.

</div>

---

<div class="mw6 center tl mb4">

### when to use this

I reach for this pattern when:

- the "slides" are really just structured prose — not complex layouts with precise positioning
- I want the content to also work as a scrollable document (someone can just read it top-to-bottom)
- I'm generating the content with an LLM and want one artifact, not a source file + export step
- I need version control (it's just an HTML file — git works)
- I want to iterate fast — edit text, refresh, present

I still use Keynote when I need speaker notes visible on a separate display, precise image placement, or builds/animations within a single slide. but honestly that's maybe 20% of the presentations I give now.

the other 80% are just documents I navigate with arrow keys.

</div>
