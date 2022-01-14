import {Injectable} from "@angular/core";
import {AuthService} from "../services/auth.service";
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {catchError, Observable, throwError} from "rxjs";
import {TokenStorageService} from "../services/token-storage.service";
import {Router} from "@angular/router";

@Injectable()
export class TokenInterceptor implements HttpInterceptor{
  constructor(private auth: AuthService, private tokenStorage : TokenStorageService, private router: Router) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.auth.isAuthenticated()){
      req = req.clone({
        setHeaders: {
          Authorization: this.tokenStorage!.getToken()!
        }
      })
    }

    return next.handle(req).pipe(
      catchError(
        (error: HttpErrorResponse) => this.handleAuthError(error)
      )
    )
  }

  private handleAuthError(error: HttpErrorResponse): Observable<any>{
    if (error.status === 401){
      this.router.navigate(['/login'], {
        queryParams: {
          sessionFailed: true
        }
      })
    }

    return throwError(error)
  }
}
