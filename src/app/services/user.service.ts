import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {User} from "../models/User";

const USER_API = 'http://localhost:8080/api/user/';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpclient: HttpClient) { }

  getUserById(id: Number): Observable<any> {
    return this.httpclient.get(USER_API + id);
  }

  getCurrentUser(): Observable<User>{
    return this.httpclient.get<User>(USER_API);
  }

  public update(user: any): Observable<any>{
    return this.httpclient.post(USER_API + 'update', {
      email: user.email,
      firstname: user.firstname,
      lastname : user.lastname,
      username: user.username,
      location : user.location,
    });
  }
}
