import Keycloak from 'keycloak-js';
import { environment } from '../../../environments/environment';

const keycloak = new Keycloak({
  url: `${environment.keycloakUrl}`,
  realm: `${environment.keycloakRealm}`,
  clientId: `${environment.keycloakClientId}`,
});

export function initializeKeycloak(): Promise<boolean> {
  return keycloak.init({
    onLoad: 'login-required',
    checkLoginIframe: false,
  });
}

export function getToken(): string | undefined {
  return keycloak.token;
}

export function updateToken(): Promise<boolean> {
  return keycloak.updateToken(30);
}

export function logout(): void {
  const redirectUri = encodeURIComponent(window.location.origin);

  const logoutUrl =
    `${environment.keycloakUrl}/realms/${environment.keycloakRealm}/protocol/openid-connect/logout` +
    `?post_logout_redirect_uri=${redirectUri}` +
    `&id_token_hint=${keycloak.idToken}`;

  keycloak.logout({ redirectUri });
  window.location.href = logoutUrl;
}

export default keycloak;
