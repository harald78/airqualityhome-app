import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { IconComponent } from '../../../../shared/components/icon/icon/icon.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-account-home',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    IconComponent,
    RouterOutlet
  ],
  templateUrl: './account-home.component.html',
  styleUrl: './account-home.component.scss'
})
export class AccountHomeComponent {

}


