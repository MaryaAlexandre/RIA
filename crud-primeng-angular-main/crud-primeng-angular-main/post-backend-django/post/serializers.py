from rest_framework import serializers
from .models import Post

class PostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = ['id', 'conteudo', 'imagem', 'criado_em', 'atualizado_em']
        read_only_fields = ['criado_em', 'atualizado_em']

    def validate_conteudo(self, value):
        if not value.strip():
            raise serializers.ValidationError("O conteúdo não pode estar vazio.")
        return value.strip()
