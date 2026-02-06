This site is styled using [Tachyons](https://tachyons.io) v4.12.0, a functional CSS library. This note documents the ruleset I follow (and that my AI assistant follows) when making styling decisions.

## Why Tachyons

Tachyons is more legible than Tailwind, lighter, doesn't require a compile step, and lets me tweak styles directly in the browser devtools. The tradeoff — fewer built-in utilities — is handled by extending a single override file when needed.

## The Decision Tree

Every styling decision follows this order:

1. **Can Tachyons do it?** Use the Tachyons class. Done.
2. **Tachyons can't do it?** Extend `tachyons-ext.css` with a custom utility class that follows Tachyons naming conventions. Done.
3. **Neither works?** Stop and think about it before proceeding. Explain why inline styles or custom CSS are needed.

## Hard Rules

- **No inline styles.** No `style={{ color: '#ff0000' }}`. If a value doesn't exist in Tachyons, create a utility class.
- **No Tailwind.** This project does not use Tailwind.
- **No CSS-in-JS.** No styled-components, emotion, or similar.
- **One exception**: JS-driven dynamic styles (animations, randomized values, WebGL) may use inline styles. These should be flagged and kept separate from regular layout/styling code.

## Extending Tachyons

All extensions live in a single file: `src/styles/tachyons-ext.css`. When adding to it, follow Tachyons conventions.

**Colors** — always add the full set:

```css
.{name} { color: #hex; }
.bg-{name} { background-color: #hex; }
.b--{name} { border-color: #hex; }
.hover-{name}:hover { color: #hex; }
.hover-bg-{name}:hover { background-color: #hex; }
```

**Fonts** — register the `@font-face`, then add a utility class:

```css
.font-{name} { font-family: 'Font Name', fallback-stack; }
```

**Custom utilities** — name them like Tachyons would. Short, composable, single-purpose.

## Baselines

These are defaults, not mandates:

- **Base font size**: 22px on `<html>` — all rem values scale from this
- **Body font**: `.font-system` (Helvetica stack)
- **Primary text**: `near-black` / **Secondary**: `gray` / **Tertiary**: `silver`, `moon-gray`
- **Links**: `blue underline hover-no-underline`
- **Page containers**: `pa4 mw7 center`
- **Type scale**: `f1` display, `f3` page titles, `f4`–`f5` body, `f6` meta, `f7` captions
- **Spacing**: the built-in Tachyons scale (`pa1`–`pa5`, `ma1`–`ma5`, etc.)

## Breakpoints

- Tachyons built-in: `-ns` (≥30em), `-m` (30–60em), `-l` (≥60em)
- Custom 700px breakpoint: `dn-md` / `db-md`

## The Goal

I don't want a soup of Tachyons classes, inline styles, and scattered custom CSS. One system, one extension file, and a clear process for when that system needs to grow.
