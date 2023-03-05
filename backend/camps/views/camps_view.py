from rest_framework import generics, status, mixins
from rest_framework.permissions import IsAuthenticatedOrReadOnly, IsAuthenticated
from rest_framework.response import Response

from camps.views.serializers import CampSerializer, RatingSerializer
from camps.models import Camp


class CampsView(generics.ListCreateAPIView):
    permission_classes = [IsAuthenticatedOrReadOnly]
    serializer_class = CampSerializer
    queryset = Camp.objects.all()

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)