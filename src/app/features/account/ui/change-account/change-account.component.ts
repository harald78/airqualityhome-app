import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { mdiAccount, mdiEmail, mdiLock } from '@mdi/js';
import { IconComponent } from '../../../../shared/components/icon/icon/icon.component';
import { AuthState } from '../../../../core/auth/+state/auth.state';
import { EditState } from '../../../../shared/model/edit-state.model';
import { Router } from '@angular/router';
import { AccountService } from '../../service/account.service';
import { User, UserChangeRequest } from '../../../../shared/model/user.model';
import { PasswordInputComponent } from '../../../../shared/components/password-input/password-input.component';
import { AuthService } from '../../../../core/auth/service/auth.service';

@Component({
  selector: 'app-change-account',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    IconComponent,
    PasswordInputComponent
  ],
  templateUrl: './change-account.component.html',
  styleUrl: './change-account.component.scss'
})
export class ChangeAccountComponent implements OnInit {

  private readonly authState = inject(AuthState);
  private readonly authService: AuthService = inject(AuthService);
  private readonly router = inject(Router);
  private readonly fb: FormBuilder = inject(FormBuilder);
  private readonly accountService: AccountService = inject(AccountService);

  accountIcon = mdiAccount;
  emailIcon = mdiEmail;
  protected readonly lockIcon = mdiLock;
  editState: WritableSignal<EditState> = signal(EditState.view);
  protected readonly EditState = EditState;

  public accountForm = this.fb.group({
    username: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  ngOnInit() {
    this.accountForm.patchValue(this.authState.user())
    this.disableControls();
  }

  changeData() {
    this.enableControls();
    this.editState.set(EditState.edit);
  }

  async saveData() {
    if (this.dataHasChanged()) {
      this.editState.set(EditState.view);
      const username = this.accountForm.get('username')?.value as string;
      const email = this.accountForm.get('email')?.value as string;
      const password = this.accountForm.get('password')?.value as string;
      const changeUserRequest: UserChangeRequest = {
        id: this.authState.user().id!,
        username,
        email,
        password
      }
      const user = await this.accountService.saveUserData(changeUserRequest);
      await this.maybeLogoutOrSetUserState(user);
      this.disableControls();
    }
  }

  async maybeLogoutOrSetUserState(user: User) {
    const currentStateUser = this.authState.user();
    if (currentStateUser.username !== user.username) {
      await this.authService.logout();
      return;
    }
    this.accountForm.patchValue(user);
    await this.authState.setUser(user);
  }

  dataHasChanged(): boolean {
    const user = this.authState.user();
    const username = this.accountForm.get('username')?.value as string;
    const email = this.accountForm.get('email')?.value as string;
    return user.username !== username || user.email !== email;
  }

  cancelChange() {
    const user = this.authState.user();
    this.accountForm.patchValue(user);
    this.disableControls();
    this.editState.set(EditState.view);
  }

  async changePw() {
    await this.router.navigate(['account/change-pw']);
  }

  private disableControls(): void {
    this.accountForm.get('username')?.disable();
    this.accountForm.get('email')?.disable();
    this.accountForm.get('password')?.disable();
  }

  private enableControls(): void {
    this.accountForm.get('username')?.enable();
    this.accountForm.get('email')?.enable();
    this.accountForm.get('password')?.enable();
  }


}


