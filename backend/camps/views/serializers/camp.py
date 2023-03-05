from rest_framework import serializers
from camps.views.serializers.rating import RatingSerializer
from camps.models import Camp, Rating


class CampSerializer(serializers.ModelSerializer):
    author = serializers.ReadOnlyField(source='author.username')
    rating = serializers.SerializerMethodField()

    def get_rating(self, obj):
        ratings = Rating.objects.filter(camp=obj)
        return RatingSerializer(ratings, many=True).data

    class Meta:
        model = Camp
        fields = '__all__'
