import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { mdiAccount, mdiCheck, mdiEmail, mdiLock } from '@mdi/js';
import { IconComponent } from '../../../../shared/components/icon/icon/icon.component';
import { AuthState } from '../../../../core/auth/+state/auth.state';
import { EditState } from '../../../../shared/model/edit-state.model';
import { Router } from '@angular/router';
import { AccountService } from '../../service/account.service';
import { UserChangeRequest } from '../../../../shared/model/user.model';
import { Toast, ToastService } from '../../../../shared/components/toast/toast.service';

@Component({
  selector: 'app-change-account',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    IconComponent
  ],
  templateUrl: './change-account.component.html',
  styleUrl: './change-account.component.scss'
})
export class ChangeAccountComponent implements OnInit {

  readonly authState = inject(AuthState);
  readonly router = inject(Router);
  private readonly fb: FormBuilder = inject(FormBuilder);
  readonly accountService: AccountService = inject(AccountService);
  readonly toastService: ToastService = inject(ToastService);

  accountIcon = mdiAccount;
  emailIcon = mdiEmail;
  protected readonly lockIcon = mdiLock;
  editState: WritableSignal<EditState> = signal(EditState.view);
  protected readonly EditState = EditState;

  public accountForm = this.fb.group({
    username: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required)
  });

  ngOnInit() {
    this.accountForm.patchValue(this.authState.user())
    this.accountForm.get('username')?.disable();
    this.accountForm.get('email')?.disable();
  }

  changeData() {
    this.accountForm.get('username')?.enable();
    this.accountForm.get('email')?.enable();
    this.editState.set(EditState.edit);
  }

  async saveData() {
    if (this.dataHasChanged()) {
      this.editState.set(EditState.view);
      const username = this.accountForm.get('username')?.value as string;
      const email = this.accountForm.get('email')?.value as string;
      const changeUserRequest: UserChangeRequest = {
        id: this.authState.user().id!,
        username,
        email
      }
      const user = await this.accountService.saveUserData(changeUserRequest);
      await this.authState.setUser(user);
      this.accountForm.patchValue(user);
      const successToast: Toast = {classname: "bg-success text-light", header: '',
        body: "Saved changes successfully", icon: mdiCheck, iconColor: "white"};
      this.accountForm.get('username')?.disable();
      this.accountForm.get('email')?.disable();
      this.toastService.show(successToast);
    }
  }

  dataHasChanged(): boolean {
    const user = this.authState.user();
    const username = this.accountForm.get('username')?.value as string;
    const email = this.accountForm.get('email')?.value as string;
    return user.username !== username || email !== email;
  }

  cancelChange() {
    const user = this.authState.user();
    this.accountForm.patchValue(user);
    this.accountForm.get('username')?.disable();
    this.accountForm.get('email')?.disable();
    this.editState.set(EditState.view);
  }

  async changePw() {
    await this.router.navigate(['account/change-pw']);
  }


}


