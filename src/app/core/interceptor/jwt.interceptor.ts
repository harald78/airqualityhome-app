import {
  HttpHandlerFn,
  HttpInterceptorFn,
  HttpRequest
} from "@angular/common/http";

export const jwtInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next: HttpHandlerFn) => {

  const accessToken = localStorage.getItem("access_token");
  if (accessToken) {
    req = req.clone({ setHeaders: { Authorization: `Bearer ${accessToken}` } });
  }

  return next(req);
}


