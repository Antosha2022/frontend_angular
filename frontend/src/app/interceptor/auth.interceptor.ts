import {Injectable} from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpResponse, HttpErrorResponse
} from '@angular/common/http';
import {catchError, Observable, tap} from 'rxjs';
import {UserSessionService} from '../service/Session/user-session.service';
import {UserDto} from '../service/Api/DTO/user.dto';
import {Router} from "@angular/router";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private userSessionService: UserSessionService, private router: Router) {
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    // if login process and successful: hook on response and store user details and token to service
    if (request.url.endsWith('/user/login')) {
      return next.handle(request).pipe(
        tap((event: HttpEvent<any>) => {
          if (event instanceof HttpResponse && event.status === 200) {
            this.userSessionService.setUser(new UserDto(event.body.id, event.body.email, event.body.first_name, event.body.last_name))
            this.userSessionService.setUserSessionToken(event.body.auth_token) // TODO: Victor needs to implement the response property "auth_token" before this works
          }
        })
      );
    } else if (this.userSessionService.getUserSessionToken() !== null) {
      // everything else but not login if stored access token: add token to all requests
      // TODO: make sure bearer gets never send to another server than our api server
      request = request.clone({
        setHeaders: {Authorization: `Bearer ${this.userSessionService.getUserSessionToken()}`}
      });
    } // TODO: Else, redirect user to login page if its not a login or register request (auto redirect to login if any action used but not logged in)

    // return request handle
    // return next.handle(request);

    return next.handle(request).pipe(
      // @ts-ignore
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          // unauthorised, so redirect to login
          this.router.navigate(['/login'])
        } else {
          throw error
        }
      })
    );
  }
}
