import { Component, inject, OnInit } from '@angular/core';
import {FormBuilder, FormControl, ReactiveFormsModule, Validators} from "@angular/forms";
import { mdiLock } from '@mdi/js';
import {IconComponent} from "../../../../shared/components/icon/icon/icon.component";
import {AuthState} from "../../../../core/auth/+state/auth.state";
import { Router } from '@angular/router';
import { AccountService } from '../../service/account.service';
import { samePasswordValidator } from '../../util/form-validator.util';
import { PasswordChangeRequest } from '../../../../shared/model/user.model';
import { PasswordInputComponent } from '../../../../shared/components/password-input/password-input.component';
import { AuthService } from '../../../../core/auth/service/auth.service';

@Component({
  selector: 'app-change-password',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    IconComponent,
    PasswordInputComponent
  ],
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.scss'
})
export class ChangePasswordComponent implements OnInit {

  private readonly authState = inject(AuthState);
  private readonly authService: AuthService = inject(AuthService);
  private readonly router = inject(Router);
  private readonly fb: FormBuilder = inject(FormBuilder);
  protected readonly accountService: AccountService = inject(AccountService);
  protected readonly lockIcon = mdiLock;

  passwordForm = this.fb.group({
    oldPassword: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    passwordRepeat: new FormControl('', Validators.required)
  });

  ngOnInit() {
    this.passwordForm.get('passwordRepeat')?.addValidators(samePasswordValidator(this.passwordForm.get('password')!));
  }

  async saveData() {
    const password = this.passwordForm.get('password')?.value!;
    const oldPassword = this.passwordForm.get('oldPassword')?.value!;
    const passwordChangeRequest: PasswordChangeRequest = {
      id: this.authState.user().id!,
      username: this.authState.user().username!,
      password,
      oldPassword
    }
    await this.accountService.savePassword(passwordChangeRequest);
    await this.authService.logout();
  }

  async navigateBack() {
    await this.router.navigate(['account']);
  }
}


