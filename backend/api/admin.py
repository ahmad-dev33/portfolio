from django.contrib import admin
from .models import Project, ContactMessage

@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ("title", "active", "featured", "order", "created_at")
    list_filter = ("active", "featured")
    search_fields = ("title", "description")
    list_editable = ("active", "featured", "order")


@admin.register(ContactMessage)
class ContactMessageAdmin(admin.ModelAdmin):
    list_display = ("name", "email", "created_at")
    search_fields = ("name", "email", "message")
    readonly_fields = ("name", "email", "message", "created_at")