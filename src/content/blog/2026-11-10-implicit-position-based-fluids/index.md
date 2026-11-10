---
title: 'Implicit Position-Based Fluids - A coding agent benchmark'
description: 'Examining how various AI coding assistants implement a fluid simulation from a recent research paper.'
pubDate: 2026-11-10
---

I tried several coding agents to implement a recent graphics research paper:

_Implement the fluid simulation described in the white paper [Implicit Position-Based Fluids](https://graphics.cs.utah.edu/research/projects/ipbf/) (Diaz, Hsu, Montalvo-Ruiz, Giles, Yuksel — SIGGRAPH Asia 2025)._

TODO: exact prompt given to the agents.

IPBF is an incompressible SPH method from the University of Utah. Each time step minimizes a variational energy that pushes the fluid toward constant density, using a second-order implicit descent: every particle solves a small 3×3 Newton step, and all particles are updated in parallel with a relaxed Jacobi iteration. The paper claims it stays stable even at extreme time steps, where other methods like IISPH and DFSPH blow up, and that it compresses less than classic Position-Based Fluids.

This is a different kind of task than the [previous one](/blog/square-minus-square-2025-12-22/). Instead of a small, well-defined function, the agent has to read a paper, understand the math, and fill in the gaps the paper leaves open, like neighbor search and parameter choices.

TODO: language, framework, and what the harness provides (rendering, screenshots, video capture).

Several coding agents were tasked to implement the simulation. Agents are encouraged to generate screenshots and examine them.

TODO: number of runs per agent, and how the result was picked.


Video capture of the results:

<video controls playsinline>
  <source src="https://cdn.aedm.net/2026-11-10-ibpf.mp4" type="video/mp4" />
</video>


Some takeaways:
- TODO
- TODO
- TODO


Full code on [Github](TODO).

<div class="social-links">
  <span>Discuss article on</span>
  <div class="social-icons">
    <a href="TODO" target="_blank" rel="noopener noreferrer" aria-label="X">
      <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" fill="currentColor"/></svg>
    </a>
    <a href="TODO" target="_blank" rel="noopener noreferrer" aria-label="Bluesky">
      <svg viewBox="0 0 568 501" xmlns="http://www.w3.org/2000/svg"><path d="M123.121 33.664C188.241 82.553 258.281 181.68 284 234.873c25.719-53.192 95.759-152.32 160.879-201.21C491.866-1.611 568-28.906 568 57.947c0 17.346-9.945 145.713-15.778 166.555-20.275 72.453-94.155 90.933-159.875 79.748C507.222 323.8 536.444 388.56 473.333 453.32c-119.86 122.992-172.272-30.859-185.702-70.281-2.462-7.227-3.614-10.608-3.631-7.733-.017-2.875-1.169.506-3.631 7.733-13.43 39.422-65.842 193.273-185.702 70.281-63.111-64.76-33.89-129.52 80.986-149.071-65.72 11.185-139.6-7.295-159.875-79.748C9.945 203.659 0 75.291 0 57.946 0-28.906 76.135-1.612 123.121 33.664Z" fill="currentColor"/></svg>
    </a>
    <a href="TODO" target="_blank" rel="noopener noreferrer" aria-label="Mastodon">
      <svg viewBox="0 0 448 512" xmlns="http://www.w3.org/2000/svg"><path d="M433 179.11c0-97.2-63.71-125.7-63.71-125.7-62.52-28.7-228.56-28.4-290.48 0 0 0-63.72 28.5-63.72 125.7 0 115.7-6.6 259.4 105.63 289.1 40.51 10.7 75.32 13 103.33 11.4 50.81-2.8 79.32-18.1 79.32-18.1l-1.7-36.9s-36.31 11.4-77.12 10.1c-40.41-1.4-83-4.4-89.63-54a102.54 102.54 0 0 1-.9-13.9c85.63 20.9 158.65 9.1 178.75 6.7 56.12-6.7 105-41.3 111.23-72.9 9.8-49.8 9-121.5 9-121.5zm-75.12 125.2h-46.63v-114.2c0-49.7-64-51.6-64 6.9v62.5h-46.33V197c0-58.5-64-56.6-64-6.9v114.2H90.19c0-122.1-5.2-147.9 18.41-175 25.9-28.9 79.82-30.8 103.83 6.1l11.6 19.5 11.6-19.5c24.11-37.1 78.12-34.8 103.83-6.1 23.71 27.3 18.4 53 18.4 175z" fill="currentColor"/></svg>
    </a>
  </div>
</div>
