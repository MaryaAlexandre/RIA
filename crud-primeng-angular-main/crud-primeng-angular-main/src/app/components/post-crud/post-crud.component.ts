import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { MessageService } from "primeng/api";
import { Post } from "../../models/post"; 
import { PostService } from "../../services/post.service"; 

@Component({
  selector: "app-post-crud",
  templateUrl: "./post-crud.component.html",
  styleUrls: ["./post-crud.component.scss"],
})
export class PostCrudComponent implements OnInit {
  posts: Post[] = [];
  postSelecionado: Post | null = null;

  // Estados dos dialogs
  showFormDialog = false;
  showDetailDialog = false;
  showDeleteDialog = false;
  isNew = true;

  @Output() postsChanged = new EventEmitter<Post[]>();

  constructor(
    private postHttpService: PostService,
    private messageService: MessageService,
  ) {}

  ngOnInit(): void {
    this.carregarPosts();
  }

  carregarPosts(): void {
    this.postHttpService.getPosts().subscribe((posts) => {
      this.posts = posts;
      this.postsChanged.emit(this.posts);
    });
  }

  // Eventos do formulário
  onSalvarPost(post: Post): void {
    if (this.isNew) {
      this.postHttpService.createPost(post).subscribe(() => {
        this.messageService.add({
          severity: "success",
          summary: "Sucesso",
          detail: `Post criado com sucesso!`,
          life: 4000,
        });
        this.carregarPosts();
      });
    } else {
      this.postHttpService.updatePost(post).subscribe(() => {
        this.messageService.add({
          severity: "success",
          summary: "Sucesso",
          detail: `Post atualizado com sucesso!`,
          life: 4000,
        });
        this.carregarPosts();
      });
    }
  }

  // Eventos de exclusão
  onConfirmarExclusao(id: number): void {
    this.postHttpService.deletePost(id).subscribe(() => {
      this.carregarPosts();

      if (this.postSelecionado) {
        this.messageService.add({
          severity: "success",
          summary: "Post Excluído",
          detail: `Post removido com sucesso!`,
          life: 4000,
        });
      }
    });
  }

  // Resto dos métodos
  onCriar(): void {
    this.postSelecionado = null;
    this.isNew = true;
    this.showFormDialog = true;
  }

  onVisualizar(post: Post): void {
    this.postSelecionado = post;
    this.showDetailDialog = true;
  }

  onEditar(post: Post): void {
    this.postSelecionado = post;
    this.isNew = false;
    this.showFormDialog = true;
  }

  onExcluir(id: number): void {
    this.postSelecionado = this.posts.find((p) => p.id === id) || null;
    this.showDeleteDialog = true;
  }

  onEditarDoDetalhe(post: Post): void {
    this.showDetailDialog = false;
    setTimeout(() => {
      this.onEditar(post);
    }, 300);
  }
}
