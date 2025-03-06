import os
import django
import sys

sys.path.append(os.path.dirname(os.path.abspath(__file__)) + "/..")

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "config.settings")
django.setup()

from vocas.models import Voca, Meaning
from tests.models import Question, Test

for i in range(1, 100):

    voca_instance = Voca.objects.order_by("?").first()
    voca_meaning = voca_instance.meanings.order_by("?").first()
    voca_type = voca_meaning.type

    try:
        meaning_instance = (
            Meaning.objects.filter(type=voca_type)
            .exclude(voca=voca_instance)
            .order_by("?")[0:4]
        )
        question = Question.objects.create(answer=voca_meaning)
        question.choice.set(meaning_instance)
    except IndexError:
        print("index out of range")
