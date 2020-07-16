/**
 * Learning Reference about HTTP Interceptor - 
 * https://blog.angulartraining.com/http-interceptors-in-angular-61dcf80b6bdd
 * https://github.com/ngx-translate/core/issues/1050
 */
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './user-login/auth.service';

@Injectable({
  providedIn: 'root'
})

export class TokenInterceptorService implements HttpInterceptor{

  constructor(private authService:AuthService) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.authService.userToken;
    let authReq = req.clone();
    if(token!=null){
      const authString:string= `Bearer ${token.token}`;
      const headers = authReq.headers.set('Authorization',authString);
      authReq = req.clone({headers});
    }
    return next.handle(authReq);
  }
}
