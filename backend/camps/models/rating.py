from django.contrib.auth import get_user_model
from django.core.validators import MinValueValidator, MaxValueValidator
from django.db import models
from camps.models import Camp

user = get_user_model()


class Rating(models.Model):
    camp = models.ForeignKey(Camp, on_delete=models.CASCADE)
    user = models.ForeignKey(user, on_delete=models.CASCADE)
    comment = models.TextField(
        max_length=1000,
    )
    timestamp = models.DateTimeField(auto_now_add=True)
