import Keycloak from 'keycloak-js';
import { environment } from '../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class KeycloakAuthService {
  private keycloak: Keycloak;

  constructor(private httpClient: HttpClient) {
    this.keycloak = new Keycloak({
      url: environment.keycloakUrl,
      realm: environment.keycloakRealm,
      clientId: environment.keycloakClientId,
    });
  }

  async initialize(): Promise<boolean> {
    const authenticated = await this.keycloak.init({
      onLoad: 'login-required',
      checkLoginIframe: false,
    });

    return authenticated;
  }

  getToken(): string | undefined {
    return this.keycloak.token;
  }

  async updateToken(): Promise<boolean> {
    return this.keycloak.updateToken(30);
  }

  logout(): void {
    const redirectUri = window.location.origin;

    this.keycloak.logout({
      redirectUri,
    });
  }

  getKeycloak(): Keycloak {
    return this.keycloak;
  }
}
