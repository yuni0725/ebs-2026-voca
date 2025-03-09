from django.db import models
from vocas.models import Voca
from vocas.models import Meaning


class Test(models.Model):
    """Test Model Definition"""

    day = models.PositiveIntegerField()
    question = models.ManyToManyField("Question", related_name="questions")
    created_at = models.DateField(auto_now=True)


class Question(models.Model):
    answer = models.ForeignKey(Meaning, on_delete=models.CASCADE, related_name="answer")
    choice = models.ManyToManyField(Meaning)
