from django.contrib import admin
from .models import City, Mall, CustomUser

admin.site.register(CustomUser)
admin.site.register(City)
admin.site.register(Mall)
