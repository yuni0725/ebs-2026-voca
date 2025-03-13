import os
import django
import sys

sys.path.append(os.path.dirname(os.path.abspath(__file__)) + "/..")

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "config.settings")
django.setup()

from tests.models import Question, Test


for i in range(1, 11):
    question_instance = Question.objects.order_by("?")[0:45]
    test = Test.objects.create(day=i)
    test.question.set(question_instance)
