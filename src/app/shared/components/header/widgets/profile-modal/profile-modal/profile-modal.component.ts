import { Component, inject } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { KeycloakAuthService } from '../../../../../../core/services/auth.service';
import { UserInfo } from '../../../../../models/auth.model';
import { AccountService } from '../../../../../services/account.service';

@Component({
  selector: 'app-profile-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile-modal.component.html',
  styleUrl: './profile-modal.component.scss',
})
export class ProfileModalComponent {
  private accountService = inject(AccountService);
  private authService = inject(KeycloakAuthService);

  private static readonly MAX_FILE_SIZE = 2 * 1024 * 1024;
  private static readonly PNG_MIME_TYPE = 'image/png';

  protected readonly userInfo$: Observable<UserInfo | null> =
    this.accountService.getUserInfo();

  protected avatarUri$: Observable<string> =
    this.accountService.getMyAvatarUri();

  protected readonly showProfileModal$ = new BehaviorSubject<boolean>(false);

  protected logout(): void {
    this.authService.logout();
  }

  protected toggleProfileModal(): void {
    this.showProfileModal$.next(!this.showProfileModal$.value);
  }

  protected onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];

    if (!file) {
      return;
    }

    if (!this.isValidPng(file)) {
      alert('Only PNG files are allowed');
      this.resetInput(input);
      return;
    }

    if (!this.isValidFileSize(file)) {
      alert('File must be smaller than 2MB');
      this.resetInput(input);
      return;
    }

    this.accountService.uploadAvatar(file).subscribe({
      next: () => {
        this.avatarUri$ = this.accountService.getMyAvatarUri();
        this.resetInput(input);
      },
      error: () => {
        alert('Upload failed');
        this.resetInput(input);
      },
    });
  }

  private isValidPng(file: File): boolean {
    return file.type === ProfileModalComponent.PNG_MIME_TYPE;
  }

  private isValidFileSize(file: File): boolean {
    return file.size <= ProfileModalComponent.MAX_FILE_SIZE;
  }

  private resetInput(input: HTMLInputElement): void {
    input.value = '';
  }
}
