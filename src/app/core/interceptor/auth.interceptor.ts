import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor() { }

  intercept(httpRequest: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let request = httpRequest;

    // Set headers in API request
    if (request.url.includes(environment.baseApiUrl)) {
      request = request.clone({
        setHeaders: {
          'Content-Type': 'application/json; charset=utf-8',
          'Accept': 'application/json, text/plain',
        },
      })
    }

    return next.handle(request)
      .pipe(catchError((err) => {
        let errorMsg = '';
        if (err instanceof HttpErrorResponse) {
          switch (err.status) {
            case 401:
              errorMsg = 'Request failed with status code 401';
              break;
            case 400:
              errorMsg = 'The request cannot be fulfilled due to bad syntax';
              break;
            case 404:
              errorMsg = 'A server could not find a client-requested webpage';
              break;
            case 500:
              errorMsg = 'Internal server error found';
              break;
            default:
              errorMsg = 'Something went wrong';
              break;
          }
        }
        return throwError(errorMsg); // Return an observable here
      }));
  }
}
