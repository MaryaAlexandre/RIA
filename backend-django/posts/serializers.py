
from rest_framework import serializers
from .models import Post

class PostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = '__all__' # Inclui todos os campos do modelo Post
        read_only_fields = ['likes_count', 'created_at', 'updated_at'] # Campos que não podem ser definidos na criação/atualização