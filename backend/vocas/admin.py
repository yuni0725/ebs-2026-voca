from django.contrib import admin
from .models import Voca, Meaning


@admin.register(Voca)
class VocaAdmin(admin.ModelAdmin):
    list_display = (
        "word",
        "noun",
        "verb",
        "adj",
        "adverb",
        "prep",
        "pk",
    )
    ordering = ("pk",)
    search_fields = ["word"]


@admin.register(Meaning)
class MeaningAdmin(admin.ModelAdmin):
    pass
