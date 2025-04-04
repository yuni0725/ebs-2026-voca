import os
import django
import sys

max_test = int(input("Max Test? : "))

sys.path.append(os.path.dirname(os.path.abspath(__file__)) + "/..")

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "config.settings")
django.setup()

from tests.models import Question, Test

last_instance = Test.objects.order_by("-day").first()
start_day = last_instance.day + 1 if last_instance else 1

for i in range(start_day, max_test + 1):
    question_instance = Question.objects.order_by("?")[0:45]
    test = Test.objects.create(day=i)
    test.question.set(question_instance)
