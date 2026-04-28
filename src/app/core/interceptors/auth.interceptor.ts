import keycloak, { updateToken } from '../services/auth.service';

export const authInterceptor: any = async (req: any, next: any) => {
  if (keycloak.token) {
    await updateToken();

    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${keycloak.token}`,
      },
    });
  }

  return next(req);
};
