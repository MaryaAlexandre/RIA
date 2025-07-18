import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { PostService, Post } from '../../services/post'; 
@Component({
  selector: 'app-post-detalhe',
  standalone: true,
  imports: [CommonModule],
  template: `
    <h2>Detalhe do Post</h2>
    <div *ngIf="post">
      <p><strong>Autor:</strong> {{post.author}}</p>
      <p><strong>Conteúdo:</strong> {{post.content}}</p>
      <p><strong>Curtidas:</strong> {{post.likes_count}}</p>
    </div>
  `
})
export class PostDetalheComponent implements OnInit {
  post?: Post;

  constructor(private route: ActivatedRoute, private postService: PostService) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.postService.getPosts().subscribe((posts: Post[]) => {
        this.post = posts.find(p => p.id === +id);
      });
    }
  }
}
