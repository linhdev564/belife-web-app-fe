import { Injectable } from '@angular/core';
import {
  HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Injectable()
export class ApiHttpInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService, private router: Router) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Bỏ qua request đến assets hoặc file tĩnh
    if (req.url.includes('/assets/')) {
      return next.handle(req);
    }

    let sessionId = this.authService.getSessionInfo()?.sessionId;

    let authReq = req;
    //tạo headers
    let headers: any = {
      "AppKey": environment.appKey,
      "AppName": environment.appName
    };
    // Thêm sessionId nếu có
    if (sessionId) {
      headers["SessionId"] = sessionId;
    }

    authReq = req.clone({
      setHeaders: headers
    });

    console.log('Request:', authReq);

    return next.handle(authReq).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('API Error:', error);

        if (error.status === 401) {
          // Có thể redirect tới login
          console.warn('Unauthorized - Redirecting to login...');
          this.authService.clearSession();
          this.router.navigate(['/login']);
        }

        return throwError(() => error);
      }),
      finalize(() => {
        // Có thể tắt loading indicator ở đây
      })
    );
  }
}
