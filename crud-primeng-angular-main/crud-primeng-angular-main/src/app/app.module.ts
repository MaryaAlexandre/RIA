
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';


// Módulos PrimeNG usados
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { TagModule } from 'primeng/tag';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { CheckboxModule } from 'primeng/checkbox';

// Serviços PrimeNG
import { MessageService } from 'primeng/api';
import { ConfirmationService } from 'primeng/api';

// Componentes (confirma caminhos)
import { AppComponent } from './app.component';
import { PostCrudComponent } from './components/post-crud/post-crud.component';
import { PostListComponent } from './components/post-list/post-list.component';
import { PostFormComponent } from './components/post-form/post-form.component';
import { PostDetailComponent } from './components/post-detail/post-detail.component';
import { PostDeleteComponent } from './components/post-delete/post-delete.component';

@NgModule({
  declarations: [
    AppComponent,
    PostCrudComponent,
    PostListComponent,
    PostFormComponent,
    PostDetailComponent,
    PostDeleteComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    ButtonModule,
    CardModule,
    DialogModule,
    TableModule,
    ToastModule,
    TagModule,
    ConfirmDialogModule,
    InputTextModule,
    InputTextModule,
    CheckboxModule,
  ],
  providers: [
    MessageService,
    ConfirmationService,
    provideHttpClient(withInterceptorsFromDi()),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

