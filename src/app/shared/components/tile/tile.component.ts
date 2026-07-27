import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-tile',
  templateUrl: './tile.component.html',
  styleUrls: ['./tile.component.scss'],
  imports: [RouterModule],
  standalone: true,
})
export class TileComponent {
  @Input() title = '';
  @Input() description = '';
  @Input() route?: string | null = null;
  @Input() inactive = false;

  @Output() tileClick = new EventEmitter<void>();

  protected onClick(): void {
    if (!this.inactive) {
      this.tileClick.emit();
    }
  }
}
