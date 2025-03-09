from rest_framework.views import APIView
from .models import Test
from .serializers import TestSerializer, AllTestSerializer
from rest_framework.response import Response
from rest_framework import exceptions


class AllTestAPIView(APIView):
    def get(self, request):
        tests = Test.objects.all()
        serializer = AllTestSerializer(tests, many=True)
        return Response(serializer.data)


class TestAPIView(APIView):
    def get_object(self, day):
        try:
            return Test.objects.get(day=day)
        except Test.DoesNotExist:
            raise exceptions.NotFound

    def get(self, request, day):
        test = self.get_object(day)
        serializer = TestSerializer(test)
        return Response(serializer.data)
