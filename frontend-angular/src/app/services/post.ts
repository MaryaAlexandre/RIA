import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


export interface Post {
  id?: number;
  author: string;
  content: string;
  image?: string;
  likes_count?: number;
  created_at?: string;
  updated_at?: string; 
}

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private apiUrl = 'http://localhost:8000/api/posts/'; 
  constructor(private http: HttpClient) { }

  getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(this.apiUrl);
  }

  createPost(post: Post): Observable<Post> {
    return this.http.post<Post>(this.apiUrl, post);
  }

  likePost(postId: number): Observable<{ id: number, likes_count: number }> {
    return this.http.put<{ id: number, likes_count: number }>(`${this.apiUrl}${postId}/like/`, {});
  }

  deletePost(postId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}${postId}/`); // Note a barra no final para deletar
  }
}