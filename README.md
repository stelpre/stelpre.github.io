# Personal Website — PRENTAKIS STELIOS (Multipage)

Four lightweight pages, shared theme, no frameworks.

## Pages
- `index.html` — **Main** hub with links to the other pages.
- `cv.html` — **CV** download and contact links.
- `tutoring.html` — **Tutoring Material** with assignments and resources.
- `updates.html` — **Project Updates** timeline and filterable project cards.

## Edit flow
- Content lives inside each page. Visuals in `style.css` under `:root` tokens.
- Background animation is inline JS on each page; extract to `main.js` if preferred.
- Teaching files live in `/teaching/`. CV at `/assets/autoCV.pdf`.

## Deploy
Push to `main` and enable GitHub Pages. Set custom domain if needed.

## Tips
- Mark the current page by setting `aria-current="page"` on its nav link.
- Keep filenames lowercase; GitHub Pages is case‑sensitive.
- Reduce animation load by lowering `N` in the canvas script or rely on `prefers-reduced-motion`.
