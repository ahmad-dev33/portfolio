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

The repository has a workflow at `.github/workflows/deploy-html.yml` that publishes **only this folder** to GitHub Pages.

1. In the repository settings go to **Pages**.
2. Under **Build and deployment → Source**, choose **GitHub Actions**.
3. Push to `main` (or run the workflow manually). The site will be available at
   `https://ahmad-dev33.github.io/portfolio/`.

GitHub Pages' classic branch deployment only offers `/` or `/docs` as source folders, which is why the small Actions workflow is used to publish this `html/` folder while keeping its name.

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
