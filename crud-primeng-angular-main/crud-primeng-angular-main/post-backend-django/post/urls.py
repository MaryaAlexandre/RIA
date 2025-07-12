from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import PostViewSet  # Atualize o import

# Criação do router para os endpoints da API
router = DefaultRouter()
router.register(r'post', PostViewSet, basename='post')  

urlpatterns = [
    path('', include(router.urls)),
]
