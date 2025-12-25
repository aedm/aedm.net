---
title: 'Square Minus Square - A coding agent benchmark'
description: 'Examining how various AI coding assistants implement the same geometry-related task.'
pubDate: 2025-12-25
---

I tried several coding agents to implement the following task:

_There are two squares on a 2D plane, possibly overlapping. They not axis-aligned and have different sizes. Write a function that triangulates the area of the first square minus the area of the intersection._

<div class="image-gallery">
  <figure>
    <img src="/blog/square-minus-square-2025-12-22/illustration-1.jpg" alt="Input: Two overlapping squares on a 2D plane" />
    <figcaption>
      <strong>Input</strong>
      <span>Function arguments are square positions, sizes, rotation.</span>
    </figcaption>
  </figure>
  <figure>
    <img src="/blog/square-minus-square-2025-12-22/illustration-2.jpg" alt="Calculate area: Find the blue square area minus intersection" />
    <figcaption>
      <strong>Calculate area</strong>
      <span>Find the area of the first (blue) square except the area of the intersection.</span>
    </figcaption>
  </figure>
  <figure>
    <img src="/blog/square-minus-square-2025-12-22/illustration-3.jpg" alt="Output: Triangulated area as list of 2D triangle vertices" />
    <figcaption>
      <strong>Output</strong>
      <span>Return the area as list of 2D triangle vertices.</span>
    </figcaption>
  </figure>
</div>

