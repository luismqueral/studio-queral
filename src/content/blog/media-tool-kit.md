---
title: "Media Tool Kit"
description: "My personal framework for LLM-driven media manipulation"
date: 2025-11-10
tags: ["tools", "ai", "media", "python", "ffmpeg", "cursor"]
draft: false
---

![Media Tool Kit](https://raw.githubusercontent.com/luismqueral/media-tool-kit/master/_app/mtk.png)

[Media Tool Kit](https://github.com/luismqueral/media-tool-kit) is my personal framework for media manipulation. It's designed for LLMs within generative coding environments to make modifications to images, sounds, and video quickly and consistently.

The idea is to quickly make edits to media by just asking for it.

*"Compress this video to 10MB"* or *"Remove transparency"*. That kind of stuff.

## The Secret Sauce: Cursor Rules

The real power isn't in the scripts—it's in the `.cursor/rules/` file that teaches the AI how to work within this environment. The rules establish:

**Core Principles:**
- Modular over monolithic — focused, reusable scripts rather than complex frameworks
- Direct tool usage — leverage ffmpeg, ImageMagick, SoX directly
- Keep it clean — organize work into projects, don't clutter the root
- Preserve originals — never modify source files in place

**The "Rule of Three":**

Don't abstract until you've done something three times:

1. **First time:** Just run the command, document in README
2. **Second time:** Copy/paste from previous project, adjust params
3. **Third time:** Now make a reusable script

This prevents over-engineering while capturing truly useful patterns.

**Automatic Project Organization:**

When I drop files in the root, the AI:
1. Assesses what I want to do
2. Creates a descriptive project folder in `projects/`
3. Sets up `input/` and `output/` directories
4. Does the work within that structure
5. Logs commands in a README for reproducibility

## Tools Used

This is a Python-centric workspace leveraging three battle-tested tools:

| Tool | Purpose |
|------|---------|
| **ffmpeg** | Video processing |
| **ImageMagick** | Image manipulation |
| **SoX** | Audio processing (the "Swiss Army knife" of audio) |

The rules include a reference of common operations for each—compress video, trim audio, batch resize images—so the AI doesn't have to figure out the syntax each time.

## Structure

```
media-tool-kit/
├── projects/           # Individual media processing projects
│   └── [project-name]/
│       ├── input/      # Original files
│       ├── output/     # Processed results
│       └── README.md   # Commands used, notes
├── scripts/            # Reusable utilities (when patterns emerge)
├── .cursor/rules/      # The AI's playbook
└── README.md
```

## Why This Approach Works

Most "AI coding" demos show you generating a React app. But the real productivity wins are in boring automation—the tedious tasks you do regularly but never bother scripting.

By encoding my preferences and workflow into Cursor rules, I've essentially trained a media processing assistant that:

- Knows my file organization preferences
- Uses the right tools for each job
- Documents everything for reproducibility
- Doesn't over-engineer solutions

It's less "AI writing code" and more "AI following my playbook."

**Source:** [github.com/luismqueral/media-tool-kit](https://github.com/luismqueral/media-tool-kit)
