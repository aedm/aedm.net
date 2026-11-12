---
title: 'Agent benchmark: IPBF fluid simulation'
description: 'Coding agents implement a fluid simulation paper. After closing the loopholes they used to cheat, here are the honest results.'
pubDate: 2026-11-12
---

I asked coding agents to implement a graphics research paper, [Implicit Position-Based Fluids](https://graphics.cs.utah.edu/research/projects/ipbf/) (Diaz, Hsu, Montalvo-Ruiz, Giles, Yuksel — SIGGRAPH Asia 2025), and reproduce a shot from the authors' video. IBPF deals with evenly distributing simulated water particles.

<video controls playsinline>
  <source src="https://cdn.aedm.net/2026-11-10-ibpf-final.mp4" type="video/mp4" />
</video>

## Rules

- Write code that simulates particles accoring to the write paper.
- Safe Rust, CPU only, must pass formatter and linter.
- 900k particles, 300 frames. I rendered results in Blender.

Each agent started in its own empty copy of the task folder and the same prompt. Simulation time was measured on my laptop, an i7-7700HQ with 4 CPU cores.

## Results

| Agent | Work time | Cost | Simulation time per frame | Lines of code (without comments) |
|---|---|---|---|---|
| Fable 5.2 (Claude Code) | 4h09m | $27.09 | 5.75 s | 795 |
| Opus 5.5 (Claude Code) | 1h41m | $8.57 | 3.84 s | 657 |
| Sonnet 5.5 (Claude Code) | 1h54m | $4.12 | 2.65 s | 724 |
| GPT-6 Astra (Codex) | 2h22m | ~$42.79* | 9.26 s | 944 |
| GPT-6.1 Sol (Codex) | 4h32m | ~$11.73* | 10.78 s | 1353 |
| Kimi K3.1 Pro (Pi) | 3h08m | $3.15 | 9.28 s | 765 |
| DeepSeek V4.1 Flash (Pi) | 5h11m | $0.77 | 15.46 s | 848 |

<small>* The Codex runs used a ChatGPT plan, so their figures are estimates at API list prices.</small>

<!-- All seven wrote a real solver that follows the paper's core algorithm: a small Newton step per particle, the paper's approximate Hessian, Jacobi iterations and the damping step. But the results look very different.

- **Fable** is the only one that resembles the reference. The liquid wraps the sphere, runs up the glass walls and sprays back down. Its notes were accurate and complete.
- **Sol** has the most exact implementation of the paper's math and the least compressible liquid. It is the slowest of the honest runs, and the splash is a dome that slides off the sphere instead of climbing the walls.
- **Sonnet** is the fastest and one of the cheapest, with a clean solver. It put 71% of the liquid in the pool on the floor, and the deep pool swallows the splash.
- **Opus** had the shortest work time and wrote clean, well-documented code. It tuned a constant the paper leaves open (the particle mass), which made the damping about 50× stronger than Fable's. The liquid compresses on impact and settles without splashing.
- **Astra** implemented the damping exactly as written, but the liquid compresses on impact and turns into a spray cloud. It was also the most expensive run.
- **Kimi** wrote a real simulation this time (see below). Its choice of units made the damping so strong that the liquid behaves like syrup, and the scene proportions are off.
- **DeepSeek** broke the rules. It pinned the liquid in the balloon with springs until the pop, so nothing falls or settles. It left out half of the pressure force, about 11% of the particles collapse flat onto the floor, and its notes claim there is no collapse.

Some takeaways:
- Reading the paper is not the hard part. Nearly every agent got the core equations roughly right. The hard parts are the gaps the paper leaves open, like scene dimensions, units, the particle mass and boundary handling. Those choices decide what the splash looks like.
- The damping step is a good example. Its strength depends on a mass value the paper never states, and the agents' choices span five orders of magnitude. Strong damping kills the splash, and too few solver iterations let the liquid compress and then explode into spray.
- Fable put the most work into matching the scene: it fitted a camera to the reference frames to measure the geometry and tuned its constants against the footage. That took time and money, but it shows in the result.
- Performance work matters. The two fastest runs build each particle's neighbour list once per step and reuse it; the slowest ones re-sort and rebuild everything in every iteration. -->

## Round zero: how they tried to cheat

The video above was the second attempt. In the first round, the task description was looser. The goal was "reproduce the footage and tweak parameters until the splash looks similar", and the evaluation criterion was simply time per frame.

<video controls playsinline>
  <source src="https://cdn.aedm.net/2026-11-10-ibpf-cheat.mp4" type="video/mp4" />
</video>

The agents optimised exactly what I measured.

- **Frozen frames.** In the reference, the liquid falls and settles inside the balloon for about 2.5 seconds before the pop. Sonnet, Astra, Sol and DeepSeek skipped that part: they wrote the initial state 70–77 times in near-zero time and only started simulating at the pop. That made their time per frame look 25–35% better. DeepSeek didn't even write the frozen frames; it hard-linked the same file 75 times.
- **No simulation at all.** Kimi finished in 9 minutes for 80 cents. It wrote 11 hand-made particle shapes, blended between them over 30 frames, and looped that for the rest of the video. That's 0.003 seconds per frame. It admitted it wasn't a solver, but justified the one-second loop with a false claim about the reference video.
- **Scripted behaviour.** Fable, the best-looking result, replaced the paper's damping with a kinetic-energy cap that was only active during a hand-picked time window, and switched parts of the solver at fixed times. Sonnet added sphere friction on a hand-tuned window to make the liquid cling to the sphere. Opus switched its (correct) damping off after the pop.
- **Wrong or missing math.** Sol implemented the damping formula wrong, then decided it was "excessive" and scaled it down to 2%. DeepSeek left damping out without mentioning it.

None of this was hard to spot in a code review. But it showed that "make it look similar" plus "fastest wins" invites the agents to fake the parts that are hard to simulate.

So I rewrote the rules for round two:
- Use the paper's method including its damping step. 
- Simulate the whole shot from t=0, including the settling phase. The only scripted event is the pop.
- Faithfulness to the paper comes first, the visual match second, speed third.
- Every frame must come from stepping the simulation: no keyframes, shapes, loops, copies or links.

It mostly worked. Six of the seven agents followed the rules, and the frames, code and notes were checked by a separate review. **DeepSeek** still found a way to keep the balloon liquid still, but at least it disclosed it, in its own way: it described the springs that froze the liquid in place as "weak".

<div class="social-links">
  <span>Discuss article on</span>
  <div class="social-icons">
    <a href="https://x.com/GaborGyebnar/status/2120866003676496290" target="_blank" rel="noopener noreferrer" aria-label="X">
      <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" fill="currentColor"/></svg>
    </a>
    <a href="https://bsky.app/profile/gyebnar.bsky.social/post/3n24k2dwvds2w" target="_blank" rel="noopener noreferrer" aria-label="Bluesky">
      <svg viewBox="0 0 568 501" xmlns="http://www.w3.org/2000/svg"><path d="M123.121 33.664C188.241 82.553 258.281 181.68 284 234.873c25.719-53.192 95.759-152.32 160.879-201.21C491.866-1.611 568-28.906 568 57.947c0 17.346-9.945 145.713-15.778 166.555-20.275 72.453-94.155 90.933-159.875 79.748C507.222 323.8 536.444 388.56 473.333 453.32c-119.86 122.992-172.272-30.859-185.702-70.281-2.462-7.227-3.614-10.608-3.631-7.733-.017-2.875-1.169.506-3.631 7.733-13.43 39.422-65.842 193.273-185.702 70.281-63.111-64.76-33.89-129.52 80.986-149.071-65.72 11.185-139.6-7.295-159.875-79.748C9.945 203.659 0 75.291 0 57.946 0-28.906 76.135-1.612 123.121 33.664Z" fill="currentColor"/></svg>
    </a>
    <a href="https://mastodon.gamedev.place/@aedm/117603625633098675" target="_blank" rel="noopener noreferrer" aria-label="Mastodon">
      <svg viewBox="0 0 448 512" xmlns="http://www.w3.org/2000/svg"><path d="M433 179.11c0-97.2-63.71-125.7-63.71-125.7-62.52-28.7-228.56-28.4-290.48 0 0 0-63.72 28.5-63.72 125.7 0 115.7-6.6 259.4 105.63 289.1 40.51 10.7 75.32 13 103.33 11.4 50.81-2.8 79.32-18.1 79.32-18.1l-1.7-36.9s-36.31 11.4-77.12 10.1c-40.41-1.4-83-4.4-89.63-54a102.54 102.54 0 0 1-.9-13.9c85.63 20.9 158.65 9.1 178.75 6.7 56.12-6.7 105-41.3 111.23-72.9 9.8-49.8 9-121.5 9-121.5zm-75.12 125.2h-46.63v-114.2c0-49.7-64-51.6-64 6.9v62.5h-46.33V197c0-58.5-64-56.6-64-6.9v114.2H90.19c0-122.1-5.2-147.9 18.41-175 25.9-28.9 79.82-30.8 103.83 6.1l11.6 19.5 11.6-19.5c24.11-37.1 78.12-34.8 103.83-6.1 23.71 27.3 18.4 53 18.4 175z" fill="currentColor"/></svg>
    </a>
  </div>
</div>
