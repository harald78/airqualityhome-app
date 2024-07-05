import {ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';
import { Router, RouterEvent, NavigationEnd } from '@angular/router';
import { HeaderComponent } from './header.component';
import { Subject } from 'rxjs';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let router: Router;
  let routerEventsSubject: Subject<RouterEvent>;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(() => {
    routerEventsSubject = new Subject<RouterEvent>();

    TestBed.configureTestingModule({
      providers: [
        {
          provide: Router,
          useValue: {
            events: routerEventsSubject.asObservable(),
            _url: '',
            get url() { return this._url; },
            setUrl(value: string) { this._url = value; },
            navigate: jest.fn()
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set header text based on router URL', () => {
    const routerUrls = [
      { url: '/dashboard', expected: 'Dashboard' },
      { url: '/notifications', expected: 'Notifications' },
      { url: '/account', expected: 'Account' },
      { url: '/general-settings', expected: 'App Settings' },
      { url: '/settings', expected: 'App Settings' },
      { url: '/login', expected: 'Login' },
      { url: '/offline', expected: 'Offline' },
      { url: '/other', expected: '' },
    ];

    routerUrls.forEach(test => {
      (router as any).setUrl(test.url);
      routerEventsSubject.next(new NavigationEnd(1, test.url, test.url));
      expect(component.getHeaderText()).toBe(test.expected);
    });
  });

  it('should update header text on router event', fakeAsync(() => {
    (router as any).setUrl('/dashboard');

    fixture.detectChanges();
    tick(100);

    routerEventsSubject.next(new NavigationEnd(1, '/dashboard', '/dashboard'));
    expect(component.headerText).toBe('Dashboard');

    (router as any).setUrl('/notifications');

    fixture.detectChanges();
    tick(100);

    routerEventsSubject.next(new NavigationEnd(2, '/notifications', '/notifications'));
    expect(component.headerText).toBe('Notifications');
  }));
});
