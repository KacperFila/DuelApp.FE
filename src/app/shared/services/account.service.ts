import { Injectable, DestroyRef, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, shareReplay, tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { UserInfo } from '../models/auth.model';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  private readonly destroyRef = inject(DestroyRef);

  constructor(private httpClient: HttpClient) {
    this.destroyRef.onDestroy(() => this.clearAllCache());
  }

  private apiUrl: string = `${environment.apiUrl}/api`;

  private userInfo$?: Observable<UserInfo>;

  private myAvatarCache$?: Observable<string>;

  private playerAvatarCache = new Map<string, Observable<string>>();

  public getUserInfo(): Observable<UserInfo> {
    if (!this.userInfo$) {
      this.userInfo$ = this.httpClient
        .get<UserInfo>(`${this.apiUrl}/users/me`)
        .pipe(shareReplay({ bufferSize: 1, refCount: true }));
    }

    return this.userInfo$;
  }

  public getMyAvatarUri(): Observable<string> {
    if (!this.myAvatarCache$) {
      this.myAvatarCache$ = this.httpClient
        .get(`${this.apiUrl}/users/me/avatar`, {
          responseType: 'text',
        })
        .pipe(shareReplay({ bufferSize: 1, refCount: true }));
    }

    return this.myAvatarCache$;
  }

  public getPlayerAvatarUri(profileId: string): Observable<string> {
    const cachedAvatar = this.playerAvatarCache.get(profileId);

    if (cachedAvatar) {
      return cachedAvatar;
    }

    const avatar$ = this.httpClient
      .get(`${this.apiUrl}/users/${profileId}/avatar`, {
        responseType: 'text',
      })
      .pipe(shareReplay({ bufferSize: 1, refCount: true }));

    this.playerAvatarCache.set(profileId, avatar$);

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

  public clearPlayerAvatarCache(profileId?: string): void {
    if (profileId) {
      this.playerAvatarCache.delete(profileId);
      return;
    }

    this.playerAvatarCache.clear();
  }

  public clearAllCache(): void {
    this.userInfo$ = undefined;
    this.myAvatarCache$ = undefined;
    this.playerAvatarCache.clear();
  }
}
