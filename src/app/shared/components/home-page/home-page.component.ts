import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TileComponent } from '../tile/tile.component';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [RouterModule, TileComponent],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',
})
export class HomePageComponent {}
