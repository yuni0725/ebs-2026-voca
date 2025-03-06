from rest_framework.serializers import ModelSerializer
from .models import Test


class TestSerializer(ModelSerializer):
    class Meta:
        model = Test
        exclude = ("id",)
        depth = 3
