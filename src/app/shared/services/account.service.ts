import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserInfo } from '../models/auth.model';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  constructor(private httpClient: HttpClient) {}

  private apiUrl: string = `${environment.apiUrl}/api`;

  public getUserInfo(): Observable<UserInfo> {
    return this.httpClient.get<UserInfo>(`${this.apiUrl}/users/me`);
  }

  public getMyAvatarUri(): Observable<string> {
    return this.httpClient.get(`${this.apiUrl}/users/me/avatar`, {
      responseType: 'text',
    });
  }

  public getPlayerAvatarUri(userId: string): Observable<string> {
    return this.httpClient.get(`${this.apiUrl}/users/${userId}/avatar`, {
      responseType: 'text',
    });
  }

  public uploadAvatar(file: File): Observable<string> {
    const formData = new FormData();
    formData.append('file', file);

    return this.httpClient.post(`${this.apiUrl}/users/me/avatar`, formData, {
      responseType: 'text',
    });
  }
}
