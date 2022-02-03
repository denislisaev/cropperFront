import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Notification} from "../models/Notification";

const NOTIF_API = 'http://localhost:8080/api/notification/';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private httpclient: HttpClient) { }

  createNotification(notification: any) :Observable<any> {
    return this.httpclient.post(NOTIF_API + 'create', notification);
  }

  getNotificationsForCurrentUser(): Observable<Notification[]>{
    return this.httpclient.get<Notification[]>(NOTIF_API+'user/notifications')
  }

  getNotificationsForCurrentUserToUser(username : String): Observable<Notification[]>{
    return this.httpclient.get<Notification[]>(NOTIF_API+'notifications/'+username)
  }

  getPresentNotificationsForCurrentUser(): Observable<Notification[]>{
    return this.httpclient.get<Notification[]>(NOTIF_API+'user/notifications/present')
  }

  delete(id: number):Observable<any>{
    return this.httpclient.post(NOTIF_API+id+'/delete', null)
  }
}
