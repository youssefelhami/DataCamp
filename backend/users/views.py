from rest_framework import permissions, serializers
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import get_user_model

user = get_user_model()


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = user
        fields = ('id', 'username', 'email', 'first_name', 'last_name')


class UserProfile(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        user = request.user
        serializer = UserSerializer(user)
        refresh = RefreshToken.for_user(user)
        return Response({
            "user": serializer.data,
            "access_token": str(refresh),
            "refresh_token": str(refresh.access_token)
        })
