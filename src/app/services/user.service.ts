import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {User} from "../models/User";

const USER_API = 'https://cropper-nc.herokuapp.com/api/user/';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpclient: HttpClient) { }

  deleteUserByUsername(username : String):Observable<any> {
    return this.httpclient.delete(USER_API + username + "/delete");
  }

  getUserById(id: Number): Observable<User> {
    return this.httpclient.get<User>(USER_API + id);
  }

  getUsers(): Observable<User[]> {
    return this.httpclient.get<User[]>(USER_API + "users");
  }

  getUserByUsername(username: string): Observable<User> {
    return this.httpclient.get<User>(USER_API + "username/" + username);
  }

  getCurrentUser(): Observable<User>{
    return this.httpclient.get<User>(USER_API);
  }

  getRoleUser(): Observable<String[]>{
    return this.httpclient.get<String[]>(USER_API + 'role');
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
