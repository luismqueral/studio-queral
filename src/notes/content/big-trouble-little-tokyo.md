<div class="mw6 center tl mb4">

This week I made a personalized going away present for a friend who is sadly leaving our team at _The Times_.

**You can play it here:**

</div>

<div class="aspect-ratio aspect-ratio--16x9 mv4">
  <iframe src="https://docs.google.com/presentation/d/1ZpMtaNmbJCsKe9euchYP3WgJxBC8-a9fdq4xE2cd8Ow/embed?start=false&loop=false&delayms=3000" class="aspect-ratio--object" frameborder="0" allowfullscreen="true"></iframe>
</div>

<div class="mw6 center tl mb4">

### Why did I build this?

Not only did I want to do a nice thing for a good friend, I also wanted a technical and creative challenge.

I was actually in the middle of experimenting with the extent to which you can script a Google Slides deck template "design system" and series of title card color combinations when I realized... what if we made a game instead?

I used to fantasize about pushing a stupid medium like Powerpoint as far as possible, so maybe a quick little detour might scratch that itch.

And yeah, it's hard to build an argument to _not_ use HTML for a browser-based games, or interactive fiction for that matter. Twine, the defacto standard for building interactive fiction, exists (and rocks)...

But why not? Let's try it out.

</div>

---

<div class="mw6 center tl mb4">

### How did I build this?

To construct this from scratch in Google Slides would take forever and be a nightmare.

After some digging, I found that you can import `.pptx` files fairly successfully into Slides, and not only that, LLMs are decent enough at generating valid `.pptx` decks.

I used Cursor for the majority of the technical scaffolding, along with planning out a wide-ranging, interweaving story. Our weekly team syncs for the past few years have opened with icebreakers, so we used that as a contextual backdrop.

The theme was made manually in Google slides, but only consisted of a title card an intro, and the first scene. I mocked up a few buttons at the bottom and let the LLM interpolate out the rest of the UI.

</div>

---

<div class="mw6 center tl mb4">

### How does this work?

