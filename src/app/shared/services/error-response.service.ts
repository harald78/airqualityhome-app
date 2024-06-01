import {Injectable} from "@angular/core";


@Injectable({providedIn: 'root'})
export class ErrorResponseService {

  getHttpErrorResponseTextByStatus(statusCode: number): string {
    switch (statusCode) {
      case 400:
        return 'BAD REQUEST';
      case 401:
       return 'NOT AUTHORIZED';
      case 403:
       return 'FORBIDDEN';
      case 404:
       return 'NOT FOUND';
      case 500:
        return 'INTERNAL SERVER ERROR';
      default:
        return 'UPS SOMETHING WENT WRONG :('
    }
  }

}
