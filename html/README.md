# Static portfolio (GitHub Pages)

This folder is a **plain HTML / CSS / JavaScript copy** of the React portfolio in the repository root. It does not run React, does not need `npm`, and has no build step.

## Pages included

| File | Page |
| --- | --- |
| `index.html` | Home / intro |
| `about.html` | About, skills, tools |
| `project.html` | Projects |
| `resume.html` | CV viewer + download |
| `contact.html` | Contact form |
| `404.html` | Fallback to home |
| `css/style.css` | All styles |
| `js/site.js` | Nav, typewriter, particles, contact form |
| `assets/` | Images, icons sprite and CV (copied from `src/Assets`) |

## Publishing

GitHub Pages' classic branch deployment only offers `/` or `/docs` as source folders, so the site is published from the repository root while all real pages stay in this `html/` folder:

- `../index.html` (repository root) is a tiny redirect to `html/index.html`.
- `../.nojekyll` (repository root) tells Pages to serve files as-is.
- Pages settings: **Source = Deploy from a branch → main → /(root)**.

Live URL: `https://ahmad-dev33.github.io/portfolio/` (it redirects to `/portfolio/html/`).

These two root files are the only additions outside `html/`; no existing React/backend files were changed.

## Contact form

GitHub Pages is static, so the form cannot write to the Django database by itself. By default it opens the visitor's email app with the message pre-filled.

To use the Django API instead, open `js/site.js` and set:

```js
var API_URL = "https://your-backend.onrender.com/api/";
```

The backend must allow requests from the GitHub Pages domain via CORS.

## Notes

- Login/Register are intentionally omitted: they require the Django backend and JWT cookies, which a static Pages site cannot provide.
- The GitHub contribution graph from `react-github-calendar` is replaced by a lightweight static card with a link to the real profile graph.
- The CV preview uses the browser's native PDF viewer via `<object>` instead of `react-pdf`.
- To update a project or a photo, edit the HTML here and copy new images into `assets/`. The original React app in `src/` is untouched.
