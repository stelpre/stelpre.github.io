# Personal Website — PRENTAKIS STELIOS

Single-page site. Three parts: Showcase, Teaching, Projects. Built with plain HTML/CSS/JS. No dependencies.

Live with GitHub Pages.

---

## 1) Quick start

- Edit `index.html` for content.
- Edit `style.css` for colors, sizes, motion.
- Put your CV at `assets/autoCV.pdf`.
- Commit and push to `main` (or `master`). Pages updates automatically.

---

## 2) Repo layout

```

/
├─ index.html          # Page content + small JS
├─ style.css           # Visual theme + animations
├─ assets/
│  └─ autoCV.pdf       # Your CV (rename here and in index if you like)
├─ teaching/           # Files you hand out to students
│  ├─ algorithms1-hw1.pdf
│  ├─ discrete-sets-proofs.pdf
│  ├─ cpp-lab1.zip
│  ├─ cheatsheet-asymptotics.pdf
│  ├─ proofs-mini-guide.pdf
│  └─ cpp-style-guide.pdf
└─ README.md           # This file

````

Create folders with exact names. Case-sensitive.

---

## 3) Edit your name and subtitle (hero)

Open `index.html` → **HERO** section:
```html
<h1 class="page-title">PRENTAKIS <span class="tight-break"></span> STELIOS</h1>
<p class="subtitle">NTUA ECE Student • Maths &amp; Physics Tutor</p>
````

Change text only. Keep tags.

---

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

* Replace mail, GitHub, LinkedIn, phone as needed.
* To use a different CV filename: place it under `assets/` and change the `href`.

---

## 5) Write “Updates”

In **Showcase → Updates**:

```html
<ul class="timeline">
  <li><time datetime="2025-09-01">Sep 1, 2025</time> Tutoring Algorithms I.</li>
  <!-- Add newest first -->
</ul>
```

Rules:

* Newest at top.
* `datetime` must be `YYYY-MM-DD`.
* Display text can be short.

---

## 6) Teaching: add assignments and materials

Place files in `/teaching/`. Then link them:

**Assignments list**

```html
<ol class="list-docs">
  <li>
    <a class="doc" href="teaching/algorithms1-hw1.pdf">
      <span>HW1: Asymptotics and Recurrences</span>
      <span class="meta">due Oct 10, 2025</span>
    </a>
  </li>
  <!-- Duplicate <li> per new item -->
</ol>
```

**Useful material**

```html
<ul class="list-links">
  <li><a href="teaching/cheatsheet-asymptotics.pdf">Asymptotics cheatsheet</a></li>
  <!-- Add more <li> lines -->
</ul>
```

**Current courses chips**

```html
<ul class="chips">
  <li>Algorithms I</li>
  <li>Discrete Math</li>
  <li>C++ Programming</li>
</ul>
```

---

## 7) Projects: add cards and tags

Duplicate a project `article`:

```html
<article class="project card lift" data-tags="cpp systems">
  <h3>Tiny Compiler</h3>
  <p>Lexer, parser, and bytecode VM.</p>
  <div class="links">
    <a href="https://github.com/your/repo">Repo</a>
    <a href="https://your-demo">Demo</a>
  </div>
</article>
```

* `data-tags` controls filtering. Allowed tags out of the box: `theory`, `systems`, `cpp`, `python`.
* Add or remove filter buttons here:

```html
<div class="filters">
  <button class="chip" data-filter="all" aria-pressed="true">All</button>
  <!-- Add more buttons if you introduce new tags -->
</div>
```

---

## 8) Navigation and sections

Header links scroll to sections:

* `#showcase`, `#teaching`, `#projects`, `#contact`

Add a new section:

1. Create a `<section id="newid" class="section reveal">…</section>`.
2. Add a `<a href="#newid">` link in the header nav.

---

## 9) Appearance and motion

Open `style.css`, top variables:

```css
:root{
  --bg:#07090d;
  --surface:#0e1117;
  --text:#e7eaf0;
  --muted:#98a2b3;
  --accent:#70b2ff;   /* primary color */
  --accent-2:#a78bfa; /* secondary color */
  --accent-3:#22d3ee; /* tertiary color */
  --radius:14px;
}
```

* Change these to recolor the site.
* Title size:

```css
.page-title{ font-size: clamp(2.4rem, 6vw, 5rem); }
```

* Disable animations for all users: add at bottom of `style.css`:

```css
*{animation:none!important; transition:none!important}
```

---

## 10) Background blobs

In `index.html` the `<svg class="bg">` draws soft blobs.
To remove: delete the entire `<svg class="bg">` block.
To pause motion by default: comment out the `requestAnimationFrame(animate);` call in the script.

---

## 11) Favicons and metadata

Add under `/assets/`:

* `favicon.ico` or `favicon.png`
* Optional `apple-touch-icon.png`

Then link in `<head>` of `index.html`:

```html
<link rel="icon" href="assets/favicon.png">
<link rel="apple-touch-icon" href="assets/apple-touch-icon.png">
```

Update page description:

```html
<meta name="description" content="Portfolio, teaching material, and projects by Stylianos (Stelios) Prentakis.">
```

---

## 12) Analytics (optional)

Add a privacy-friendly script (Plausible, etc.) inside `<head>` if desired. Keep it minimal.

---

## 13) GitHub Pages

* Repo Settings → Pages → Branch: `main` → `/root`
* Custom domain: set DNS `CNAME` to `username.github.io` and add your domain in Pages settings.
  A `CNAME` file is created automatically.

--

## 14) Common edits cheat-sheet

* **Change email**: search `mailto:` in `index.html`.
* **Change phone**: search `tel:`.
* **Add assignment**: copy a `<li>` in “Assignments”, drop file in `/teaching/`, update `href`.
* **Post update**: add a `<li>` at top of `.timeline`. Set `datetime` + human date.
* **Add project**: copy a project `article`, set `data-tags`, update links.
* **Rename CV**: place new file in `/assets/` and change `href` in the CV button.
* **Add new course**: add a chip `<li>` under “Current courses”.

---

## 15) Troubleshooting

* **Broken link**: check path and filename case. GitHub Pages is case-sensitive.
* **PDF won’t load**: ensure it’s committed to the repo and `href` points to `/assets/...`.
* **Menu not opening on mobile**: confirm `<button class="nav-toggle">` exists and script block is present at end of `index.html`.
* **Filters do nothing**: ensure buttons have `data-filter` and cards have matching `data-tags`.

---

## 16) Conventions

* Keep lines short and descriptive.
* Use meaningful filenames: `course-topic-week1.pdf`.
* Newest updates first.
* Avoid spaces in file names; prefer `kebab-case`.

---

Questions later? Read comments inside `index.html` and `style.css`. They point to exact spots to edit.

```
