import {ApplicationConfig, importProvidersFrom} from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import {provideHttpClient, withInterceptors} from "@angular/common/http";
import {jwtInterceptor} from "./core/interceptor/jwt.interceptor";
import {unauthorizedInterceptor} from "./core/interceptor/unauthorized.interceptor";
import { apiDateInterceptor } from './core/interceptor/api-date.interceptor';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';


export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(withInterceptors([jwtInterceptor, unauthorizedInterceptor, apiDateInterceptor])),
    importProvidersFrom(BrowserAnimationsModule), provideAnimationsAsync()
  ]
};
