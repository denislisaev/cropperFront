import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

const NOTIF_API = 'http://localhost:8080/api/notification/';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private httpclient: HttpClient) { }

  createNotification(notification: any) :Observable<any> {
    return this.httpclient.post(NOTIF_API + 'create', notification);
  }

  getNotificationsForCurrentUser(): Observable<any>{
    return this.httpclient.get(NOTIF_API+'user/notifications')
  }

  delete(id: number):Observable<any>{
    return this.httpclient.post(NOTIF_API+id+'/delete', null)
  }
}
