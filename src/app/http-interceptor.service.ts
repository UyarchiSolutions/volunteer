import { Router } from '@angular/router';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, tap, throwError, BehaviorSubject, finalize, forkJoin } from 'rxjs';
import { AuthcheckService } from './auth-guard/authcheck.service';

@Injectable({
  providedIn: 'root'
})
export class HttpInterceptorService implements HttpInterceptor {

  constructor(private router: Router, private authcheck: AuthcheckService) { }
  showloader: any = false;

  private activeRequests = 0;

  private requests = 0; // Counter to keep track of ongoing requests

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.requests++;

    let token: any = localStorage.getItem('volunteer') == null ? '' : localStorage.getItem('volunteer');
    const modifiedRequest = request.clone({
      headers: request.headers.set('auth', token),
    });
    let head: any = request.headers.get('loader')
    console.log(head,request.reportProgress)
    if (head != 'false' ) {
      if (!this.showloader) {
        setTimeout(() => {
          this.authcheck.change_header(true)
        }, 0)
        this.showloader = true;
      }
    }
    return next.handle(modifiedRequest).pipe(
      tap(
        () => { },
        (error) => {
          let errorMessage = '';

          if (error.error instanceof ErrorEvent) {
            errorMessage = error.error.message;

          } else {
            if (error.status === 401) {
              // errorMessage = `Unauthorized access`;
              // localStorage.removeItem('candAuth')
              // this.router.navigateByUrl('/emp/login', { replaceUrl: true })
            }
            else {
              errorMessage = error.error.message;
            }
          }
          this.requests--;
          if (this.requests === 0) {
            this.showloader = false;
            setTimeout(() => {
              this.authcheck.change_header(false)
            }, 500)
          }
          return throwError(errorMessage);
        },
        () => {
          this.requests--;
          if (this.requests === 0) {
            this.showloader = false;
            setTimeout(() => {
              this.authcheck.change_header(false)
            }, 500)
          }
        }
      )
    );
  }

}
