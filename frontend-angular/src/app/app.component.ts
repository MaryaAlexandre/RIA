import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common'; // Para *ngFor, *ngIf, date pipe
import { PostService, Post } from './services/post'; // CONFIRME: o arquivo é 'post.service.ts' e está em 'src/app/services/'
import { PostFormComponent } from './components/post-form/post-form.component';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card'; // Para estilizar os posts
import { TagModule } from 'primeng/tag'; // Para talvez tags ou badges
import { MessageService } from 'primeng/api';
import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true, 
  imports: [ // IMPORTANTE: Lista todas as dependências usadas no template
    CommonModule,
    PostFormComponent, // Seu componente de formulário
    ToastModule,       // Para p-toast
    ConfirmDialogModule, // Para p-confirmDialog
    ButtonModule,      // Para pButton
    CardModule, 
    TagModule         
  ],
  providers: [ 
    MessageService,
    ConfirmationService
  ]
})
export class AppComponent implements OnInit {
  title = 'Mini Rede Social Angular';

  posts: Post[] = [];
  totalPosts = 0;

  constructor(
    private postService: PostService,
    private messageService: MessageService, // Para usar com p-toast
    private confirmationService: ConfirmationService // Para usar com p-confirmDialog
  ) {}

  ngOnInit(): void {
    this.reloadPosts();
  }

  reloadPosts(): void {
    this.postService.getPosts().subscribe({
      next: (response) => {
        // DRF com pagination pode retornar { count: N, results: [...] }
        // Se não houver paginação, ele retorna direto o array.
        this.posts = Array.isArray(response) ? response : (response as any).results;
        this.totalPosts = Array.isArray(response) ? response.length : (response as any).count || 0;
      },
      error: (err) => {
        console.error('Erro ao carregar posts:', err);
        this.messageService.add({severity:'error', summary:'Erro', detail:'Falha ao carregar posts.'});
      }
    });
  }

  like(postId: number): void {
    this.postService.likePost(postId).subscribe({
      next: (res) => {
        const index = this.posts.findIndex(p => p.id === res.id); // Use res.id
        if (index !== -1) {
          this.posts[index].likes_count = res.likes_count;
        }
        this.messageService.add({severity:'success', summary:'Sucesso', detail:'Post curtido!'});
      },
      error: (err) => {
        console.error('Erro ao curtir post:', err);
        this.messageService.add({severity:'error', summary:'Erro', detail:'Falha ao curtir post.'});
      }
    });
  }

  deletePost(postId: number): void {
    this.confirmationService.confirm({
      message: 'Tem certeza que deseja excluir este post?',
      header: 'Confirmação de Exclusão',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Sim',
      rejectLabel: 'Não',
      accept: () => {
        this.postService.deletePost(postId).subscribe({
          next: () => {
            this.messageService.add({severity:'success', summary:'Sucesso', detail:'Post excluído!'});
            this.reloadPosts(); // Recarrega os posts após exclusão
          },
          error: (err) => {
            console.error('Erro ao excluir post:', err);
            this.messageService.add({severity:'error', summary:'Erro', detail:'Falha ao excluir post.'});
          }
        });
      },
      reject: () => {
        this.messageService.add({severity:'info', summary:'Cancelado', detail:'Exclusão cancelada'});
      }
    });
  }

  onPostCreated(): void {
    this.reloadPosts();
    this.messageService.add({severity:'success', summary:'Sucesso', detail:'Post criado com sucesso!'});
  }
}