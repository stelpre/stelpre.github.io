# Personal Website — PRENTAKIS STELIOS

A single‑page portfolio with a quantum/algorithms visual identity. Built with plain HTML/CSS/JS and no dependencies. Deployed on GitHub Pages.

## 1) Quick start

- Edit text and links in `index.html` only where content appears. Keep existing tags.
- Change colors, radii, and shadows via tokens in `style.css` under `:root`.
- Background animation lives on a `<canvas>` and is controlled at the end of `index.html`.
- Put your CV at `assets/autoCV.pdf` and update the button link if you rename.
- Commit to `main` (or `master`). GitHub Pages updates automatically.

## 2) Structure

```

/
├─ index.html          # Content + small JS + background canvas code
├─ style.css           # Visual theme (tokens), layout, and animations
├─ assets/
│  └─ autoCV.pdf       # CV (replace with your file)
├─ teaching/           # Public handouts you link from Teaching section
│  ├─ algorithms1-hw1.pdf
│  ├─ discrete-sets-proofs.pdf
│  ├─ cpp-lab1.zip
│  ├─ cheatsheet-asymptotics.pdf
│  ├─ proofs-mini-guide.pdf
│  └─ cpp-style-guide.pdf
└─ README.md

````

## 3) Edit the hero

Open `index.html` → **HERO**:
```html
<h1 class="page-title">PRENTAKIS <span class="tight-break"></span> STELIOS</h1>
<p class="subtitle">NTUA ECE • Quantum algorithms &amp; complexity • C++</p>
````

Change text only. Keep the `<span class="tight-break">` for responsive wrapping.

## 4) Update contact + CV

In **Showcase → CV** card:

```html
<a class="btn primary" href="assets/autoCV.pdf">Download CV (PDF)</a>
<ul class="inline-icons">
  <li><a href="mailto:prentakistelios@gmail.com">Email</a></li>
  <li><a href="https://github.com/stelpre">GitHub</a></li>
  <li><a href="https://linkedin.com/in/stylianos-prentakis">LinkedIn</a></li>
</ul>
<p class="muted small">Athens, Greece · +30 698 185 5086</p>
```

Replace with your details. To rename your CV, place it under `/assets/` and change the `href`.

## 5) Post updates

In **Showcase → Updates**:

```html
<ul class="timeline">
  <li><time datetime="YYYY-MM-DD">Mon D, YYYY</time> Short note.</li>
</ul>
```

Newest goes on top. Use valid `datetime`.

## 6) Teaching materials

Place PDFs/ZIPs under `/teaching/` and link them:

```html
<ol class="list-docs">
  <li>
    <a class="doc" href="teaching/file.pdf">
      <span>Title</span>
      <span class="meta">note or due date</span>
    </a>
  </li>
</ol>
```

`Useful material` is a plain list of links. `Current courses` is a list of chips; add or remove `<li>` entries.

## 7) Projects and filters

Each project is a card with tags in `data-tags`:

```html
<article class="project card lift" data-tags="cpp complexity">
  <h3>SAT Solver</h3>
  <p>CDCL with VSIDS and clause learning.</p>
  <div class="links">
    <a href="https://github.com/...">Repo</a>
    <a href="#">Demo/Write-up</a>
  </div>
</article>
```

To add a new filter button, add a chip in the filters bar:

```html
<button class="chip" data-filter="newtag">New Tag</button>
```

Make sure at least one project card includes `newtag` inside its `data-tags`.

## 8) Theme and typography

Edit tokens in `style.css`:

```css
:root{
  --bg:#06070b;         /* page background */
  --surface:#0c0f17;    /* card background */
  --text:#e8ebf2;       /* primary text */
  --muted:#99a2b3;      /* secondary text */
  --accent:#54c5ff;     /* primary accent */
  --accent-2:#a78bfa;   /* secondary accent */
  --accent-3:#1de9d1;   /* tertiary accent */
}
```

Change these to recolor the site. Fonts are loaded in `<head>` via Google Fonts. The hero title uses Comfortaa; body uses Manrope.

## 9) Background animation

The background runs on a full-viewport `<canvas>`:

* Tune density with `N` (30–70 reasonable).
* Tune speed with `SPEED`.
* Adjust connection threshold `TH` inside the loop.
* Change line and node colors via `strokeStyle` and `fillStyle`.
* The animation respects `prefers-reduced-motion` and draws a single static frame when reduction is requested.

To disable animation:

* Remove the `<canvas id="bgfx">` element, and
* Remove the "Background FX" JS block at the end of `index.html`.

## 10) Accessibility

* Motion reduction is respected (IntersectionObserver animations and canvas throttled/disabled).
* Links have visible focus styles via default browser focus; you can extend them in CSS if desired.

## 11) Favicons and metadata

Place assets under `/assets/` and link them in `<head>`:

```html
<link rel="icon" href="assets/favicon.png">
<link rel="apple-touch-icon" href="assets/apple-touch-icon.png">
```

Update `<meta name="description">` for SEO.

## 12) Deployment (GitHub Pages)

* Repo → Settings → Pages → Branch: `main` → `/root`.
* For a custom domain, add a `CNAME` in DNS and set it in Pages settings.

## 13) Troubleshooting

* **Links 404**: check case-sensitive filenames and correct folder paths.
* **PDF won’t load**: ensure the file is pushed and path is `assets/...`.
* **Filters don’t work**: check that buttons have `data-filter` and cards include matching tags in `data-tags`.
* **Motion too heavy**: lower `N`, reduce `TH`, or switch to reduced motion.

```
```
