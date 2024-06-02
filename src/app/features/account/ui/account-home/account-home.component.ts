import {Component, inject, OnInit, signal, WritableSignal} from '@angular/core';
import {FormBuilder, FormControl, ReactiveFormsModule, Validators} from "@angular/forms";
import {mdiAccount, mdiEmail, mdiLock} from "@mdi/js";
import {IconComponent} from "../../../../shared/components/icon/icon/icon.component";
import {AuthState} from "../../../../core/auth/+state/auth.state";
import {Router} from "@angular/router";
import {EditState} from "../../../../shared/model/edit-state.model";

@Component({
  selector: 'app-account-home',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    IconComponent
  ],
  templateUrl: './account-home.component.html',
  styleUrl: './account-home.component.scss'
})
export class AccountHomeComponent implements OnInit{

  readonly authState = inject(AuthState);
  private readonly fb: FormBuilder = inject(FormBuilder);

  accountIcon = mdiAccount;
  emailIcon = mdiEmail;
  protected readonly lockIcon = mdiLock;
  editState: WritableSignal<EditState> = signal(EditState.view);

  public accountForm = this.fb.group({
    username: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });


  ngOnInit() {
    this.accountForm.patchValue(this.authState.user())
    this.accountForm.get('username')?.disable();
    this.accountForm.get('email')?.disable();
  }

  changeData() {
    this.accountForm.get('username')?.enable();
    this.accountForm.get('email')?.enable();
  }

  saveData() {

  }
}


