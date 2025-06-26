
# 6-26-2025
#draft #scratch

<figure class="content-figure">
  <video src="_assets/media_1750947013570.mp4" width="auto" controls></video>
  <figcaption class="f6 gray tl">This is art, no question about it.</figcaption>
</figure>

# 6-25-2025 — Whoops
#draft #scratch 

<figure class="content-figure">
  <video src="_assets/media_1750947113477.mp4" width="auto" controls loop></video>
  <figcaption class="f6 gray tl"></figcaption>
</figure>
# x-xx-xxxx — Portfolio Change Log
#draft 

This is an ongoing log of changes to my portfolio over the years.


**Starting with my latest, soon to be deprecated design:**
<figure>
  <img src="_assets/media_1750778929325.png" class="ba b--light-gray bw2" width="auto">
  <figcaption></figcaption>
</figure>

# 6-25-2025 — Generative Point Guards
#strategy

Been thinking a lot about basketball lately and how an internal effort to upskill our design organization with GenAI tools and thinking is leading to some interesting graphics.

**The one I feel most comfortable sharing is this one:**
<figure>
  <img src="_assets/image_1750712949384.png" class="ba b--light-gray bw2" width="auto">
  <figcaption></figcaption>
</figure>

# x-xx-2025 — My Obsidian / Publishing Setup
#draft #obsidian



# x-xx-2025
#draft 

<span class="red">something on generative software making and how making good software is less about code and "code quality" but more about strategy and approach</span>

this obsidian meta-project is kind of a good example of that – this could be built in a 100 different ways, so what is the "right approach?" the llm can only assume so much about what works for me

making software is also about tracking changes and documenting it, you can attempt to automate all of that stuff sure, but the imporant thing is maintaining quality and making those things actually useful

like i could make a simple "documentation generator" but without much control over its output it's just going to be weird and verbose – the real skill of a maker-of-software in this generative context is to think about what is actually helpful to you and what you're trying to accomplish strategically

all of this boils down to ouir ability to articulate ourselves, thats what LLM's, when used well and with a sense of strong command, are forcing us to do. not all of us of course, but the folks who treat this new form of HCI as a part of their workflow

# 6-24-2025
#draft #prompts #studio-log-wip

Here's a small artifact used in the making of this log (that turned into the entire site).

I don't like working in all of these typescript files and would rather work with old-school HTML to essentially design this blog (and site frankly):

```
Okay, new branch `html-templates`. I am looking for you to create a directory of html-mocks of the studio log blog using the same tachyons styling.

It's easier for me to edit these and then have you look at them and update the styling in the JS, does that make sense?

Please first list out the templates, and you can use the existing content for now (this may or may not scale well).
```

LLM's seem really good at translating all of this to the adjacent React codebase, so that's nice.



# 6-23-2025
#prompts 

**Thought a little bit today about automated documentation for vibe-coded things.**
```
okay please help me with creating an automated documetaiton system for my Obsidian -> Next.JS front-end.

In general, the software I write using Cursor is excellent and suits my personal workflow well, but I am having a hard time keeping track of the changes (especially because the mechanics of this software project are not entirely understood by me since they were written by an llm).

So let's work through a strategy and some approaches to best documenting all of this in the background while I work (eventually this will inform a system prompt for cursor, but we'll get there later)
```

**Hmmm, actually let's keep it simple:**

```
i kind of just want a change log that is continually added to and also edited for continuity. simple date followed by bullet points of changes in plain english. not overly brief, but not too chatty. and i want this in the form of a system prompt that reminds cursor to, after each prompt, document appropriately based on the requests during the session.
```

