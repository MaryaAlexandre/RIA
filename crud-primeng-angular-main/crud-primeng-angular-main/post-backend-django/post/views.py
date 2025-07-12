from rest_framework import viewsets, status
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from .models import Post
from .serializers import PostSerializer
import logging

logger = logging.getLogger(__name__)

class PostViewSet(viewsets.ModelViewSet):
    """
    ViewSet para operações CRUD de Posts
    """
    queryset = Post.objects.all().order_by("-created_at")
    serializer_class = PostSerializer

    def list(self, request):
        """
        GET /api/posts/ - Listar todos os posts
        """
        try:
            posts = self.get_queryset()
            serializer = self.get_serializer(posts, many=True)
            logger.info(f"{len(serializer.data)} posts listados com sucesso.")
            return Response(serializer.data)
        except Exception as e:
            logger.error(f"Erro ao listar posts: {str(e)}")
            return Response(
                {"error": "Erro interno do servidor"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )

    def create(self, request):
        """
        POST /api/posts/ - Criar um novo post
        """
        try:
            serializer = self.get_serializer(data=request.data)
            if serializer.is_valid():
                post = serializer.save()
                logger.info(f"Post criado: {post.conteudo[:30]}...")
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            else:
                logger.warning(f"Erro de validação: {serializer.errors}")
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            logger.error(f"Erro ao criar post: {str(e)}")
            return Response(
                {"error": "Erro interno do servidor"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )

    def retrieve(self, request, pk=None):
        """
        GET /api/posts/{id}/ - Recuperar post por ID
        """
        try:
            post = get_object_or_404(Post, pk=pk)
            serializer = self.get_serializer(post)
            logger.info(f"Post recuperado: ID {pk}")
            return Response(serializer.data)
        except Exception as e:
            logger.error(f"Erro ao recuperar post {pk}: {str(e)}")
            return Response(
                {"error": "Post não encontrado"},
                status=status.HTTP_404_NOT_FOUND,
            )

    def update(self, request, pk=None):
        """
        PUT /api/posts/{id}/ - Atualizar post
        """
        try:
            post = get_object_or_404(Post, pk=pk)
            serializer = self.get_serializer(post, data=request.data)
            if serializer.is_valid():
                post_atualizado = serializer.save()
                logger.info(f"Post atualizado: ID {pk}")
                return Response(serializer.data)
            else:
                logger.warning(f"Erro de validação: {serializer.errors}")
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            logger.error(f"Erro ao atualizar post {pk}: {str(e)}")
            return Response(
                {"error": "Erro interno do servidor"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )

    def destroy(self, request, pk=None):
        """
        DELETE /api/posts/{id}/ - Deletar post
        """
        try:
            post = get_object_or_404(Post, pk=pk)
            post.delete()
            logger.info(f"Post deletado: ID {pk}")
            return Response(
                {"message": f"Post ID {pk} deletado com sucesso"},
                status=status.HTTP_204_NO_CONTENT,
            )
        except Exception as e:
            logger.error(f"Erro ao deletar post {pk}: {str(e)}")
            return Response(
                {"error": "Erro interno do servidor"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )
