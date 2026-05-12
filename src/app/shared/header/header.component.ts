import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { logout } from '../../core/services/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  protected logout(): void {
    logout();
  }
}
