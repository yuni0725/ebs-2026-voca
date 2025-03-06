from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework import exceptions


from .models import Voca


class Voca(APIView):
    def get():
        return Response(Voca.order_by("?")[:15])
