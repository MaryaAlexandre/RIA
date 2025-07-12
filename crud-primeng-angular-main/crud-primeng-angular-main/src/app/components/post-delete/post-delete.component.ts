import { Component, Input, Output, EventEmitter } from "@angular/core"
import { Post } from "../../models/post"  // Ajuste para o modelo correto de Post

@Component({
  selector: "app-post-delete",
  templateUrl: "./post-delete.component.html",
  styleUrls: ["./post-delete.component.scss"],
})
export class PostDeleteComponent {
  @Input() visible = false
  @Input() post: Post | null = null

  @Output() visibleChange = new EventEmitter<boolean>()
  @Output() confirmar = new EventEmitter<number>()
  @Output() cancelar = new EventEmitter<void>()

  onConfirmar(): void {
    if (this.post?.id) {
      this.confirmar.emit(this.post.id)
      this.fecharDialog()
    }
  }

  onCancelar(): void {
    this.cancelar.emit()
    this.fecharDialog()
  }

  private fecharDialog(): void {
    this.visible = false
    this.visibleChange.emit(false)
  }
}
