from django.db import models

class Post(models.Model):
    titulo = models.CharField(max_length=200, verbose_name="Título da Postagem")
    conteudo = models.TextField(verbose_name="Conteúdo")
    publicado = models.BooleanField(default=True, verbose_name="Publicado")
    created_at = models.DateTimeField(auto_now_add=True, verbose_name="Criado em")
    updated_at = models.DateTimeField(auto_now=True, verbose_name="Atualizado em")

    class Meta:
        verbose_name = "Post"
        verbose_name_plural = "Posts"
        ordering = ['-created_at']

    def __str__(self):
        return self.titulo
