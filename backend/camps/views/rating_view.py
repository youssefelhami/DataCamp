from rest_framework import generics, status, mixins
from rest_framework.permissions import IsAuthenticatedOrReadOnly, IsAuthenticated
from rest_framework.response import Response

from camps.views.serializers import RatingSerializer
from camps.models import Rating, Camp


class RatingView(mixins.RetrieveModelMixin, mixins.CreateModelMixin, mixins.DestroyModelMixin, generics.GenericAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = RatingSerializer
    queryset = Rating.objects.all()

    def post(self, request, *args, **kwargs):
        request_data = request.data.copy()
        print("request_data", request_data)
        camp_id = request.data.get("camp", None)

        if camp_id is None:
            return Response({"message": "Camp id is required"}, status=status.HTTP_400_BAD_REQUEST)

        camp = Camp.objects.filter(id=camp_id).first()

        if camp is None:
            return Response({"message": "This camp doesn't exist"}, status=status.HTTP_400_BAD_REQUEST)

        if Rating.objects.filter(camp_id=camp_id, user=request.user).exists():
            return Response({"message": "You already rated this camp"}, status=status.HTTP_400_BAD_REQUEST)

        request_data["user"] = request.user.id
        request_data["camp"] = camp.id

        serializer = self.get_serializer(
            data=request_data, context={"request": request}
        )

        serializer.is_valid(raise_exception=True)
        serializer.save()

        return Response(serializer.data, status=status.HTTP_201_CREATED)

    def delete(self, request, *args, **kwargs):
        camp_id = request.data.get("camp", None)

        if camp_id is None:
            return Response({"message": "Camp id is required"}, status=status.HTTP_400_BAD_REQUEST)

        if not Rating.objects.filter(camp_id=camp_id, user=request.user).exists():
            return Response({"message": "This camp doesn't exist"}, status=status.HTTP_400_BAD_REQUEST)

        rating = Rating.objects.filter(camp_id=camp_id, user=request.user).first()
        rating.delete()
        return Response({"message": "Rating deleted"}, status=status.HTTP_200_OK)