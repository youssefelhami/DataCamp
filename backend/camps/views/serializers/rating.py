from rest_framework import serializers
from camps.models import Rating


class RatingSerializer(serializers.ModelSerializer):
    comment = serializers.CharField(max_length=1000)
    timestamp = serializers.DateTimeField(read_only=True)

    def to_representation(self, instance):
        response = super().to_representation(instance)
        response["user"] = instance.user.username
        del response["camp"]
        return response

    class Meta:
        model = Rating
        fields = '__all__'
