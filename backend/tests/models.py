from django.db import models
from vocas.models import Voca
from vocas.models import Meaning


class Test(models.Model):
    """Test Model Definition"""

    day = models.PositiveIntegerField(default=0)
    question = models.ManyToManyField("Question", related_name="questions")
    created_at = models.DateField(auto_now=True)


class Question(models.Model):
    day = models.PositiveIntegerField(default=0)
    answer = models.ForeignKey(Meaning, on_delete=models.CASCADE, related_name="answer")
    choice = models.ManyToManyField(Meaning)
