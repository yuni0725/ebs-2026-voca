import os
import django
import sys

sys.path.append(os.path.dirname(os.path.abspath(__file__)) + "/..")

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "config.settings")
django.setup()

from tests.models import Question, Test

import random

for i in range(1, 61):
    question_instance = list(Question.objects.filter(day=i))
    random.shuffle(question_instance)
    test = Test.objects.create(day=i)
    test.question.set(question_instance)
