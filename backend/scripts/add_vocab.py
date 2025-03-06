import os
import django
import pandas as pd
import sys

sys.path.append(os.path.dirname(os.path.abspath(__file__)) + "/..")

# Django 환경 설정 로드
os.environ.setdefault(
    "DJANGO_SETTINGS_MODULE", "config.settings"
)  # 프로젝트명 변경 필요
django.setup()

from vocas.models import Voca, Meaning  # 앱 이름 변경 필요

# CSV 파일 경로 (Django 프로젝트 폴더 기준)
file_path = "VOCA_1800-wtfwtf.csv"

# CSV 파일 로드
df = pd.read_csv(file_path, encoding="utf-8")

# 품사 매핑 (CSV 열 이름 -> Django 모델 type 필드 값)
TYPE_MAP = {
    "adj": "adj",  # 형용사
    "verb": "verb",  # 동사
    "noun": "noun",  # 명사
    "adv": "adv",  # 부사
    "prep": "prep",  # 전치사
}

# 데이터 저장
for _, row in df.iterrows():
    # 단어 저장 (중복 방지)
    voca, created = Voca.objects.get_or_create(word=row["단어"])

    # 품사별로 뜻 저장
    for col in df.columns[1:]:  # '단어' 컬럼 제외
        if pd.notna(row[col]):  # 값이 존재하는 경우만 처리
            meaning_type = TYPE_MAP.get(col)  # 품사 매핑
            if meaning_type:
                # 쉼표(,)로 구분된 여러 뜻을 개별적으로 저장
                definitions = [definition.strip() for definition in row[col].split(",")]

                for definition in definitions:
                    Meaning.objects.create(
                        voca=voca, type=meaning_type, definition=definition
                    )

print("save")
