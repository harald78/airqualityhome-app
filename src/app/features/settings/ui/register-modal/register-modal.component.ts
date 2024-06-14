import { ChangeDetectionStrategy, Component, inject, Input } from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-register-modal',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './register-modal.component.html',
  styleUrl: './register-modal.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RegisterModalComponent {
  activeModal = inject(NgbActiveModal);
  location: string = '';

  @Input() name: string = '';
}
