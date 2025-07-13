import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { MessageService } from 'primeng/api'; // Para serviços globais do PrimeNG
import { ConfirmationService } from 'primeng/api'; // Para serviços globais do PrimeNG

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(), // Habilita HttpClient (sem interceptors, se precisar use withInterceptors)
    provideAnimations(), // Habilita animações do navegador (substitui BrowserAnimationsModule)
    MessageService,      // Provedor para p-toast
    ConfirmationService  // Provedor para p-confirmDialog
  ]
}).catch(err => console.error(err));