import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostService, Post } from '../../services/post'; 
@Component({
  selector: 'app-post-listagem',
  standalone: true,
  imports: [CommonModule],
  template: `
    <h2>Lista de Posts</h2>
    <ul>
      <li *ngFor="let post of posts">
        <strong>{{ post.author }}</strong>: {{ post.content }}
      </li>
    </ul>
  `
})
export class PostListagemComponent implements OnInit {
  posts: Post[] = [];

  constructor(private postService: PostService) {}

  ngOnInit(): void {
    this.postService.getPosts().subscribe((data: Post[]) => {
      this.posts = data;
    });
  }
}
