import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, of } from "rxjs";
import { catchError, tap } from "rxjs/operators";

export interface Post {
  id: number;
  author: string;
  content: string;
  image?: string;
  created_at: string;
  likes_count: number;
}

@Injectable({
  providedIn: "root",
})
export class PostService {
  private apiUrl = "http://localhost:8000/api/posts"; // URL backend para posts

  private httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/json",
      Accept: "application/json",
    }),
  };

  constructor(private http: HttpClient) {}

  /** GET todos os posts */
  getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(`${this.apiUrl}/`).pipe(
      tap((posts) => console.log(`${posts.length} posts carregados`)),
      catchError(this.handleError<Post[]>("getPosts", []))
    );
  }

  /** GET post por id */
  getPost(id: number): Observable<Post> {
    const url = `${this.apiUrl}/${id}/`;
    return this.http.get<Post>(url).pipe(
      tap((post) => console.log(`Post id=${post.id} carregado`)),
      catchError(this.handleError<Post>(`getPost id=${id}`))
    );
  }

  /** POST criar novo post */
  createPost(post: Partial<Post>): Observable<Post> {
    return this.http.post<Post>(`${this.apiUrl}/`, post, this.httpOptions).pipe(
      tap((newPost) => console.log(`Post id=${newPost.id} criado`)),
      catchError(this.handleError<Post>("createPost"))
    );
  }

  /** POST para curtir um post */
  likePost(postId: number): Observable<{ likes_count: number }> {
    const url = `${this.apiUrl}/${postId}/like/`;
    return this.http.post<{ likes_count: number }>(url, {}, this.httpOptions).pipe(
      tap(() => console.log(`Post id=${postId} curtido`)),
      catchError(this.handleError<{ likes_count: number }>("likePost"))
    );
  }
  
updatePost(post: Post): Observable<Post> {
  const url = `${this.apiUrl}/${post.id}/`;
  return this.http.put<Post>(url, post, this.httpOptions).pipe(
    tap(() => console.log(`Post id=${post.id} atualizado`)),
    catchError(this.handleError<Post>('updatePost'))
  );
}

  /** DELETE um post */
  deletePost(id: number): Observable<any> {
    const url = `${this.apiUrl}/${id}/`;
    return this.http.delete(url, this.httpOptions).pipe(
      tap(() => console.log(`Post id=${id} deletado`)),
      catchError(this.handleError<any>("deletePost"))
    );
  }

  /** Manipula erros das requisições HTTP */
  private handleError<T>(operation = "operation", result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} falhou:`, error);
      if (error.error) {
        console.error("Detalhes do erro:", error.error);
      }
      return of(result as T);
    };
  }
}
