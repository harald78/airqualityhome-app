import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import {provideHttpClient, withInterceptors} from "@angular/common/http";
import {jwtInterceptor} from "./core/interceptor/jwt.interceptor";
import {unauthorizedInterceptor} from "./core/interceptor/unauthorized.interceptor";


export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(withInterceptors([jwtInterceptor, unauthorizedInterceptor]))
  ]
};
