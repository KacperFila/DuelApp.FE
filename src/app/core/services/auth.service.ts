import Keycloak from 'keycloak-js';
import { environment } from '../../../environments/environment';

const keycloak = new Keycloak({
  url: `${environment.keycloakUrl}`,
  realm: 'duelapp-realm',
  clientId: 'duelapp_fe_keycloak_client',
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

export default keycloak;
