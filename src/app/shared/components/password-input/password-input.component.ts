import { Component, computed, ContentChild, input, Signal, signal, TemplateRef, ViewEncapsulation, WritableSignal } from '@angular/core';
import { mdiEyeOffOutline, mdiEyeOutline, mdiLock } from '@mdi/js';
import { IconComponent } from '../icon/icon/icon.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgTemplateOutlet } from '@angular/common';

@Component({
  selector: 'app-password-input',
  standalone: true,
  imports: [
    IconComponent,
    ReactiveFormsModule,
    NgTemplateOutlet
  ],
  templateUrl: './password-input.component.html',
  styleUrl: './password-input.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class PasswordInputComponent {

  @ContentChild('password') tmplRef: TemplateRef<any>;

  protected readonly lockIcon = mdiLock;
  formControlName = input<string>('');
  placeholder = input('Password');

  showPassword: WritableSignal<boolean> = signal(false);
  showPasswordType: Signal<string> = computed(() => this.showPassword() ? 'text' : 'password');
  passwordEyeIcon: Signal<string> = computed(() => this.showPassword() ? mdiEyeOutline : mdiEyeOffOutline);

}

