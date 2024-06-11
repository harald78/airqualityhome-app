import { Component, inject, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {

  private readonly router: Router = inject(Router);

  headerText: string;

  ngOnInit() {
    this.router.events.subscribe(event => {
      this.headerText = this.getHeaderText();
    });
  }

  getHeaderText(): string {
    if (this.router.url.includes('dashboard')) {
      return 'Dashboard';
    } else if (this.router.url.includes('notifications')) {
      return 'Notifications';
    } else if (this.router.url.includes('account')) {
      return 'Account';
    } else if (this.router.url.includes('general-settings')) {
      return 'App Settings';
    } else if (this.router.url.includes('settings')) {
      return 'App Settings';
    } else if (this.router.url.includes('login')) {
      return 'Login';
    } else {
      return "";
    }
  }

}
