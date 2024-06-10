import {Component, inject} from '@angular/core';
import {FormBuilder, FormControl, ReactiveFormsModule, Validators} from "@angular/forms";
import {IconComponent} from "../../../shared/components/icon/icon/icon.component";
import {mdiAccount, mdiLock} from "@mdi/js";
import {AuthRequestDto} from "../../../core/auth/model/auth-request.model";
import {AuthService} from "../../../core/auth/service/auth.service";
import { PasswordInputComponent } from '../../../shared/components/password-input/password-input.component';
import { IconButtonComponent } from '../../../shared/components/icon-button/icon-button.component';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, IconComponent, PasswordInputComponent, IconButtonComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  readonly authService = inject(AuthService);
  private readonly fb: FormBuilder = inject(FormBuilder);

  accountIcon = mdiAccount;
  lockIcon = mdiLock;

  public loginForm= this.fb.group({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  async login() {
    if (this.loginForm.valid) {
      const authRequestDto = this.loginForm.value as AuthRequestDto;
      await this.authService.login(authRequestDto);
    }

  }
}
