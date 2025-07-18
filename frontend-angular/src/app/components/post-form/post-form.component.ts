// src/app/components/post-form/post-form.component.ts

import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms'; // Importa ReactiveFormsModule, FormBuilder, FormGroup, Validators
import { CommonModule } from '@angular/common'; // Para *ngIf, *ngFor, etc.

// Caminho de importação ajustado para o seu serviço
import { PostService } from '/workspaces/RIA/frontend-angular/src/app/services/post'; // Seu serviço PostService
// Removida a importação do Post model: import { Post } from '../../models/post.model';

@Component({
  selector: 'app-post-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule 
  ],
  templateUrl: './post-form.component.html', // Aponta para o arquivo HTML externo
  styleUrls: ['./post-form.component.scss']
  
})
export class PostFormComponent implements OnInit {
  postForm!: FormGroup; // Declaração do FormGroup para formulários reativos
  loading: boolean = false; // Para controlar o estado de carregamento do botão

  @Output() postCreated = new EventEmitter<void>();

  // 'newPost' foi removido porque agora usamos o 'postForm' para gerenciar os dados do formulário
  // Se você ainda quiser um objeto para inicialização ou reset, pode ser assim:
  // newPostData = { author: '', content: '', image: '' }; // Tipo inferido como { author: string; content: string; image: string; }

  constructor(
    private fb: FormBuilder, // Injeta FormBuilder para construir o formulário reativo
    private postService: PostService
  ) { }

  ngOnInit(): void {
    // Inicializa o formulário reativo com os campos e suas validações
    this.postForm = this.fb.group({
      author: [''], // Campo de autor opcional
      content: ['', Validators.required], // Conteúdo é obrigatório
      image: [''] // URL da imagem opcional
    });
  }

  onSubmit(): void {
    // Verifica se o formulário é válido
    if (this.postForm.invalid) {
      this.postForm.markAllAsTouched(); // Marca todos os campos como "touched" para exibir erros de validação
      console.error('Conteúdo do post é obrigatório.'); // Feedback no console
      return;
    }

    this.loading = true; // Ativa o estado de carregamento do botão
    // Pega os valores do formulário. O tipo será inferido pelo TypeScript como um objeto literal.
    const newPostData: { author: string, content: string, image: string } = this.postForm.value;

    this.postService.createPost(newPostData).subscribe({ // Passa o objeto literal
      next: (postResponse: any) => { // 'postResponse' agora é 'any' ou um tipo inferido
        console.log('Post criado:', postResponse);
        this.postCreated.emit(); // Emite evento para o componente pai (AppComponent)
        this.postForm.reset(); // Reseta o formulário após o sucesso
        this.loading = false; // Desativa o estado de carregamento
      },
      error: (err: any) => { // Tipagem explícita para o objeto 'err' de erro
        console.error('Erro ao criar post:', err);
        this.loading = false; // Desativa o estado de carregamento mesmo em caso de erro
      }
    });
  }
}
