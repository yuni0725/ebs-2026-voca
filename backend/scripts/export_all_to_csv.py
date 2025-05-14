import os
import django
import sys

sys.path.append(os.path.dirname(os.path.abspath(__file__)) + "/..")

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "config.settings")
django.setup()

import pandas as pd
from vocas.models import Voca, Meaning
from tests.models import Question, Test


def export_voca():
    df = pd.DataFrame(Voca.objects.all().values())
    df.to_csv("data-to-csv/voca.csv", index=False)


def export_meaning():
    df = pd.DataFrame(Meaning.objects.all().values())
    df.to_csv("data-to-csv/meaning.csv", index=False)


def export_question():
    df = pd.DataFrame(Question.objects.all().values())
    df.to_csv("data-to-csv/question.csv", index=False)

    # question_choice 중간 테이블
    rows = []
    for question in Question.objects.all():
        for meaning in question.choice.all():
            rows.append({"question_id": question.id, "meaning_id": meaning.id})
    df_choice = pd.DataFrame(rows)
    df_choice.to_csv("data-to-csv/question_choice.csv", index=False)


def export_test():
    df = pd.DataFrame(Test.objects.all().values())
    df.to_csv("data-to-csv/test.csv", index=False)

    # test_question 중간 테이블
    rows = []
    for test in Test.objects.all():
        for question in test.question.all():
            rows.append({"test_id": test.id, "question_id": question.id})
    df_tq = pd.DataFrame(rows)
    df_tq.to_csv("data-to-csv/test_question.csv", index=False)


def run():
    export_voca()
    export_meaning()
    export_question()
    export_test()
    print("✅ 모든 CSV 파일이 성공적으로 생성되었습니다.")


if __name__ == "__main__":
    run()
