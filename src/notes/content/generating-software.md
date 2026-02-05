You're not an engineer, but you can get an LLM to build something that works. Maybe even something that ships to production. That's a superpower—but it comes with responsibility.

The trick is knowing *what* to build this way, and what to leave to the engineers.

## Picking the Right Projects

Before you dive in, ask yourself: is this the kind of thing I should be building with an LLM? Here's a checklist:

| Criteria | What it means |
| :---- | :---- |
| **Standalone** | It lives on its own. No tangled dependencies with other systems. |
| **Single Purpose** | It does one thing well. Not a platform, not a suite—just a tool. |
| **Small Footprint** | An engineer could read the whole codebase in a few minutes and get it. |
| **Lower Risk** | If it breaks, nobody's day is ruined. Definitely not in prod for critical flows. |
| **Low Maintenance** | Once it works, it mostly keeps working. You're not babysitting it. |
| **Balanced Value** | Important enough to matter, safe enough to experiment with. |
| **Few Dependencies** | 0-2 external systems, max. Ideally nothing downstream depends on this. |
| **Simple Data** | Basic CRUD, forms, or read-only displays. Nothing fancy. |

If your project checks most of these boxes, you're in good territory.

One more thing: if your vibecoded project actually succeeds—if it delivers real value and people want more—it will probably need to be rebuilt properly. That's fine. You've just validated the idea with a working prototype. That's the whole point.

## Good Candidates

These are the kinds of projects where LLM-assisted building shines:

- **Prototypes and vision pieces** — Show what an interaction could feel like
- **Utility scripts** — Automate something tedious, run it from terminal
- **Static sites and landing pages** — Documentation, marketing, simple content
- **One-off browser extensions** — Scratch your own itch
- **Plugin development** — Figma, Obsidian, Adobe tools, etc.

## When to Stop and Get Help

Some things are harder than they look. If you see any of these, pause and loop in an engineer:

- **User accounts and authentication** — Security is not something to vibe through
- **API integrations** — Especially anything with sensitive data or rate limits
- **Anything with payments** — Just don't
- **Complex state management** — If you're confused, the code probably is too
- **Production systems that others depend on** — The stakes are different here

You're not trying to replace engineers. You're trying to prove ideas fast, unblock yourself, and ship things that would otherwise never get prioritized. Stay in your lane, and you'll be dangerous in the best way.
