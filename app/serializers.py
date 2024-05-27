from rest_framework import serializers
from .models import City, Mall, CustomUser

class CitySerializer(serializers.ModelSerializer):
    class Meta:
        model = City
        fields = ('id', 'name')


class MallSerializer(serializers.ModelSerializer):
    city = serializers.PrimaryKeyRelatedField(queryset=City.objects.all())  

    class Meta:
        model = Mall
        fields = ('id', 'name', 'address', 'description', 'city')


class CustomUserSerializer(serializers.ModelSerializer):
    # fav_malls = MallSerializer(many=True, read_only=True)  # Для відображення улюблених ТЦ
    fav_malls = serializers.PrimaryKeyRelatedField(many=True, queryset=Mall.objects.all())

    class Meta:
        model = CustomUser
        fields = ('id', 'first_name', 'last_name', 'username', 'city', 'fav_malls', 'password')
