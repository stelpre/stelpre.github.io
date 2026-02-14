# Personal Website — Stelios Prentakis

Four lightweight pages, shared theme, no frameworks.

## Pages

- `index.html` — **Main** hub with links to the other pages
- `cv.html` — **CV** download and contact links
- `tutoring.html` — **Tutoring materials** with assignments and resources
- `updates.html` — **Updates** timeline and filterable project cards

---

## How to Update Content

All site content lives in **JSON files** inside the `data/` folder. Edit them, push, and the site updates within ~30 seconds.

### Quick way: CLI tool

```bash
cd ~/programming/personal/stelpre.github.io

# Add a timeline update (one-liner)
node manage.js add update "Published new paper on decision tree complexity"

# Add a project (interactive prompts for title, description, tags, link)
node manage.js add project

# Add tutoring material (interactive — picks section, then title/link/tags)
node manage.js add material

# View what's currently on the site
node manage.js list updates
node manage.js list projects
node manage.js list tutoring

# Open data/ folder in VS Code for manual editing
node manage.js edit

# Push everything live
node manage.js push "added new project"
```

### Manual way: edit JSON directly

Edit any file in `data/`, then:

```bash
git add -A && git commit -m "your message" && git push
```

---

## Data Files Reference

### `data/updates.json` — Timeline updates

```json
{
  "updates": [
    {
      "date": "2025-09-06",
      "text": "Created Personal Website."
    }
  ]
}
```

Each update has a `date` (YYYY-MM-DD) and `text` (description).

### `data/projects.json` — Project cards

```json
{
  "projects": [
    {
      "title": "Project Name",
      "description": "What the project is about.",
      "tags": ["programming", "complexity"],
      "link": "https://example.com",
      "linkText": "View →"
    }
  ]
}
```

Available tags: `programming`, `complexity`, `quantum`, `algorithms`. Leave `link` and `linkText` as `""` if there's no link.

### `data/cv.json` — About, contacts, and CV sections

```json
{
  "about": "Bio text...",
  "cvPdfUrl": "assets/autoCV.pdf",
  "contacts": [
    { "label": "📧 Email", "url": "mailto:you@example.com" }
  ],
  "sections": [
    {
      "id": "education",
      "title": "Education",
      "icon": "🎓",
      "items": [
        {
          "title": "University Name",
          "subtitle": "Degree",
          "date": "2022 - Present",
          "description": "Focus area.",
          "details": ["Optional bullet point"]
        }
      ]
    }
  ]
}
```

- **`about`** — the bio paragraph at the top of the CV page
- **`cvPdfUrl`** — path to the PDF (put it in `assets/`)
- **`contacts`** — label with emoji + URL
- **`sections`** — each has an `id`, `title`, `icon` (emoji), and list of `items`
- Each item: `title`, `subtitle`, `date`, `description`, and optional `details` (array of bullet strings)

### `data/tutoring.json` — Teaching materials

```json
{
  "sections": [
    {
      "id": "protypa",
      "title": "Section Name",
      "hasFilters": false,
      "filterOptions": [],
      "materials": [
        {
          "title": "Material Title",
          "link": "https://stelpre.github.io/teaching/filename.pdf",
          "tags": []
        }
      ]
    }
  ]
}
```

- **`hasFilters`** — set to `true` to show filter buttons (e.g. by grade)
- **`filterOptions`** — array of `{ "value": "a", "label": "Α Γυμνασίου" }` (include `{"value": "all", "label": "All"}` first)
- **`tags`** on materials — match the `value` from `filterOptions` to make filtering work
- Upload PDFs to the `teaching/` folder

---

## Uploading Files

- **CV PDF** → put in `assets/` and set `cvPdfUrl` in `data/cv.json`
- **Teaching PDFs** → put in `teaching/` and reference them in `data/tutoring.json`

---

## Folder Structure

```
data/
  updates.json      ← timeline entries
  projects.json     ← project cards
  cv.json           ← bio, contacts, CV sections
  tutoring.json     ← teaching materials
assets/             ← CV PDF, images
teaching/           ← tutoring PDFs
manage.js           ← CLI content manager
```

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
