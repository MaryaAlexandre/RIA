import { Component, Input, Output, EventEmitter } from "@angular/core"
import { Post } from "../../models/post"  // Ajuste seu modelo para Post

@Component({
  selector: "app-post-detail",
  templateUrl: "./post-detail.component.html",
  styleUrls: ["./post-detail.component.scss"],
})
export class PostDetailComponent {
  @Input() visible = false
  @Input() post: Post | null = null

  @Output() visibleChange = new EventEmitter<boolean>()
  @Output() editar = new EventEmitter<Post>()
  @Output() fechar = new EventEmitter<void>()

  dataAtual = new Date()

  onEditar(): void {
    if (this.post) {
      this.editar.emit(this.post)
      this.fecharDialog()
    }
  }

  onFechar(): void {
    this.fechar.emit()
    this.fecharDialog()
  }

  private fecharDialog(): void {
    this.visible = false
    this.visibleChange.emit(false)
  }
}
