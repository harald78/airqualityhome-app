import {inject} from '@angular/core';
import {
  HttpErrorResponse,
  HttpHandlerFn,
  HttpInterceptorFn,
  HttpRequest
} from '@angular/common/http';
import {throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {AuthService} from "../auth/service/auth.service";

export const unauthorizedInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next: HttpHandlerFn) => {
  const authService = inject(AuthService);

  return next(req).pipe(
    catchError(error => {

      if (error instanceof HttpErrorResponse && (error.status === 401 || error.status === 403)){
        return handle401Error(req, next, authService);
      } else if (error instanceof HttpErrorResponse && (error.status === 0 && error.statusText === "Unknown Error")) {
        return handleUnknownError(req, next, authService);
      } else {
        return throwError(() => error);
      }
    })
  );
}

const handle401Error = (request: HttpRequest<unknown>, next: HttpHandlerFn, authService: AuthService)=> {

  if (request.url.includes('refreshToken')){
    return next(request);

  } else {

    authService.logout();
    return throwError(() => new Error('Unauthorized'));
  }
}

const handleUnknownError = (request: HttpRequest<unknown>, next: HttpHandlerFn, authService: AuthService)=> {
  authService.showSettings();
  return throwError(() => new Error('Unauthorized'));

}
