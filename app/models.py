from django.db import models


class City(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name


class Mall(models.Model):
    name = models.CharField(max_length=100)
    address = models.CharField(max_length=255, null=True)
    description = models.TextField(null=True)
    city = models.ForeignKey(City, on_delete=models.SET_NULL, null=True, blank=True)

    def __str__(self):
        return self.name


class CustomUser(models.Model):
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    username = models.CharField(max_length=50)
    city = models.ForeignKey(City, on_delete=models.SET_NULL, null=True, blank=True)
    password = models.CharField(max_length=18)
    fav_malls = models.ManyToManyField('Mall', blank=True)
    def __str__(self):
        return f"{self.username} ({self.first_name} {self.last_name})"