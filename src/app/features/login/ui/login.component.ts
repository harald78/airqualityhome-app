import {ChangeDetectionStrategy, Component, inject, OnInit} from '@angular/core';
import {FormBuilder, FormControl, ReactiveFormsModule, Validators} from "@angular/forms";
import {IconComponent} from "../../../shared/components/icon/icon/icon.component";
import {mdiAccount, mdiCogTransferOutline, mdiLock} from "@mdi/js";
import {AuthRequestDto} from "../../../core/auth/model/auth-request.model";
import {AuthService} from "../../../core/auth/service/auth.service";
import { PasswordInputComponent } from '../../../shared/components/password-input/password-input.component';
import { IconButtonComponent } from '../../../shared/components/icon-button/icon-button.component';
import {Router} from "@angular/router";
import {AuthState} from "../../../core/auth/+state/auth.state";


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, IconComponent, PasswordInputComponent, IconButtonComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent implements OnInit {

  readonly authService = inject(AuthService);
  readonly authState = inject(AuthState);
  private readonly router: Router = inject(Router);
  private readonly fb: FormBuilder = inject(FormBuilder);

  accountIcon = mdiAccount;
  lockIcon = mdiLock;

  public loginForm= this.fb.group({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  async ngOnInit() {
    if (this.authState.user().id) {
      await this.router.navigate(['dashboard']);
    }
  }

  async login() {
    if (this.loginForm.valid) {
      const authRequestDto = this.loginForm.value as AuthRequestDto;
      await this.authService.login(authRequestDto);
    }
  }

  protected readonly mdiCogTransferOutline = mdiCogTransferOutline;

  openGeneralSettings() {
    this.router.navigate(['general-settings']);
  }
}
