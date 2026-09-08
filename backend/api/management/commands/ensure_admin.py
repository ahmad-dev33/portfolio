"""Create/update the admin superuser from env vars (for hosts without shell access).

Reads DJANGO_SUPERUSER_USERNAME, DJANGO_SUPERUSER_PASSWORD and
DJANGO_SUPERUSER_EMAIL. If the username var is empty, does nothing.
Safe to run on every deploy: existing users are kept, password is synced.
"""
import os

from django.contrib.auth import get_user_model
from django.core.management.base import BaseCommand


class Command(BaseCommand):
    help = "Ensure admin superuser exists (reads DJANGO_SUPERUSER_* env vars)."

    def handle(self, *args, **options):
        username = os.getenv("DJANGO_SUPERUSER_USERNAME", "").strip()
        password = os.getenv("DJANGO_SUPERUSER_PASSWORD", "")
        email = os.getenv("DJANGO_SUPERUSER_EMAIL", "").strip()

        if not username or not password:
            self.stdout.write("ensure_admin: skipped (DJANGO_SUPERUSER_* not set).")
            return

        User = get_user_model()
        user, created = User.objects.get_or_create(
            username=username, defaults={"email": email, "is_staff": True, "is_superuser": True}
        )
        user.email = email or user.email
        user.is_staff = True
        user.is_superuser = True
        user.set_password(password)
        user.save()
        self.stdout.write(
            self.style.SUCCESS(
                f"ensure_admin: {'created' if created else 'updated'} superuser '{username}'."
            )
        )
