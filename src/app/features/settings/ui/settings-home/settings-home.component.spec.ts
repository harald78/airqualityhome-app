import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsHomeComponent } from './settings-home.component';
import {Router} from "@angular/router";

describe('SettingsHomeComponent', () => {
  let component: SettingsHomeComponent;
  let fixture: ComponentFixture<SettingsHomeComponent>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SettingsHomeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SettingsHomeComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to register', () => {
    jest.spyOn(router, 'navigate').mockResolvedValue(true);

    component = fixture.componentInstance;
    component.register();

    expect(router.navigate).toHaveBeenCalledWith(['', 'register']);
  });
});
