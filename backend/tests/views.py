from rest_framework.views import APIView
from .models import Test
from .serializers import TestSerializer
from rest_framework.response import Response


class Tests(APIView):
    def get(self, request):
        test = Test.objects.get(pk=1)
        serializer = TestSerializer(test)
        return Response(serializer.data)
