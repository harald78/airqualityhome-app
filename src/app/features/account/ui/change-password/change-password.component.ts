import {Component, inject, OnInit} from '@angular/core';
import {FormBuilder, FormControl, ReactiveFormsModule, Validators} from "@angular/forms";
import {mdiAccount, mdiEmail, mdiLock} from "@mdi/js";
import {IconComponent} from "../../../../shared/components/icon/icon/icon.component";
import {AuthState} from "../../../../core/auth/+state/auth.state";


@Component({
  selector: 'app-change-password',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    IconComponent
  ],
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.scss'
})
export class ChangePasswordComponent implements OnInit{

  readonly authState = inject(AuthState);
  private readonly fb: FormBuilder = inject(FormBuilder);

  accountIcon = mdiAccount;
  emailIcon = mdiEmail;
  protected readonly lockIcon = mdiLock;

  public accountForm = this.fb.group({
    username: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });


  ngOnInit() {
    this.accountForm.patchValue(this.authState.user())
    this.accountForm.get('username')?.disable();
    this.accountForm.get('email')?.disable();
    this.accountForm.get('password')?.disable();
  }

  changeData() {
    this.accountForm.get('username')?.enable();
    this.accountForm.get('email')?.enable();
    this.accountForm.get('password')?.enable();
  }

  saveData() {

  }
}


