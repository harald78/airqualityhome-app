import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationsHomeComponent } from './notifications-home.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import {MockProvider} from "ng-mocks";
import {PushNotificationService} from "../../service/push-notification.service";

describe('NotificationsHomeComponent', () => {
  let component: NotificationsHomeComponent;
  let fixture: ComponentFixture<NotificationsHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NotificationsHomeComponent, HttpClientTestingModule],
      providers: [MockProvider(PushNotificationService)]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NotificationsHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
