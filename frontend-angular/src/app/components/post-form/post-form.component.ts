// src/app/components/post-form/post-form.component.ts

import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms'; 
import { CommonModule } from '@angular/common'; 
import { PostService } from '/workspaces/RIA/frontend-angular/src/app/services/post'; 
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


  constructor(
    private fb: FormBuilder, // Injeta FormBuilder para construir o formulário reativo
    private postService: PostService
  ) { }

  ngOnInit(): void {
    // Inicializa o formulário reativo com os campos e suas validações
    this.postForm = this.fb.group({
      author: [''], // Campo de autor opcional
      content: ['', Validators.required], 
      image: [''] 
    });
  }

  onSubmit(): void {
    if (this.postForm.invalid) {
      this.postForm.markAllAsTouched(); // Marca todos os campos como "touched" para exibir erros de validação
      console.error('Conteúdo do post é obrigatório.'); // Feedback no console
      return;
    }

    this.loading = true; 
    // Pega os valores do formulário.
    const newPostData: { author: string, content: string, image: string } = this.postForm.value;

    this.postService.createPost(newPostData).subscribe({ // Passa o objeto literal
      next: (postResponse: any) => { // 'postResponse' agora é 'any' ou um tipo inferido
        console.log('Post criado:', postResponse);
        this.postCreated.emit(); 
        this.postForm.reset(); 
        this.loading = false;
      },
      error: (err: any) => { 
        console.error('Erro ao criar post:', err);
        this.loading = false; // Desativa o estado de carregamento mesmo em caso de erro
      }
    });
  }
}