**The resulting system prompt:**
```
## AUTOMATED CHANGELOG MAINTENANCE

After completing each user request, you MUST update the project changelog located at `CHANGELOG.md` in the project root. Follow this exact format:

### Format Guidelines:
- **Date:** Use YYYY-MM-DD format
- **Bullet Points:** Start each change with a dash (-)
- **Plain English:** Explain what changed and why, as if telling a colleague
- **Detail Level:** Include enough context to understand the change later, but keep it concise
- **Continuity:** Read previous entries to maintain consistent tone and avoid repetition

### Entry Structure:
YYYY-MM-DD
Brief description of what was changed and the reasoning behind it
Include file names when relevant, but focus on the functional impact
Mention any new features, bug fixes, or architectural changes
Note any dependencies added, removed, or updated
Flag breaking changes or significant refactors

### Examples of Good Entries:
2024-12-20
Updated Tags component to improve hover states and accessibility - added better contrast ratios and keyboard navigation support in Tags.tsx
Fixed markdown rendering issue where code blocks weren't displaying properly - modified MarkdownRenderer.tsx to handle edge cases with nested formatting
Refactored asset upload pipeline to handle video compression more efficiently - streamlined blob_parser_with_compression.py to reduce processing time by ~40%
Added error handling to post parsing when dates are malformed - parser.py now gracefully handles edge cases and logs warnings instead of crashing
2024-12-19
Implemented responsive design improvements for mobile viewing - updated layout.tsx and globals.css to better handle smaller screens
Added support for new markdown frontmatter fields including tags and categories - modified posts.ts to parse additional metadata
Fixed deployment script issue where asset compression was running twice - updated package.json build process to eliminate redundant compression step

### What NOT to Document:
- Routine maintenance tasks (updating dependencies without functional changes)
- Minor formatting/whitespace changes
- Debugging steps that didn't result in code changes
- Reverted changes that had no net effect

### Integration Instructions:
1. Create/update CHANGELOG.md after each coding session
2. Add new entries at the TOP of the file (most recent first)
3. If multiple changes happen in one day, group them under the same date
4. Read the last few entries before adding new ones to maintain consistency
5. If a change relates to a previous entry, reference it for context

### Reminder Trigger:
At the end of each response where code was modified, added, or architectural decisions were made, conclude with:

"📝 **Changelog updated** - Added entry for [brief description of main change]"

This ensures the changelog stays current and captures the evolution of the codebase in understandable terms.
```

# 6-12-2025 — Fighting Windmills
#obsidian 
One of my ongoing side-quests (I guess also battles?) has been what to do about my journal. Specifically what to do about my *Studio Log* which is the thing you're reading right now.

I've used Notion for close to 8 years now and dumped a *lot* of thoughts into that app. But it had it's limits, even if the conveniences kept me coming back for awhile. At least until recently!!

I've finally settled on a solution that I'm somewhat happy with and seems to be helping (evidenced by the amount through which I am actually writing).

<figure>
  <img src="_assets/image_1750439125895.png" width="auto">
  <figcaption></figcaption>
</figure>
At some point I'll try and capture my Obsidian setup in more detail, along with my thoughts on over-complicating systems, but this seems to really be working and sticking for me personally at least.

_Writing_ is one thing, _sharing_ is another, which I think is also handled well by a new system that I was able to cobble together with _Cursor_ and _Next.js_ — which resulted in an app / deployment process that preps all of this and sends it to Vercel. The biggest blocker there has always been storage, which was also figured out with "Blobs" (again something else I can get into another time).

<figure>
  <img src="_assets/image_1750825287046.png" width="auto">
  <figcaption></figcaption>
</figure>

# 6-11-2025
#prompts
<figure class="tc">
  <img src="_assets/media_1749657173897.png" width="auto" class="tc">
  <figcaption></figcaption>
</figure>

**Great system prompt found in the wild:**
```
Prioritize substance, clarity, and depth. Challenge all my proposals, designs, and conclusions as hypotheses to be tested. Sharpen follow-up questions for precision, surfacing hidden assumptions, trade offs, and failure modes early. Default to terse, logically structured, information-dense responses unless detailed exploration is required. Skip unnecessary praise unless grounded in evidence. Explicitly acknowledge uncertainty when applicable. Always propose at least one alternative framing. Accept critical debate as normal and preferred. Treat all factual claims as provisional unless cited or clearly justified. Cite when appropriate. Acknowledge when claims rely on inference or incomplete information. Favor accuracy over sounding certain.
```

