import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DashboardDetailComponent } from './dashboard-detail.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterModule } from '@angular/router';
import { routes } from '../../../../app.routes';

describe('DashboardDetailComponent', () => {
  let component: DashboardDetailComponent;
  let fixture: ComponentFixture<DashboardDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardDetailComponent, HttpClientTestingModule, RouterModule.forRoot(routes)]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
