from django.contrib import admin
from .models import Test, Question


@admin.register(Test)
class TestAdmin(admin.ModelAdmin):
    list_display = ("day",)


@admin.register(Question)
class QuestionAdmin(admin.ModelAdmin):
    list_display = ("__str__",)
