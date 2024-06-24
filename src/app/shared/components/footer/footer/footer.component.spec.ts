import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterComponent } from './footer.component';
import {IconComponent} from "../../icon/icon/icon.component";
import {MockProvider} from "ng-mocks";
import {ActivatedRoute, RouterModule} from "@angular/router";
import {routesMock} from "../../../../../../mock/routes.mock";

describe('FooterComponent', () => {
  let component: FooterComponent;
  let fixture: ComponentFixture<FooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FooterComponent, IconComponent, RouterModule.forRoot(routesMock)],
      providers: [MockProvider(ActivatedRoute)]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
