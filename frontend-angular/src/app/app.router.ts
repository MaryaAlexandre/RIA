import { Routes } from '@angular/router';

import { PostListagemComponent } from './components/post-listagem/post-listagem.component';
import { PostFormComponent } from './components/post-form/post-form.component';
import { PostAtualizacaoComponent } from './components/post-atualizacao/post-atualizacao.component';
import { PostDetalheComponent } from './components/post-detalhe/post-detalhe.component';

export const routes: Routes = [
  { path: 'posts', component: PostListagemComponent },                 
  { path: 'posts/incluir', component: PostFormComponent },             
  { path: 'posts/editar/:id', component: PostAtualizacaoComponent },  
  { path: 'posts/detalhe/:id', component: PostDetalheComponent },     
  { path: '', redirectTo: 'posts', pathMatch: 'full' },                
  { path: '**', redirectTo: 'posts' },                                
];
