from django.db import models
from vocas.models import Voca
from vocas.models import Meaning


class Test(models.Model):
    day = models.PositiveIntegerField()
    question = models.ManyToManyField("Question", related_name="questions")


class Question(models.Model):
    answer = models.ForeignKey(Voca, on_delete=models.CASCADE, related_name="answer")
    choice = models.ManyToManyField(Meaning)
