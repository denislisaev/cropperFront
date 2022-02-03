import { Component, OnInit } from '@angular/core';
import {Subscription} from "rxjs";
import {NotificationService} from "../../services/notification.service";
import {Notification} from "../../models/Notification";

@Component({
  selector: 'app-notif-page',
  templateUrl: './notif-page.component.html',
  styleUrls: ['./notif-page.component.css']
})
export class NotifPageComponent implements OnInit {
  notifs! : Notification[]
  nSub!:Subscription
  filter: string | null
  notifData! : Notification[]

  constructor(private notificationService : NotificationService) {
    this.filter = null
  }

  ngOnInit(): void {
    this.nSub = this.notificationService.getPresentNotificationsForCurrentUser().subscribe(
      (notifs)=>{
        this.notifs = notifs
        this.notifData = notifs
      }
    )
  }

  onSearchChange(event: Event): void {
    let ev = <InputEvent>event
    if (ev.data){
      if (this.filter){
        this.filter = this.filter + ev.data
      } else {
        this.filter = ev.data
      }
      this.notifData = []
      for (let notif of this.notifs){
        if (notif.username.toLowerCase().indexOf(this.filter.toLowerCase()) > -1){
          this.notifData.push(notif)
        }
      }
    } else {
      this.notifData = this.notifs
      this.filter = null
    }
  }
}
