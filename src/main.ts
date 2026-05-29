import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { KeycloakAuthService } from './app/core/services/auth.service';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
import {
  provideHttpClient,
  withInterceptors,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { APP_INITIALIZER } from '@angular/core';
import { authInterceptor } from './app/core/interceptors/auth.interceptor';

export function initializeKeycloak(auth: KeycloakAuthService) {
  return () => auth.initialize();
}

bootstrapApplication(AppComponent, {
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: initializeKeycloak,
      deps: [KeycloakAuthService],
      multi: true,
    },
    provideRouter(routes),
    provideHttpClient(withInterceptors([authInterceptor])),
  ],
});
