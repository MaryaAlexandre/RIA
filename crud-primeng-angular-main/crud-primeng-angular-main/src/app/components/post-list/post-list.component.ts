import { Component, Input, Output, EventEmitter } from "@angular/core"
import { Post } from "../../models/post"  // Ajuste para seu modelo de post

@Component({
  selector: "app-post-list",
  templateUrl: "./post-list.component.html",
  styleUrls: ["./post-list.component.scss"],
})
export class PostListComponent {
  @Input() posts: Post[] = []

  @Output() visualizar = new EventEmitter<Post>()
  @Output() editar = new EventEmitter<Post>()
  @Output() excluir = new EventEmitter<number>()
  @Output() criar = new EventEmitter<void>()

  onVisualizar(post: Post): void {
    this.visualizar.emit(post)
  }

  onEditar(post: Post): void {
    this.editar.emit(post)
  }

  onExcluir(id: number): void {
    this.excluir.emit(id)
  }

  onCriar(): void {
    this.criar.emit()
  }
}
