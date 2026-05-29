import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ProfileModalComponent } from './widgets/profile-modal/profile-modal/profile-modal.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule, ProfileModalComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {}
