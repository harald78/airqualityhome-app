import { Component, inject } from '@angular/core';
import { OverlayService } from '../../services/overlay.service';

@Component({
  selector: 'app-overlay',
  standalone: true,
  imports: [],
  templateUrl: './overlay.component.html',
  styleUrl: './overlay.component.scss'
})
export class OverlayComponent {
  protected readonly overlayService: OverlayService = inject(OverlayService);
}
