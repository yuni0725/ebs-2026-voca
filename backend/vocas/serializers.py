from rest_framework import serializers
from .models import Voca, Meaning


class TestMeaning(serializers.ModelSerializer):

    word = serializers.SerializerMethodField()

    class Meta:
        model = Meaning
        exclude = ("voca",)

    def get_word(self, meaning):
        return meaning.word()
