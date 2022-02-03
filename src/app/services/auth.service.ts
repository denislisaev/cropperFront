import {Injectable, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable, Subscription, tap} from "rxjs";
import {TokenStorageService} from "./token-storage.service";
import {Offer} from "../models/Offer";

const AUTH_API = 'http://localhost:8080/api/auth';
const USER_API = 'http://localhost:8080/api/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService{
  roles! : string[]
  rSub! : Subscription

  constructor(private httpclient: HttpClient, private tokenStorageService:TokenStorageService) { }

  public login(user: any): Observable<{ token: string }> {
    return this.httpclient.post<{ token: string }>(AUTH_API + '/signin', {
      username: user.username,
      password: user.password
    }).pipe(
      tap(
        ({token})=> {
          this.tokenStorageService.saveToken(token)
        }
      )
    )
  }

  public register(user: any): Observable<any>{
    return this.httpclient.post(AUTH_API + '/signup', {
      email: user.email,
      firstname: user.firstname,
      lastname : user.lastname,
      username: user.username,
      location : user.location,
      password : user.password,
      confirmPassword : user.confirmPassword
    });
  }

  ngOnDestroy(): void {
    if (this.rSub) {
      this.rSub.unsubscribe()
    }
  }

  public isAuthenticated(): boolean{
    return this.tokenStorageService.getToken() != null;
  }

}