Ultimately, the deck above is the compiled output of [a single Python script](https://gist.github.com/luismqueral/486eede320c46b82c53c3a18ec3627c6), which I will attempt to break down as best I can.

The interconnected, branching nature of interactive fiction (decision trees, multiple endings, etc.) makes a project like extremely difficult to manage manually, which makes a scripting language attractive, even if I wasn't building this with an LLM.

![a gameplay slide from the game](/notes/big-trouble-little-tokyo/slide-gameplay.png)

#### The Story Graph

The entire game lives in a Python dictionary called `SCENES`.

Each entry is a "scene", which consists of a location, some text, and a list of choices that link to other scenes.

**Here are a few examples:**

```python
"arrival": {
    "location": "NARITA AIRPORT — TOKYO",
    "text": "Meg and Lauria step off the plane at Narita...",
    "choices": [
        ("Ignore the itinerary — explore Shinjuku", "tokyo_night"),
        ("Follow Lauria's plan to the letter", "pachinko"),
    ],
},
"pachinko": {
    "location": "SHINJUKU — PACHINKO PARLOR",
    "text": "The parlor is too-bright lights and a suspicious number...",
    "choices": [
        ("Try to give the winnings back", "the_grab"),
        ("Pocket the winnings and run", "the_grab"),
    ],
},
"fushimi_choice": {
    "location": "FUSHIMI INARI — UPPER GATES",
    "text": "Ten thousand vermillion torii gates march up the mountainside...",
    "choices": [
        ("Lauria calls a standup. With the yakuza.", "standup"),
        ("Sprint through all ten thousand gates.", "torii_sprint"),
        ("Take the side path to the bamboo grove.", "bamboo_grove"),
    ],
},
"ending_action": {
    "type": "ending",
    "ending_name": "THE FOOD PROCESSOR GAMBIT",
    "ending_class": "action",
    "text": "The battle of Matsumoto Castle will be spoken of in hushed tones...",
    "choices": [("Bon voyage, Meg!", "bon_voyage")],
},
```

`location` shows up as a dim label at the top of the slide. `text` fills the middle. `choices` becomes the buttons at the bottom.

That's it. The entire game is nested dictionaries and tuples.

There's also a `SCENE_ORDER` list that controls which slide each scene lands on. PowerPoint needs a linear sequence, but the order doesn't matter: slide 5 can jump to slide 30 or slide 2.

#### Building the Deck

The generator runs in two passes. Here's the actual loop:

```python
def main():
    prs = Presentation()
    prs.slide_width = Emu(SLIDE_W_EMU)
    prs.slide_height = Emu(SLIDE_H_EMU)

    slides_data = {}

    # --- PASS 1: BUILD ---
    for sid in SCENE_ORDER:
        scene = SCENES[sid]
        scene_type = scene.get("type", "scene")

        if scene_type == "title":
            slide, shapes = build_title_slide(prs, scene)
        elif scene_type == "instructions":
            slide, shapes = build_instructions_slide(prs, scene)
        elif scene_type == "ending":
            slide, shapes = build_ending_slide(prs, scene)
        elif scene_type == "bon_voyage":
            slide, shapes = build_bon_voyage_slide(prs, scene)
        else:
            slide, shapes = build_scene_slide(prs, scene)

        slides_data[sid] = {"slide": slide, "shapes": shapes}

    # --- PASS 2: LINK ---
    for sid in SCENE_ORDER:
        scene = SCENES[sid]
        source = slides_data[sid]["slide"]
        choice_shapes = slides_data[sid]["shapes"]
        for i, (_label, target_id) in enumerate(scene.get("choices", [])):
            if target_id in slides_data:
                add_hyperlink(
                    choice_shapes[i], source, slides_data[target_id]["slide"]
                )

    prs.save(OUTPUT_PATH)
```

**Pass 1** walks through `SCENE_ORDER`, routes each scene to the right builder by type, and stashes the slide object and its button shapes in a dict. 

**Pass 2** walks through again and wires each button to its target using `add_hyperlink`.

You can't link to a slide that doesn't exist yet, so you build everything first, then connect it.

Here's what happens inside `build_scene_slide`, the builder that handles the gameplay slides:

```python
def build_scene_slide(prs, scene):
    slide = prs.slides.add_slide(prs.slide_layouts[6])
    set_bg(slide)

    if "location" in scene:
        _txt(slide, MARGIN, 0.3, 5.0, 0.2,
             f"// {scene['location']}",
             font="IBM Plex Mono", size=LOCATION_PT, italic=True,
             color=C_LOCATION)

    line = slide.shapes.add_shape(
        1, Inches(MARGIN), Inches(ACCENT_Y),
        Inches(TEXT_W), Inches(0.003),
    )
    line.fill.solid()
    line.fill.fore_color.rgb = hex_to_rgb(C_ACCENT_LINE)
    line.line.fill.background()

    choices = scene.get("choices", [])
    n = len(choices)
    choice_area = n * CHOICE_H + max(0, n - 1) * CHOICE_GAP + 0.5
    text_h = SLIDE_H_IN - TEXT_TOP - choice_area

    _txt(slide, MARGIN, TEXT_TOP, TEXT_W, max(text_h, 1.5), scene["text"],
         size=SCENE_TEXT_PT, color=C_TEXT,
         line_sp=SCENE_LINE_SP, para_sp=SCENE_PARA_SP)

    shapes = place_choices(slide, choices)
    return slide, shapes
```

Layout 6 is a completely blank slide — no title placeholder, no footer, nothing.

The function adds a location label (the `// NARITA AIRPORT` text), draws a thin accent line, calculates how much vertical space the narrative text gets after accounting for the choice buttons, and then stacks the buttons at the bottom.

The text area height is dynamic: slides with three choices get less reading room than slides with two.

The story content is completely separate from the layout code, letting you rewrite the narrative without touching the generator.

#### Hyperlinks and pptx

`python-pptx` supports URL hyperlinks but not slide-to-slide jumps. That requires a PowerPoint protocol called `ppaction://hlinksldjump` that the library doesn't expose.

So, the script opens up the XML and writes it in by hand:

```python
def add_hyperlink(shape, source_slide, target_slide):
    rId = source_slide.part.relate_to(target_slide.part, RT_SLIDE)
    cNvPr = shape._element.find(f"{{{NS_P}}}nvSpPr/{{{NS_P}}}cNvPr")
    hlink = etree.SubElement(cNvPr, f"{{{NS_A}}}hlinkClick")
    hlink.set(f"{{{NS_R}}}id", rId)
    hlink.set("action", "ppaction://hlinksldjump")
```

Fun fact! A `.pptx` file is essentially a ZIP archive full of XML. You can rename it to `.zip`, unzip it, and read every slide as a text file.

This function registers a relationship between two slides, then adds a click action to the button shape. PowerPoint/Slides picks it up at runtime.

#### Layout

This part is logically straight forward, every slide follows the same structure:

```
┌──────────────────────────────────┐
│  // LOCATION NAME                │  ← top
│  ─────────────────────────────── │  ← accent line
│                                  │
│  Narrative text fills the        │  ← middle
│  remaining vertical space.       │
│                                  │
│  ┌──────────────────────────┐    │  ← buttons stack
│  │ ▸  Choice A              │    │    upward from bottom
│  ├──────────────────────────┤    │
│  │ ▸  Choice B              │    │
│  └──────────────────────────┘    │
└──────────────────────────────────┘
```

Buttons stack from the bottom up. the story text fills whatever vertical space is left.

#### Color

The whole palette lives at the top of the script:

```python
C_BG = "#121212"              # near-black background
C_TEXT = "#a3a3a3"            # default body text (medium gray)
C_TEXT_BRIGHT = "#f8f8f8"     # high-emphasis text
C_LOCATION = "#5a5a5a"        # the "// LOCATION" label
C_ACCENT = "#E2512D"          # vermillion — torii gate red
C_CHOICE_BG = "#1e1e1e"       # button fill color
C_CHOICE_BORDER = "#2a2a2a"   # button border
C_CHOICE_TEXT = "#d3d3d3"     # button label text
```

Each ending gets its own color bar at the top of the slide:

```python
C_ENDINGS = {
    "action":    {"bar": "#2a1200", "label": "#FFB74D"},   # amber
    "cerebral":  {"bar": "#081a2a", "label": "#64B5F6"},   # blue
    "negotiate": {"bar": "#0d2a1a", "label": "#81C784"},   # green
    "chase":     {"bar": "#1a0d2a", "label": "#CE93D8"},   # purple
}
```

The ending colors give each conclusion its own visual identity.

![one of the four endings](/notes/big-trouble-little-tokyo/slide-ending.png)

#### Final Thoughts

I had a blast building this.

A few things I learned:

- LLM's aside, using Python to "compile" narrative is fascinating to me. Stories can be deterministic systems, managed and modified in one way, and delivered in another.
- There is something beautiful about how limiting `.pptx` is as a file format. No JS, no state management just linking slides.
- The unexpectedness of [a game built in powerpoint](https://en.wikipedia.org/wiki/The_medium_is_the_message) is fun!

I'm looking forward to pushing this concept further with different mechanics and tricks, we'll see how far we can push it.

</div>
