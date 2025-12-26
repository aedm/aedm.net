---
title: 'Square Minus Square - A coding agent benchmark'
description: 'Examining how various AI coding assistants implement the same geometry-related task.'
pubDate: 2025-12-25
---

I tried several coding agents to implement the following task:

_There are two squares on a 2D plane, possibly overlapping. They are not axis-aligned and have different sizes. Write a function that triangulates the area of the first square minus the area of the intersection. Use the least amount of triangles._

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
- Gemini 3 Flash might seem to have solved the task well but it adds unnecessary vertices and triangles.


Full code on [Github](https://github.com/aedm/square-minus-square).

<div class="social-links">
  <span>Discuss article on</span>
  <div class="social-icons">
    <a href="https://x.com/GaborGyebnar/status/2004499189598974166" target="_blank" rel="noopener noreferrer" aria-label="X">
      <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" fill="currentColor"/></svg>
    </a>
    <a href="https://bsky.app/profile/did:plc:yttdaoeooujhurpzxdbckdae/post/3mauzmdagsc27" target="_blank" rel="noopener noreferrer" aria-label="Bluesky">
      <svg viewBox="0 0 568 501" xmlns="http://www.w3.org/2000/svg"><path d="M123.121 33.664C188.241 82.553 258.281 181.68 284 234.873c25.719-53.192 95.759-152.32 160.879-201.21C491.866-1.611 568-28.906 568 57.947c0 17.346-9.945 145.713-15.778 166.555-20.275 72.453-94.155 90.933-159.875 79.748C507.222 323.8 536.444 388.56 473.333 453.32c-119.86 122.992-172.272-30.859-185.702-70.281-2.462-7.227-3.614-10.608-3.631-7.733-.017-2.875-1.169.506-3.631 7.733-13.43 39.422-65.842 193.273-185.702 70.281-63.111-64.76-33.89-129.52 80.986-149.071-65.72 11.185-139.6-7.295-159.875-79.748C9.945 203.659 0 75.291 0 57.946 0-28.906 76.135-1.612 123.121 33.664Z" fill="currentColor"/></svg>
    </a>
    <a href="https://mastodon.gamedev.place/@aedm/115785257958506407" target="_blank" rel="noopener noreferrer" aria-label="Mastodon">
      <svg viewBox="0 0 448 512" xmlns="http://www.w3.org/2000/svg"><path d="M433 179.11c0-97.2-63.71-125.7-63.71-125.7-62.52-28.7-228.56-28.4-290.48 0 0 0-63.72 28.5-63.72 125.7 0 115.7-6.6 259.4 105.63 289.1 40.51 10.7 75.32 13 103.33 11.4 50.81-2.8 79.32-18.1 79.32-18.1l-1.7-36.9s-36.31 11.4-77.12 10.1c-40.41-1.4-83-4.4-89.63-54a102.54 102.54 0 0 1-.9-13.9c85.63 20.9 158.65 9.1 178.75 6.7 56.12-6.7 105-41.3 111.23-72.9 9.8-49.8 9-121.5 9-121.5zm-75.12 125.2h-46.63v-114.2c0-49.7-64-51.6-64 6.9v62.5h-46.33V197c0-58.5-64-56.6-64-6.9v114.2H90.19c0-122.1-5.2-147.9 18.41-175 25.9-28.9 79.82-30.8 103.83 6.1l11.6 19.5 11.6-19.5c24.11-37.1 78.12-34.8 103.83-6.1 23.71 27.3 18.4 53 18.4 175z" fill="currentColor"/></svg>
    </a>
  </div>
</div>
