#!/usr/bin/env bash
set -o errexit
pip install -r requirements.txt
python manage.py migrate --noinput
python manage.py collectstatic --noinput
# Free-plan friendly: recreate admin from env vars (no-op if unset).
# Runs every deploy so a fresh sqlite disk self-heals.
python manage.py ensure_admin
# Demo projects (idempotent). Set SEED_DEMO_DATA=true to enable.
if [ "${SEED_DEMO_DATA,,}" = "true" ]; then
  python seed_projects.py
fi
