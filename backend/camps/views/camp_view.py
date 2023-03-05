from rest_framework import generics, status
from rest_framework.permissions import IsAuthenticatedOrReadOnly, IsAuthenticated
from rest_framework.response import Response

from camps.views.serializers import CampSerializer, RatingSerializer
from camps.models import Camp


class CampView(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [IsAuthenticatedOrReadOnly]
    serializer_class = CampSerializer
    queryset = Camp.objects.all()

    def patch(self, request, *args, **kwargs):
        object = self.get_object()

        if request.user != object.author:
            return Response({"message": "You can't edit this camp"}, status=status.HTTP_400_BAD_REQUEST)

        return super().partial_update(request, *args, **kwargs)

    def delete(self, request, *args, **kwargs):
        camp_id = request.data.get("camp", None)

        if camp_id is None:
            return Response({"message": "Camp id is required"}, status=status.HTTP_400_BAD_REQUEST)

        if not Camp.objects.filter(id=camp_id, author=request.user.id).exists():
            return Response({"message": "This camp doesn't exist"}, status=status.HTTP_400_BAD_REQUEST)

        camp = Camp.objects.filter(id=camp_id, author=request.user.id).first()
        return self.destroy(camp)