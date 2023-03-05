from django.core.validators import MinValueValidator
from django.db import models
from django.contrib.auth import get_user_model

user = get_user_model()


class Camp(models.Model):
    name = models.CharField(max_length=100)
    price = models.IntegerField(
        default=0,
        validators=[MinValueValidator(0)]
    )
    image = models.URLField(blank=True, null=True)
    description = models.CharField(max_length=1000)
    location = models.CharField(max_length=100, null=True, blank=True)
    phone = models.CharField(max_length=100, null=True, blank=True)
    booking_start = models.DateField(null=True, blank=True)
    booking_end = models.DateField(null=True, blank=True)
    tags = models.TextField(null=True, blank=True)
    author = models.ForeignKey(user, on_delete=models.CASCADE)
    timestamp = models.DateTimeField(auto_now_add=True)
