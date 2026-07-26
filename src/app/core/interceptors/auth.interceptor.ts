import { HttpHandlerFn, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, from, switchMap, throwError } from 'rxjs';
import { KeycloakAuthService } from '../services/auth.service';

export function authInterceptor(
  req: HttpRequest<unknown>,
  next: HttpHandlerFn,
) {
  const authService = inject(KeycloakAuthService);

  return from(authService.ensureValidToken()).pipe(
    switchMap((token) => {
      const newReq = req.clone({
        headers: req.headers.append('Authorization', `Bearer ${token}`),
      });
      return next(newReq);
    }),
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401) {
        authService.logout();
      }
      return throwError(() => error);
    })
  );
}
