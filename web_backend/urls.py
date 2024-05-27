"""
URL configuration for web_backend project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include, re_path
from rest_framework.routers import DefaultRouter
from app.viewsets import MallViewSet, CitylViewSet, CustomUserViewSet
from app.views import ValidateLogin, CreateCustomUser, GetUsersInfo, GetUserInfoByUsername, GetMallsInfoByID, CreateMall, AddFavoriteMall, RemoveFavoriteMall, UpdateUserProfile, FilteredMallsView, DeleteUser

router = DefaultRouter()
router.register(r'malls', MallViewSet, basename='mall')
router.register(r'cities', CitylViewSet, basename='city')
router.register(r'users', CustomUserViewSet, basename='customuser')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
    path('validate-login/', ValidateLogin.as_view(), name='validate_login'),
    path('create-user/', CreateCustomUser.as_view(), name='create_user'),
    path('create-mall/', CreateMall.as_view(), name='create_mall'),
    path('users/', GetUsersInfo.as_view(), name='get_users_info'),  
    path('malls/<int:ID>/', GetMallsInfoByID.as_view(), name='get_malls_info_ByID'),
    path('profile/<str:username>/', GetUserInfoByUsername.as_view(), name='get_user_info_by_username'),
    path('profile/<str:username>/add_favorite/', AddFavoriteMall.as_view(), name='add_favorite_mall'),
    path('profile/<str:username>/remove_favorite/', RemoveFavoriteMall.as_view(), name='remove_favorite_mall'),
    path('profile/<str:username>/modify/', UpdateUserProfile.as_view(), name='update_user_profile'),
    path('malls/filter/', FilteredMallsView.as_view(), name='filtered_malls'),
    path('profile/<str:username>/delete/', DeleteUser.as_view(), name='delete_user'),
    
]
