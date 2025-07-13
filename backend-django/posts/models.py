

from django.db import models

class Post(models.Model):
    author = models.CharField(max_length=100, blank=True, default='Anônimo')
    content = models.TextField()
    image = models.URLField(max_length=200, blank=True, null=True)
    likes_count = models.IntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-created_at'] # Ordena os posts pelo mais recente primeiro

    def __str__(self):
        return f"{self.author}: {self.content[:50]}..."
