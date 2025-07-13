import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms'; // Para ngModel
import { Post, PostService } from '../../services/post'; // Seu serviço
import { CommonModule } from '@angular/common'; // Para *ngIf, *ngFor, etc. (se usado no template)
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';


@Component({
  selector: 'app-post-form',
  standalone: true, 
  imports: [
    CommonModule,
    FormsModule,
    InputTextModule,
    ButtonModule,
    CheckboxModule,
  ],
  template: `
    <div class="post-form-card p-card p-component">
      <div class="p-card-header">
        <h3>Criar Novo Post</h3>
      </div>
      <div class="p-card-body">
        <div class="p-field">
          <span class="p-float-label">
            <input id="author" type="text" pInputText [(ngModel)]="newPost.author" />
            <label for="author">Autor (Opcional)</label>
          </span>
        </div>
        <div class="p-field">
          <span class="p-float-label">
            <textarea id="content" rows="5" cols="30" pInputTextarea [(ngModel)]="newPost.content" required></textarea>
            <label for="content">Conteúdo do Post</label>
          </span>
        </div>
        <div class="p-field">
          <span class="p-float-label">
            <input id="image" type="text" pInputText [(ngModel)]="newPost.image" />
            <label for="image">URL da Imagem (Opcional)</label>
          </span>
        </div>
        <button pButton type="button" label="Publicar" (click)="onSubmit()" [disabled]="!newPost.content"></button>
      </div>
    </div>
  `,
  styles: [`
    .post-form-card {
      margin-bottom: 20px;
      padding: 20px;
      background-color: var(--surface-card);
      border-radius: var(--border-radius);
      box-shadow: var(--shadow-2);
    }
    .p-field {
      margin-bottom: 20px;
    }
    textarea {
      resize: vertical; /* Permite redimensionar a altura */
    }
  `]
})
export class PostFormComponent {
  @Output() postCreated = new EventEmitter<void>();

  newPost: Post = {
    author: '',
    content: '',
    image: ''
  };

  constructor(private postService: PostService) { }

  onSubmit(): void {
    if (!this.newPost.content) {
      console.error('Conteúdo do post é obrigatório.');
      return;
    }

    this.postService.createPost(this.newPost).subscribe({
      next: (post) => {
        console.log('Post criado:', post);
        this.postCreated.emit(); 
        this.newPost = { author: '', content: '', image: '' }; 
      },
      error: (err) => console.error('Erro ao criar post:', err)
    });
  }
}