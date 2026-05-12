import { HttpInterceptorFn } from '@angular/common/http';
import keycloak from '../services/auth.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = keycloak.token;

  const authReq = token
    ? req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      })
    : req;

  return next(authReq);
};
