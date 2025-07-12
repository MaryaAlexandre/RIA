import { Component, OnInit } from '@angular/core';
import { PostService, Post } from './services/post.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'gerenciador-posts-angular';

  posts: Post[] = [];
  totalPosts = 0;

  constructor(private postService: PostService) {}

  ngOnInit(): void {
    this.reloadPosts();
  }

  // ⚡ Carrega os posts do backend
  reloadPosts(): void {
    this.postService.getPosts().subscribe({
      next: (posts) => {
        this.posts = posts;
        this.totalPosts = posts.length;
      },
      error: (err) => console.error('Erro ao carregar posts:', err)
    });
  }

  // ❤️ Curtir post pelo ID
  like(postId: number): void {
    this.postService.likePost(postId).subscribe({
      next: (res) => {
        // Atualiza likes localmente após curtir
        const index = this.posts.findIndex(p => p.id === postId);
        if (index !== -1) {
          this.posts[index].likes_count = res.likes_count;
        }
      },
      error: (err) => console.error('Erro ao curtir post:', err)
    });
  }

  // Atualiza a lista quando um novo post for criado (evento do filho)
  onPostCreated(): void {
    this.reloadPosts();
  }
}
