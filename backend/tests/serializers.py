from rest_framework.serializers import ModelSerializer
from .models import Test, Question
from vocas.serializers import TestMeaning


class QuestionSerializer(ModelSerializer):
    answer = TestMeaning(read_only=True)
    choice = TestMeaning(many=True, read_only=True)

    class Meta:
        model = Question
        exclude = ()


class AllTestSerializer(ModelSerializer):
    class Meta:
        model = Test
        fields = ("day", "created_at")


class TestSerializer(ModelSerializer):
    question = QuestionSerializer(many=True, read_only=True)

    class Meta:
        model = Test
        fields = ("day", "question", "created_at")
