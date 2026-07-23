import { Component, inject } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { KeycloakAuthService } from '../../../../../core/services/auth.service';
import { UserInfo } from '../../../../models/auth.model';
import { AccountService } from '../../../../services/account.service';

@Component({
  selector: 'app-profile-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile-modal.component.html',
  styleUrl: './profile-modal.component.scss',
})
export class ProfileModalComponent {
  private readonly accountService = inject(AccountService);
  private readonly authService = inject(KeycloakAuthService);

  private static readonly MAX_FILE_SIZE = 2 * 1024 * 1024;
  private static readonly PNG_MIME_TYPE = 'image/png';

  protected readonly userInfo$: Observable<UserInfo> =
    this.accountService.getUserInfo();

  protected readonly avatarUri$: Observable<string> =
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

    if (!this.isValidFile(file)) {
      this.resetInput(input);
      return;
    }

    this.accountService.uploadAvatar(file).subscribe({
      next: () => {
        this.resetInput(input);
      },
      error: () => {
        alert('Upload failed');
        this.resetInput(input);
      },
    });
  }

  private isValidFile(file: File): boolean {
    if (file.type !== ProfileModalComponent.PNG_MIME_TYPE) {
      alert('Only PNG files are allowed');
      return false;
    }

    if (file.size > ProfileModalComponent.MAX_FILE_SIZE) {
      alert('File must be smaller than 2MB');
      return false;
    }

    return true;
  }

  private resetInput(input: HTMLInputElement): void {
    input.value = '';
  }
}
