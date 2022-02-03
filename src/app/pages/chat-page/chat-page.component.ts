import { Component, OnInit } from '@angular/core';
import {Observable, Subscription} from "rxjs";
import {Notification} from "../../models/Notification";
import {NotificationService} from "../../services/notification.service";
import {ActivatedRoute} from "@angular/router";
import {PageEvent} from "@angular/material/paginator";

@Component({
  selector: 'app-chat-page',
  templateUrl: './chat-page.component.html',
  styleUrls: ['./chat-page.component.css']
})
export class ChatPageComponent implements OnInit {
  nSub!: Subscription
  notifs! : Notification[]
  notifsOnPage! : Notification[]
  username!: string

  pageIndexNotif!:number;
  pageSizeNotif!:number;
  lengthNotif!:number;

  constructor(private notificationService : NotificationService, private activateRoute : ActivatedRoute) {
    this.username = activateRoute.snapshot.params['username'];
  }

  ngOnInit(): void {
    this.nSub = this.notificationService.getNotificationsForCurrentUserToUser(this.activateRoute.snapshot.params['username']).subscribe(
      (notifs)=>{
        this.notifs = notifs
        this.lengthNotif = notifs.length
        this.pageSizeNotif = 10
        this.pageIndexNotif = 0
        if (this.notifs.length > this.pageIndexNotif*this.pageSizeNotif){
          if (this.notifs.length >= this.pageIndexNotif*this.pageSizeNotif + this.pageSizeNotif){
            this.notifsOnPage = this.notifs.slice(this.pageIndexNotif*this.pageSizeNotif, this.pageIndexNotif*this.pageSizeNotif + this.pageSizeNotif);
          } else {
            this.notifsOnPage = this.notifs.slice(this.pageIndexNotif*this.pageSizeNotif, this.notifs.length);
          }
        }
      }
    )
  }

  onPaginateChangeNotif(event: PageEvent) {
    this.pageSizeNotif = event.pageSize
    this.pageIndexNotif = event.pageIndex
    if (this.notifs.length > this.pageIndexNotif*this.pageSizeNotif){
      if (this.notifs.length >= this.pageIndexNotif*this.pageSizeNotif + this.pageSizeNotif){
        this.notifsOnPage = this.notifs.slice(this.pageIndexNotif*this.pageSizeNotif, this.pageIndexNotif*this.pageSizeNotif + this.pageSizeNotif);
      } else {
        this.notifsOnPage = this.notifs.slice(this.pageIndexNotif*this.pageSizeNotif, this.notifs.length);
      }
    }
  }
}
