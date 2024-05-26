from django.contrib.auth.hashers import check_password, make_password
from django.shortcuts import render
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from django.shortcuts import get_object_or_404
from .models import CustomUser
from .models import Mall
from .serializers import CustomUserSerializer
from .serializers import MallSerializer


class ValidateLogin(APIView):
    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')

        try:
            user = get_object_or_404(CustomUser, username=username)

            if check_password(password, user.password):
                # Пароль вірний, логін успішний
                # Тут ви можете створити та повернути токен доступу
                return Response({'message': 'Login successful'}, status=status.HTTP_200_OK)
            else:
                # Пароль невірний
                return Response({'message': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)
        except CustomUser.DoesNotExist:
            # Користувач не знайдений
            return Response({'message': 'User not found'}, status=status.HTTP_404_NOT_FOUND)


class CreateCustomUser(APIView):
    def post(self, request):
        serializer = CustomUserSerializer(data=request.data)
        if serializer.is_valid():
            username = serializer.validated_data['username']

            if CustomUser.objects.filter(username=username).exists():
                return Response({"message": "Таке ім'я користувача вже існує"}, status=status.HTTP_400_BAD_REQUEST)

            serializer.validated_data['password'] = make_password(serializer.validated_data['password'])
            serializer.save()

            
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        

class CreateMall(APIView):
    def post(self, request):
        serializer = MallSerializer(data=request.data)
        print(request.data)
        if serializer.is_valid():
            name = serializer.validated_data['name']

            if Mall.objects.filter(name=name).exists():
                return Response({"message": "Такий тц вже існує"}, status=status.HTTP_400_BAD_REQUEST)

            serializer.save()

            
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class GetUsersInfo(APIView):
    def get(self, request):
        users = CustomUser.objects.all()
        serializer = CustomUserSerializer(users, many=True)
        return Response(serializer.data)
    
class GetMallsInfoByID(APIView):
    def get(self, request, ID):
        try:
            malls = Mall.objects.filter(city=ID)
        except Mall.DoesNotExist:
            return Response(
                {"detail": f"Тц з ID міста '{ID}' не знайдено."},
                status=status.HTTP_404_NOT_FOUND
            )
        serializer = MallSerializer(malls, many=True)
        return Response(serializer.data)
    
class GetUserInfoByUsername(APIView):
    def get(self, request, username):
        try:
            user = CustomUser.objects.get(username=username)
        except CustomUser.DoesNotExist:
            return Response(
                {"detail": f"Користувач з email '{username}' не знайдений."},
                status=status.HTTP_404_NOT_FOUND
            )

        serializer = CustomUserSerializer(user)
        print(serializer.data)
        return Response(serializer.data)

class AddFavoriteMall(APIView):
    def post(self, request, username):
        try:
            # Знаходимо користувача за іменем користувача
            user = get_object_or_404(CustomUser, username=username)
        except CustomUser.DoesNotExist:
            return Response({"detail": "Користувач не знайдений."}, status=status.HTTP_404_NOT_FOUND)

        mall_id = request.data.get('mall_id')
        if not mall_id:
            return Response({"detail": "Не вказано ID торгового центру."}, status=status.HTTP_400_BAD_REQUEST)

        try:
            # Знаходимо торговий центр за ID
            mall = get_object_or_404(Mall, id=mall_id)
        except Mall.DoesNotExist:
            return Response({"detail": "Торговий центр не знайдений."}, status=status.HTTP_404_NOT_FOUND)

        # Додаємо торговий центр до обраних користувача
        user.fav_malls.add(mall.id)

        # Серіалізуємо оновлені дані користувача та повертаємо їх у відповіді
        serializer = CustomUserSerializer(user)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    
class RemoveFavoriteMall(APIView):
    def post(self, request, username):
        user = get_object_or_404(CustomUser, username=username)
        mall_id = request.data.get('mall_id')
        print(request.data.get('mall_id'))
        try:
            mall = Mall.objects.get(id=mall_id)
            user.fav_malls.remove(mall)
            serializer = CustomUserSerializer(user)
            return Response(serializer.data)
        except Mall.DoesNotExist:
            return Response({"detail": "Mall not found"}, status=404)

