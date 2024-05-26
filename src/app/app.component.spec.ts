import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import {ActivatedRoute, RouterModule} from "@angular/router";
import {MockProvider} from "ng-mocks";

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent, RouterModule],
      providers: [MockProvider(ActivatedRoute)]
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have the 'airqualityhome-app' title`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('airqualityhome-app');
  });
});
