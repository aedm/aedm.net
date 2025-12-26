---
title: 'Square Minus Square - A coding agent benchmark'
description: 'Examining how various AI coding assistants implement the same geometry-related task.'
pubDate: 2025-12-25
---

I tried several coding agents to implement the following task:

_There are two squares on a 2D plane, possibly overlapping. They are not axis-aligned and have different sizes. Write a function that triangulates the area of the first square minus the area of the intersection._

<div class="image-gallery">
  <figure>
    <img src="/blog/square-minus-square-2025-12-22/illustration-1.jpg" alt="Input: Two overlapping squares on a 2D plane" />
    <figcaption>
      <strong>1. Input</strong>
      <span>Function arguments are square positions, sizes, rotation.</span>
    </figcaption>
  </figure>
  <figure>
    <img src="/blog/square-minus-square-2025-12-22/illustration-2.jpg" alt="Calculate area: Find the blue square area minus intersection" />
    <figcaption>
      <strong>2. Calculate area</strong>
      <span>Find the area of the first (blue) square except the area of the intersection.</span>
    </figcaption>
  </figure>
  <figure>
    <img src="/blog/square-minus-square-2025-12-22/illustration-3.jpg" alt="Output: Triangulated area as list of 2D triangle vertices" />
    <figcaption>
      <strong>3. Output</strong>
      <span>Return the area as list of 2D triangle vertices.</span>
    </figcaption>
  </figure>
</div>


There is a single Rust function to be implemented in a standalone file, no dependencies:

```rust
pub fn generate(
    center1: [f32; 2], rotation1: f32, size1: f32,
    center2: [f32; 2], rotation2: f32, size2: f32,
) -> Vec<[f32; 2]> {
    // TODO
}
```

I made a little framework that displays results. It can capture screenshots and video footage.

Several coding agents were tasked to implement the function, and I did it myself without AI, too. Agents are encouraged to generate screenshots and examine them. 

I ran the test two times and picked the better result for each agent.


Video capture of the results:

<video controls playsinline>
  <source src="https://cdn.aedm.net/2025-12-22-sqs-article-1b-ff.mp4" type="video/mp4" />
</video>


More models:

<video controls playsinline>
  <source src="https://cdn.aedm.net/2025-12-22-sqs-article-2-ff.mp4" type="video/mp4" />
</video>


Some takeaways:
- To date, no LLM was able to solve the task successfully.
- Nearly all of the models generate screenshots and examine them to fix bugs. They are surprisingly good at it, top models identify real issues correctly. This highlights the importance of the feedback loop: always provide a way for the agent to check its own work.
- During development, I ran the test several times. There is no conclusive winner. Best models (Opus, Gemini 3 Pro, GPT 5.2) all came out on top sometimes. But sometimes they generate code that crashes.


Full code on [Github](https://github.com/aedm/square-minus-square).
