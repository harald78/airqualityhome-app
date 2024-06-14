import {Component, inject, Input} from '@angular/core';
import {ReactiveFormsModule} from "@angular/forms";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-confirm-modal',
  standalone: true,
    imports: [
        ReactiveFormsModule
    ],
  templateUrl: './confirm-modal.component.html',
  styleUrl: './confirm-modal.component.scss'
})
export class ConfirmModalComponent {
  activeModal = inject(NgbActiveModal);
  @Input() message: string = '';
}
