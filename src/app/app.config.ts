import {ApplicationConfig, importProvidersFrom, isDevMode} from '@angular/core';
import {PreloadAllModules, provideRouter, withPreloading} from '@angular/router';
import { routes } from './app.routes';
import {provideHttpClient, withInterceptors} from "@angular/common/http";
import {jwtInterceptor} from "./core/interceptor/jwt.interceptor";
import {unauthorizedInterceptor} from "./core/interceptor/unauthorized.interceptor";
import { apiDateInterceptor } from './core/interceptor/api-date.interceptor';
import { BrowserAnimationsModule, provideAnimations } from '@angular/platform-browser/animations';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideServiceWorker } from '@angular/service-worker';


export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes, withPreloading(PreloadAllModules)),
    provideHttpClient(withInterceptors([jwtInterceptor, unauthorizedInterceptor, apiDateInterceptor])),
    importProvidersFrom(BrowserAnimationsModule), provideAnimationsAsync(),
    provideAnimations(),
    provideServiceWorker('ngsw-worker.js', {
        enabled: !isDevMode(),
        registrationStrategy: 'registerWhenStable:30000'
    })
]
};
