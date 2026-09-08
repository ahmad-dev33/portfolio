# My Portfolio

Portfolio app: React frontend (repo root) + Django REST backend (backend/).

## How to start

**Easy way**: double-click `start.bat` in this folder.

**Manual / first time**:

```bat
:: 1. Backend (port 8000)
venv\Scripts\python.exe backend\manage.py runserver

:: 2. Frontend (port 3000) - in a second terminal (repo root)
npm start
```

Then open http://localhost:3000

## First time setup

```bat
venv\Scripts\python.exe backend\manage.py makemigrations
venv\Scripts\python.exe backend\manage.py migrate
venv\Scripts\python.exe backend\manage.py createsuperuser
:: optional: seed 6 demo projects
venv\Scripts\python.exe seed_projects.py
```

## API endpoints

| Method | URL                    | What it does                       |
|--------|------------------------|------------------------------------|
| GET    | `/api/projects/`       | Public list of projects            |
| POST   | `/api/contact/`        | Public contact form (name, email, message) |
| POST   | `/api/user/register/`  | Create account                     |
| POST   | `/api/token/`          | Login                              |
| POST   | `/api/token/refresh/`  | Refresh access token               |
| POST   | `/api/token/logout/`   | Logout                             |

Admin panel: http://127.0.0.1:8000/admin (add/edit/delete projects, read contact messages).
Use the superuser you created with `createsuperuser`.

## Real email for the contact form

Messages are always saved to the DB. To also receive them by email:

1. Create a Gmail **App Password** (enable 2-Step Verification, then
   https://myaccount.google.com/apppasswords).
2. Edit `backend/.env` and fill in:

   ```
   EMAIL_HOST_USER=youremail@gmail.com
   EMAIL_HOST_PASSWORD=your-16-char-app-password
   CONTACT_EMAIL_TO=youremail@gmail.com
   ```

3. Restart the backend. When someone submits the contact form you get an email.

Other hosts: change `EMAIL_HOST` / `EMAIL_PORT` / `EMAIL_USE_TLS` in `.env`
(e.g. `smtp.mailgun.org`, `smtp.zoho.com`, ...).

## Public vs private pages

- `/`, `/about`, `/project`, `/resume`, `/contact` are **public** — no login needed.
- Login/Register still work but are optional (no content is locked behind them anymore).

## Notes

- Projects are stored in the DB (see `backend/api/models.py`). Project images upload to
  `backend/media/projects/` via the admin; the frontend loads them from `/media/...`.
- To re-seed the demo projects run: `venv\Scripts\python.exe backend\seed_projects.py`
- Frontend talks to `http://127.0.0.1:8000/api/` (see `src/api.js`).
- `DEBUG = True` is set for local development. Set it to `False` and run
  `collectstatic` before deploying.

## Deploy (what goes where)

You deploy **two separate things** — they are NOT one upload.
`ahamd-dana.unaux.com` (InfinityFree) is PHP-only and **cannot run**
Django or `npm`, so use the free tiers below instead:

**1. Backend → Render (or Railway). Deploy the `backend/` folder.**
- Root directory: `backend`, build: `./build.sh`,
  start: `gunicorn backend.wsgi:application --bind 0.0.0.0:$PORT`
  (`Procfile`, `render.yaml`, `runtime.txt` already added).
- Env vars on the host: `SECRET_KEY` (generate), `DEBUG=False`,
  `ALLOWED_HOSTS=your-backend.onrender.com`,
  `FRONTEND_URL=https://your-frontend.vercel.app`,
  plus `EMAIL_HOST_USER` / `EMAIL_HOST_PASSWORD` / `CONTACT_EMAIL_TO`.
- After first deploy: create admin via Render Shell
  (`python manage.py createsuperuser`), add projects in `/admin/`.
- Note: free Render disk is ephemeral — uploaded project images in
  `media/` disappear on redeploy. Use image URLs or external storage
  for permanent images.

**2. Frontend → Vercel (or Netlify). Deploy the repo root.**
- Framework: Create React App, output: `build` (`vercel.json` added).
- Env var on the host: `REACT_APP_API_URL=https://your-backend.onrender.com/api/`
  (trailing slash required). Redeploy after setting it.
- Local dev still works with no env var (falls back to
  `http://127.0.0.1:8000/api/` — see `.env.example`).

**Option: use your `ahmaddana.liveblog365.com` (profreehost) for the frontend.**
- ProFreeHost is PHP/MySQL-only (no Python — confirmed on their forum), so the
  Django backend MUST stay on Render. But the React `build/` output is plain
  static files, which any PHP host can serve.
- Best: in Vercel add `ahmaddana.liveblog365.com` as a custom domain, then add
  the CNAME record Vercel shows you in your profreehost DNS panel. You get free
  trusted SSL + auto-deploys from GitHub.
- Fallback (no DNS access): rebuild with
  `REACT_APP_API_URL=https://your-backend.onrender.com/api/`, then upload the
  contents of `build/` (including `.htaccess` — SPA routing) via FTP/Monsta FTP
  to the subdomain's folder. Note: subdomain SSL there is self-signed, so
  browsers may show a warning — the Vercel CNAME route avoids this.
- Either way set the backend env `FRONTEND_URL=https://ahmaddana.liveblog365.com`
  and redeploy the backend.

Order: deploy backend first → copy its URL → set it as
`REACT_APP_API_URL` on Vercel → deploy frontend → set backend's
`FRONTEND_URL` to the Vercel URL → redeploy backend.
- TODO before going live: replace the placeholder email / Telegram link in
  `src/components/Contact/Contact.js`, swap placeholder favicon/logo, and
  set your real LinkedIn URL (the ones in the Footer currently point to invalid links).
- The `passwords/` folder stays local — never commit it.