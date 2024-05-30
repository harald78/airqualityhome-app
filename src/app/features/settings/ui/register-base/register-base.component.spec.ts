import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterBaseComponent } from './register-base.component';
import {RegisterBaseService} from "../../service/register-base.service";
import {HttpClientTestingModule} from "@angular/common/http/testing";

describe('RegisterBaseComponent', () => {
  let component: RegisterBaseComponent;
  let fixture: ComponentFixture<RegisterBaseComponent>;


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisterBaseComponent, HttpClientTestingModule],
      providers: [RegisterBaseService]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterBaseComponent);

    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


});
