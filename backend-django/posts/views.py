

from rest_framework import generics, viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import Post
from .serializers import PostSerializer

class PostViewSet(viewsets.ModelViewSet):
    queryset = Post.objects.all()
    serializer_class = PostSerializer

    # Ação personalizada para "curtir" um post
    @action(detail=True, methods=['put'])
    def like(self, request, pk=None):
        post = self.get_object()
        post.likes_count = (post.likes_count or 0) + 1
        post.save()
        return Response({'id': post.id, 'likes_count': post.likes_count})