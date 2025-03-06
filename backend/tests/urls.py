from django.urls import path
from . import views


urlpatterns = [
    path("", views.Tests.as_view()),
]
