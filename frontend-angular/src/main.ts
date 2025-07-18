import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter, Routes } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ConfirmationService } from 'primeng/api';

import { PostFormComponent } from './app/components/post-form/post-form.component';
import { PostListagemComponent } from './app/components/post-listagem/post-listagem.component';
import { PostDetalheComponent } from './app/components/post-detalhe/post-detalhe.component';
import { PostAtualizacaoComponent } from './app/components/post-atualizacao/post-atualizacao.component';

// Rotas
const routes: Routes = [
  { path: 'posts/incluir', component: PostFormComponent },
  { path: 'posts', component: PostListagemComponent },
  { path: 'posts/:id', component: PostDetalheComponent },
  { path: 'posts/:id/editar', component: PostAtualizacaoComponent },
  { path: '', redirectTo: '/posts', pathMatch: 'full' },
  { path: '**', redirectTo: '/posts' }
];

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(),
    provideAnimations(),
    provideRouter(routes),
    MessageService,
    ConfirmationService
  ]
}).catch(err => console.error(err));
