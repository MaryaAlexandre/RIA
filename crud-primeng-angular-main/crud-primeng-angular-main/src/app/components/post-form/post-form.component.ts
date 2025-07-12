import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from "@angular/core"
import { MessageService } from "primeng/api"
import { Post } from "../../models/post"  // ajuste o caminho se necessário

@Component({
  selector: "app-post-form",
  templateUrl: "./post-form.component.html",
  styleUrls: ["./post-form.component.scss"],
 
})
export class PostFormComponent implements OnChanges {
  @Input() visible = false
  @Input() post: Post | null = null
  @Input() isNew = true

  @Output() visibleChange = new EventEmitter<boolean>()
  @Output() salvar = new EventEmitter<Post>()
  @Output() cancelar = new EventEmitter<void>()

  postForm: Post = this.criarPostVazio()

  constructor(private messageService: MessageService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes["post"] && this.post) {
      this.postForm = { ...this.post }
    } else if (changes["isNew"] && this.isNew) {
      this.postForm = this.criarPostVazio()
    }
  }

  criarPostVazio(): Post {
    return {
      id: 0,
      author: '',
      content: '',
      created_at: '',
      likes_count: 0,
      image: ''
    }
  }

  onSalvar(): void {
    if (!this.validarFormulario()) {
      return
    }

    this.salvar.emit({ ...this.postForm })
    this.fecharDialog()
  }

  onCancelar(): void {
    this.cancelar.emit()
    this.fecharDialog()
  }

  private validarFormulario(): boolean {
    if (!this.postForm.content.trim()) {
      this.messageService.add({
        severity: "warn",
        summary: "Atenção",
        detail: "Conteúdo da postagem não pode estar vazio!",
      })
      return false
    }

    return true
  }

  private fecharDialog(): void {
    this.visible = false
    this.visibleChange.emit(false)
  }
}
