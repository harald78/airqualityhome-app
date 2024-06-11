import {Component, inject, } from '@angular/core';
import {FormsModule} from "@angular/forms";
import {IconComponent} from "../../../../shared/components/icon/icon/icon.component";
import {NgIf} from "@angular/common";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";


@Component({
  selector: 'app-delete-all-notifications',
  standalone: true,
  imports: [
    FormsModule,
    IconComponent,
    NgIf,
  ],
  templateUrl: './delete-modal.component.html',
  styleUrl: './delete-modal.component.scss'
})
export class DeleteModalComponent {

  activeModal = inject(NgbActiveModal);
  message: string;
}


