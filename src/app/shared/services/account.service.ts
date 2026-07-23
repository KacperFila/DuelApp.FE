import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, shareReplay, tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { UserInfo } from '../models/auth.model';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  constructor(private httpClient: HttpClient) {}

  private apiUrl: string = `${environment.apiUrl}/api`;

  private userInfo$?: Observable<UserInfo>;

  private myAvatarCache$?: Observable<string>;

  private playerAvatarCache = new Map<string, Observable<string>>();

  public getUserInfo(): Observable<UserInfo> {
    if (!this.userInfo$) {
      this.userInfo$ = this.httpClient
        .get<UserInfo>(`${this.apiUrl}/users/me`)
        .pipe(shareReplay(1));
    }

    return this.userInfo$;
  }

  public getMyAvatarUri(): Observable<string> {
    if (!this.myAvatarCache$) {
      this.myAvatarCache$ = this.httpClient
        .get(`${this.apiUrl}/users/me/avatar`, {
          responseType: 'text',
        })
        .pipe(shareReplay(1));
    }

    return this.myAvatarCache$;
  }

  public getPlayerAvatarUri(userId: string): Observable<string> {
    const cachedAvatar = this.playerAvatarCache.get(userId);

    if (cachedAvatar) {
      return cachedAvatar;
    }

    const avatar$ = this.httpClient
      .get(`${this.apiUrl}/users/${userId}/avatar`, {
        responseType: 'text',
      })
      .pipe(shareReplay(1));

    this.playerAvatarCache.set(userId, avatar$);

    return avatar$;
  }

  public uploadAvatar(file: File): Observable<string> {
    const formData = new FormData();
    formData.append('file', file);

    return this.httpClient
      .post(`${this.apiUrl}/users/me/avatar`, formData, {
        responseType: 'text',
      })
      .pipe(
        tap(() => {
          this.myAvatarCache$ = undefined;
        }),
      );
  }

  public clearPlayerAvatarCache(userId?: string): void {
    if (userId) {
      this.playerAvatarCache.delete(userId);
      return;
    }

    this.playerAvatarCache.clear();
  }
}
