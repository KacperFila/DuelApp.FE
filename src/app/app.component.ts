import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { environment } from '../environments/environment';
import { HeaderComponent } from './shared/header/header.component';
import { DuelSignalrService } from './features/duel/services/duel-signalr.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  constructor(private signalRService: DuelSignalrService) {}

  ngOnInit(): void {
    this.signalRService.startConnection();
  }

  title = environment.apiUrl;
}
