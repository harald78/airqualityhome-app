import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountHomeComponent } from './account-home.component';
import { ChangePasswordComponent } from '../change-password/change-password.component';
import { ChangeAccountComponent } from '../change-account/change-account.component';
import { MockComponent } from 'ng-mocks';

describe('AccountHomeComponent', () => {
  let component: AccountHomeComponent;
  let fixture: ComponentFixture<AccountHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccountHomeComponent,
        MockComponent(ChangeAccountComponent), MockComponent(ChangePasswordComponent)]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccountHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
