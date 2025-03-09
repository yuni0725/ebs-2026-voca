from django.urls import path
from . import views


urlpatterns = [
    path("", views.AllTestAPIView.as_view()),
    path("/<int:day>", views.TestAPIView.as_view()),
]
