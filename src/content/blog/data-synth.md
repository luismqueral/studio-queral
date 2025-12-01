---
title: "DataSynth: Turn Any Dataset Into Sound"
description: "A client-side data sonification tool that transforms JSON, CSV, and GeoJSON into audio"
date: 2025-11-20
tags: ["creative-coding", "audio", "data-viz", "javascript"]
draft: false
---

I built [DataSynth](https://datasynth.vercel.app) because I wanted to *hear* data, not just see it.

## What It Does

DataSynth takes any dataset—earthquake magnitudes, exoplanet masses, stock prices—and maps it to sound. Bigger earthquakes become lower pitches. Distant planets get more reverb. You hear patterns that charts might miss.

```
Data Field          →    Audio Parameter
────────────────────────────────────────
earthquake.magnitude  →  frequency (pitch)
earthquake.depth      →  filter cutoff
earthquake.latitude   →  stereo pan
```

## Why Sonification?

Visualization has limits. Our eyes track ~10-15 data points before confusion sets in. But our ears can parse hundreds of simultaneous audio events—think of how easily you follow a conversation in a crowded room.

Sonification works especially well for:
- **Time series data** (hear trends as melodies)
- **Multi-dimensional data** (map dimensions to pitch, pan, effects)
- **Anomaly detection** (unusual data points *sound* wrong)

## The Tech Stack

I intentionally kept this framework-free:

| Technology | Purpose |
|------------|---------|
| Vanilla JS + ES6 Modules | No build step needed |
| Web Audio API | Native browser synthesis |
| D3.js | Node graph visualization |
| Tachyons CSS | Utility-first styling |

The whole thing is ~2000 lines of modular JavaScript. No React, no bundler, no npm install. Just open `index.html` and go.

## How It Works

The architecture follows a clean pipeline:

1. **Data Processor** — Parses JSON/CSV, finds interesting fields
2. **Parameter Mapper** — Analyzes variance, suggests optimal mappings
3. **Audio Engine** — 10 waveform types, real-time effects chain
4. **Patch Viz** — D3-powered node graph showing data→audio flow

The mapper is the interesting part. It doesn't just randomly assign fields to parameters—it analyzes each field's variance, uniqueness, and range, then suggests which audio parameters would best represent it.

## Try It

**Live demo:** [datasynth.vercel.app](https://datasynth.vercel.app)

**Source:** [github.com/luismqueral/data-synth](https://github.com/luismqueral/data-synth)

Load the USGS earthquake feed and hit play. You'll hear a week of global seismic activity in about 30 seconds. It's strangely meditative.