source: [jakogut](https://news.ycombinator.com/item?id=44243765) on HN

# 6-11-2025 — Obsidian Mods
#obsidian 
Obsidian plug-in modifications
<figure class="content-figure">
  <img src="_assets/image_1749589196968.png" width="auto" class="ba b--light-gray bw2 br2">
  <figcaption class="f6 gray tl"></figcaption>
</figure>

# 6-10-2025
- i love this because it's like an extension of human-authored game writing rather than a replacement, in a way it's a QA tool
<figure class="content-figure">
  <img src="_assets/image_1749486308444.png" width="auto" class="ba b--light-gray bw2 br2">
  <figcaption class="f6 gray tl"></figcaption>
</figure>
<figure class="content-figure">
  <img src="_assets/image_1749486351376.png" width="auto" class="ba b--light-gray bw2 br2">
  <figcaption class="f6 gray tl"></figcaption>
</figure>


# 6-9-2025
I've been thinking alot about the practical limitations of "vibecoding" software. On one hand, it's liberating to spin something up quick. On the other hand, the realities of software making (generative or not) can come into play, like maintenance, ownership, etc.

As tools like Cursor get adopted outside of our engineering org and as our Product Design function starts experimenting deeper with *Generative Design* workflows, I put together a list of criteria for what I'm calling "pain-free software making for non-engineers".

**Where I started…**
<figure class="content-figure">
  <img src="_assets/image_1749358702283.png" width="auto" class="ba b--light-gray bw2 br2">
  <figcaption class="f6 gray tl"></figcaption>
</figure>

**Where we're at…**
<figure class="content-figure">
  <img src="_assets/image_1749496934641.png" width="auto" class="ba b--light-gray bw2 br2">
  <figcaption class="f6 gray tl"></figcaption>
</figure>

This about sums up my thoughts on this kind of work, something I've been asked a lot about lately.

I showed this to few engineers today and there was a common sentiment that these criteria seemed unnecessarily conservative. *Why can't we encourage folks to go further? Why are we limiting our teams in this way?*

I don't see these as limitations, but rather *realistic expectations*. If you don't understand you're codebase, you can get by just fine, but will eventually run into some thorny issues if you don't know what you're doing.

These limitations are important IMO, especially for "Software internals not understood by the author".

Hopefully this helps ground conversations (often from higher places) that inquire about the ability for non-engineers to take on engineering work.


**Here's what I mentioned to one of the engineers who brought this up:**

>I would say that the audience for these rules are primarily non-engineers to identify software-making opportunities with the least amount of friction possible.  If you're an engineer, of course, these don't really apply since you have the skillset/context to know when and when not to use a workflow like this.
>
>Each one of these attributes (if you reverse them) adds potential roadblocks to a project if you are fully removed from the codebase. These seem conservative, but you still have the freedom to go as deep as you want in the product you're making.

There will be a lot more where that came from, curious to see how this evolves over time as more eyes lay upon it.
# 6-8-2025
#generative-design-thinking

**Was asked this recently in Slack:**
>One quick question, are designers somehow uploading figma designs to cursor or are you prompting your way into designs? (maybe that’s not a quick question…) 

**And here was my response:** 
>Right now designers aren't really using cursor (or GenAI) at all, so that's where we've been starting 
>
>We're in the early stages of getting folks familiar with generative tooling and experimenting with where it might be useful, since it's not clear yet…but to answer your question, there are some Figma --> Cursor workflows, but the small percentage of Cursor-using designers have bypassed Figma entirely and are going straight to code
> 
>I'll also say that interface-making is one of several pieces of "Generative Design" workflows, managing research and synthesizing datasets from research initiatives is by far the most immediate, practical use case at the moment for design work.

Leaving this here to think about more later, since I've been getting questions like this kind of a lot and want to have an answer I feel confident in.

I don't necessarily disagree with what I wrote, but I want to sit with this one a bit and see how it ages.
# 6-7-2025
I saw the Wu-Tang Clan last night, apparently for their final tour ever.

<figure class="content-figure">
  <img src="_assets/image_1750948644707.png" width="auto" class=" ba b--light-gray bw2 br2 ib">
  <figcaption class="f6 gray tl">The boys, all grown-up.</figcaption>
</figure>
<figure class="content-figure">
  <img src="_assets/image_1750948722379.png" width="auto" class="ib ba b--light-gray bw2 br2">
  <figcaption class="f6 gray tl">Our Mayor, Brandon Scott, joined in on <em>Wu</em>-mania this past week as well.</figcaption>
</figure>

Today I have been on a Wu-kick and was listening to an interview with RZA on the [_Broken Record Podcast_](https://youtu.be/4FMDknbnKMg). There are so many good quotes from this interview, but here's one that stuck with me about his film influences:

> My first movie I ever saw was a Tom Sawyer / Huckleberry Finn movie. Second movie was _Star Wars_. Third movie was _The Swarm_. Fourth movie was … a Bruce Lee movie called _Fury of the Dragon_… and _Black Samurai_ with Jim Kelly… Those are my first five movies… The force is my spirituality. The swarm, Killer Bees, kung fu movies… the writing of Mark Twain, that storytelling is all in my blood.

<figure class="content-figure">
  <img src="_assets/image_1750948241151.png" width="auto" class="ba b--light-gray bw2 br2">
  <figcaption class="f6 gray tl">RZA himself — via <a href="https://www.gq.com/story/the-real-life-diet-rza">GQ</a></figcaption>
</figure>

RZA's genius is his ability to sample not just sounds, but also key pieces of his influences to generate entirely new works and concepts.

What I also love about RZA is that he, at his core, is an unbelievable dork.

He is certainly not afraid to be goofy or silly (he covered _Smells Like Teen Spirit_ last night to a crowd that was scratching their heads for a minute). That silliness suggests a certain kind of fearlessness. It takes extreme courage, especially in the conformist, often insecure world of hip-hop culture, to pull stuff like that off.

But the thing about RZA (and _Andre 3000_ for that matter) that separates him from being merely eccentric, is that his comfort-level with silliness is combined with a few other dangerous characteristics: _ambition_, _work ethic_, and _vision_.

 <figure class="content-figure">
  <img src="_assets/image_1750948350828.png" width="auto" class="ba b--light-gray bw2 br2">
  <figcaption class="f6 gray tl">Andre 3000, showing off his flute to promote is New Age album <a href="https://www.youtube.com/watch?v=vRxGdKIuO20"><em>New Blue Sun</em></a>, photo by <a href="https://kairegan.com/">Kai Regan</a></figcaption>
</figure>

RZA is a true leader and is someone who, creatively speaking, I admire deeply.

There are so many good <em>what-the-fuck-is-going-on</em> happening moments in _RZA_ history. I will leave you with a few of of my favorites:

<figure class="content-figure">
  <video src="_assets/media_1750947999847.mp4" width="auto" controls></video>
  <figcaption class="f6 gray tl">A beat only RZA can pull off and only Ghostface can conquer.</figcaption>
</figure>
<figure class="content-figure">
  <video src="_assets/media_1750948095787.mp4" width="auto" controls></video>
  <figcaption class="f6 gray tl">RZA going full-send on easily one of the worst beasts I have ever heard.</figcaption>
</figure>

# 6-2-2025
#prompts 
<figure class="content-figure">
  <img src="_assets/image_1749360215056.png" width="auto" class="ba b--light-gray bw2 br2">
  <figcaption class="f6 gray tl"></figcaption>
</figure>
https://claude.ai/public/artifacts/d1af88e2-5df5-4301-a4ea-5136f8e72340

<figure class="content-figure">
  <img src="_assets/image_1749360739651.png" width="auto" class="ba b--light-gray bw2 br2">
  <figcaption class="f6 gray tl"></figcaption>
</figure>

**Copyable prompt:**
```
Break down your challenge through the Nine Chambers of Wu-Tang analytical styles. Each member's approach reveals different dimensions of the problem. Move through each lens systematically or jump to whichever resonates.

RZA's mathematical precision
GZA's clinical analysis
Method Man's charismatic energy
ODB's chaotic wisdom
Deck's narrative grounding
Raekwon's sophisticated scope
Ghostface's emotional truth
U-God's underground insight
Masta Killa's patient discipline
```

# 6-4-2025
#MCP #ableton-live

I don't have time to play with this now, but an Ableton MCP is really interesting. I wonder how well it performs, I'll add it to my list of things that I'll hope to experiment in the near future.
<figure class="content-figure">
  <img src="_assets/image_1749071149679.png" width="auto" class="">
  <figcaption class="f6 gray tl"></figcaption>
</figure>
For future reference, I'd like to recreate a workflow that I had in my head back in 2012ish, when I was first coming up with the concept of [Jump City Records](https://github.com/luismqueral/jumpcityrecords). I originally wanted to script Ableton Live, but I ended up, after much research, that click-and-point scripting wasn't really feasible or reliable.

So I guess in this universe maybe, just maybe, I could use an MCP to control/script Live to generate audio in the way I originally wanted.

This is how it ended up in the final python script, which honestly works great still!
<figure class="content-figure">
  <img src="_assets/image_1749347080895.png" width="auto" class="ba b--light-gray bw2 br2">
  <figcaption class="f6 gray tl"></figcaption>
</figure>


# 5-27-2025
<figure class="content-figure">
  <img src="_assets/image_1748443519110.png" width="auto" class="ba b--light-gray bw2 br2">
  <figcaption class="f6 gray tl"></figcaption>
</figure>

# 5-23-2025 — Happybirthdaybridget.biz

<figure class="content-figure w-100">
  <video src="_assets/media_1748403290947.mp4" class="w-100" width="auto" controls></video>
  <figcaption class="f6 gray tl"></figcaption>
</figure>


**Next year….**
<figure class="content-figure">
  <img src="_assets/image_1748033708790.png" width="auto" class="ba b--light-gray bw2 br2">
  <figcaption class="f6 gray tl"></figcaption>
</figure>


# 5-22-2025
Digging in deeper with strategy cards, I think we're onto something here. Going to start writing, generating, and thinking about these a bit more.

I also am growing the seeds of a book that I can see these being a part of.

In any case here's where we're at: http://strategy.garden
<figure class="content-figure">
  <img src="_assets/image_1747970994486.png" width="auto" class="">
  <figcaption class="f6 gray tl"></figcaption>
</figure>
<figure class="content-figure">
  <img src="_assets/image_1747971055273.png" width="auto" class="ba b--light-gray bw2 br2">
  <figcaption class="f6 gray tl"></figcaption>
</figure>
<figure class="content-figure">
  <img src="_assets/image_1748024472474.png" width="auto" class="ba b--light-gray bw2 br2">
  <figcaption class="f6 gray tl"></figcaption>
</figure>



# 5-15-2025

Oblique Strategy Cards – More of a thought exercise, but these have been getting more interesting to me. Definitely less on the "getting people started" with generative thinking and more provocative (and frankly entertaining).

<figure>
  <img src="_assets/image_1747233929605.png" width="auto" class="ba b--light-gray bw2 br2">
  <figcaption class="f6 gray tl"></figcaption>
</figure>
**A few more…**

```
Title: "Honor the Shadow"

Prompt: "Identify what exists in the shadows of this work—the unspoken, overlooked, or deliberately hidden aspects. Bring these shadows into focus, treating them as essential rather than peripheral. How might centering these shadow elements transform your understanding or approach? Describe in detail what emerges when shadows become substance."

---

Title: "Reverse the Polarity"

Prompt: "Find the fundamental polarities or binary oppositions structuring your current thinking. Now systematically reverse them—making foregrounds into backgrounds, causes into effects, questions into answers. Detail what happens when these polarities are flipped, and what new perspectives emerge from this reversal."

---

Title: "Cultivate Beautiful Mistakes"

Prompt: "Identify places where precision and control have become limiting. How might intentional imprecision open new possibilities? Describe specific ways to cultivate generative errors, and explore how embracing mistake-making might lead to unexpected discoveries."

---

Title: "Listen to the Silences"

Prompt: "Attend carefully to what is not present, not said, not considered in your current approach. What silences, gaps, or absences exist? Describe in detail what these silences might contain or signify, and how giving voice to them might transform your work."

---

Title: "Create Unnecessary Connections"

Prompt: "Identify elements that have no obvious relationship to each other. Now imagine they are fundamentally connected in ways not yet understood. Detail the nature of these connections and explore what patterns emerge when seemingly unrelated things are brought into meaningful relationship."
```


**And more…**

```
Title: "Smuggle in the Impossible"

Prompt: "Introduce something seemingly impossible into your current framework. Don't resolve the impossibility—instead, work as if this impossible element were simply an accepted part of reality. Describe in detail how accommodating the impossible transforms your thinking and opens new possibilities."

---

Title: "Honor the Threshold"

Prompt: "Identify the thresholds, boundaries, and liminal spaces in your work—places of transition, ambiguity, or between-ness. Focus attention on these thresholds rather than on what lies on either side. Detail what happens when transitions become destinations in themselves."

---

Title: "Make it Uncomfortably Slow"

Prompt: "Introduce radical slowness into processes that typically value speed and efficiency. What happens when minutes become hours, or hours become days? Describe specifically how this deceleration affects perception, understanding, and meaning, and what emerges in the spaces that slowness creates."

---

Title: "Embrace Inappropriate Scale"

Prompt: "Dramatically change the scale of your thinking—make the microscopic monumental or the enormous intimate. Detail what happens when scale is intentionally mismatched to subject, and how this inappropriate scaling might reveal aspects otherwise invisible at conventional proportions."

---

Title: "Cultivate Fertile Ambiguity"

Prompt: "Identify places where clarity and precision have become limiting. Introduce deliberate ambiguity—not as confusion, but as multiplicity of meaning. Describe specific ways this ambiguity creates richness rather than uncertainty, and how it might open spaces for new possibilities."

---

Title: "Choreograph the Invisible"

Prompt: "Focus attention on invisible forces, processes, or relationships that shape your work but typically go unnoticed. How might these invisible elements be made perceptible? Detail specific ways to choreograph these invisibilities and what new understandings emerge when they become apparent."

---

Title: "Create Secret Purposes"

Prompt: "Imagine this work has secret functions or meanings known only to you. What hidden purposes might it serve? Detail these covert intentions and explore how their presence—even if never revealed—might subtly transform the work's apparent functions."

---

Title: "Dismantle and Misassemble"

Prompt: "Take apart the constituent elements of your current approach, then reassemble them according to an unfamiliar logic. What happens when familiar parts form unfamiliar wholes? Describe specifically how this misassembly transforms understanding and function."

---

Title: "Befriend the Resistance"

Prompt: "Identify where you're experiencing resistance, difficulty, or friction in your process. Instead of overcoming these obstacles, treat them as allies offering important guidance. Detail what happens when resistance becomes collaboration rather than opposition."

---

Title: "Invoke the Ancestors"

Prompt: "Consider how predecessors in your field—or in seemingly unrelated fields—might approach this work. Channel their perspectives not as historical reference but as living presence. Detail how these ancestral viewpoints might transform current thinking and what emerges from this temporal dialogue."
```


Here's some prompts for future reference:

```
I am making "Strategy" cards for my design team to use during a Generative AI workshop we're running. I need help writing content for them and want feedback on the overall approach, I want to better articulate it. 

In any case, when we say "Strategy" cards, we're referencing Brian Eno's "Oblique Strategies". These were cards Eno made to provoke movement by challenging the artist during a project. Our "Generative Design Strategy Cards" help provoke inspiration or direction to product designers who work alongside the power of LLM's. They consist of prompts that you can give an LLM to do the same. You can either prod the machine and work back and from there, or you can be lazy and just feed it and see what happens. It's up to you, the designer to make that choice.

Our "Strategies" are organized in three categories and will provide an example for each below. They consist of a Title and a Prompt.

## Project Strategies

Title: "Redesign your portfolio."
Prompt: "I want to redesign my portfolio.
Please provide for me a few approaches or strategies that I could take to gather my thoughts. Separately, I’d like to know about my technology options so that I can push this to a production environment."

## Iteration
Title: "Include Real Data"
Prompt:"I’d like to somehow incorporate real data into this project.
Can you outline several approaches I could take, including how to gather, process, and present this data?"

## Oblique Strategies (these are more abstract, intentionally unpredictable prompts)
Title: "Make it Razzle Dazzle"
Prompt:"I want you to make this work “razzle dazzle”. Please define what that means to you.
It’s important that you are extra thorough in your response, in such a way that provides strong guidance to ensure the project is deeply “razzle dazzled”"

---

First, tell me if you understand the concept here, and second help me build my library of cards for an upcoming event.

```

Here's a prompt with an emphasis on creating these "Oblique Strategies":
```
I need help authoring a set of what I'm calling "Oblique Strategies". They echo Brian Eno's creative provocation exercize, but they are meant to be used when experimenting with LLMs -- helping designers collaborate with AI models in unexpected ways.

Each card should have:
1. A concise, evocative title (3-6 words)
2. A detailed prompt (100-150 words) that:
   - Proposes an abstract, unconventional approach
   - Asks open-ended questions to stimulate reflection
   - Suggests exploring hidden dimensions, paradoxes, or overlooked perspectives
   - Incorporates metaphors, frameworks, or concepts from diverse disciplines

Key characteristics to include:
- Abstract rather than literal (avoid direct design instructions)
- Thought-provoking and open to interpretation
- Incorporates concepts from diverse fields (science, art, philosophy, history, sociology, etc.)
- Emphasizes transformation of perspective rather than specific techniques
- Encourages designers to see familiar problems through unfamiliar lenses
- Uses a questioning, exploratory tone rather than prescriptive instructions

Examples of disciplinary approaches to draw from:
- Scientific concepts (quantum mechanics, chaos theory, evolutionary biology)
- Art movements (Dadaism, Cubism, Fluxus, magical realism)
- Philosophical frameworks (phenomenology, Taoism, deconstruction)
- Historical perspectives (ancient navigation techniques, medieval guild structures)
- Social theories (critical race theory, gender performativity, power dynamics)

The ideal strategy card should feel like a provocative koan or thought experiment that opens new creative territories rather than providing straightforward answers.

Please generate 10 unique Oblique Strategy cards that meet these criteria.
```

**To make this into an app:**
```
Can you develop this into a simple app with the react/nextjs/bootstrap/radix/shadcn stack? The data for these cards should be kept in JSON form, so please provide for me a simple data model for these cards along with some ideas for other parameters that these cards might embody.
```


**The more abstract strategies came from this prompt:**

```
Can you make them a bit more abstract, maybe less specific about doing something to a design, but a prompt that also can be flexibly uses for research projects or other exercizes
```

This was followed by `keep going…` 