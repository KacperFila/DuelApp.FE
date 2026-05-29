import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ProfileModalComponent } from './widgets/profile-modal/profile-modal/profile-modal.component';
import { AccountService } from '../services/account.service';
import { Observable } from 'rxjs';
import { UserInfo } from '../models/auth.model';
import { AsyncPipe, NgIf } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule, ProfileModalComponent, NgIf, AsyncPipe],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {}
