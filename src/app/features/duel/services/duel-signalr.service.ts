import { Injectable } from '@angular/core';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import { from } from 'rxjs';
import keycloak from '../../../core/services/auth.service';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class DuelSignalrService {
  private hubConnection!: HubConnection;
  private connectionUrl = `${environment.apiUrl}/matchmaking`;

  public connect = () => {
    this.startConnection();
  };

  public testUserRouting() {
    const promise = this.hubConnection
      .invoke('TestUserRouting')
      .then(() => {
        console.log('Test message sent');
      })
      .catch((err) => {
        console.log('SignalR error: ' + err);
      });

    return from(promise);
  }

  private getConnection(): HubConnection {
    return new HubConnectionBuilder()
      .withUrl(this.connectionUrl, {
        accessTokenFactory: async () => {
          await keycloak.updateToken(30);
          return keycloak.token!;
        },
      })
      .withAutomaticReconnect()
      .build();
  }

  private startConnection() {
    this.hubConnection = this.getConnection();

    this.hubConnection
      .start()
      .catch((err) =>
        console.log('error while establishing signalr connection: ' + err),
      );
  }
}
