from rest_framework.views import APIView
from .models import Test
from .serializers import TestSerializer
from rest_framework.response import Response
from rest_framework import exceptions


class Test(APIView):
    def get_object(self, pk):
        try:
            return Test.objects.get(pk=pk)
        except:
            raise exceptions.NotFound

    def get(self, request, pk):
        test = self.get_object(pk)
        serializer = TestSerializer(test)
        return Response(serializer.data)
