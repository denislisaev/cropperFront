import {Component, ElementRef, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {TokenStorageService} from "../../../services/token-storage.service";
import {Subscription} from "rxjs";
import {FormControl, Validators} from "@angular/forms";
import {UserService} from "../../../services/user.service";

@Component({
  selector: 'app-site-layout',
  templateUrl: './site-layout.component.html',
  styleUrls: ['./site-layout.component.css']
})
export class SiteLayoutComponent implements OnInit {

  aSub!: Subscription
  isAdmin! : boolean

  links = [
    {url: '/profile', name: "Профиль"},
    {url: '/sell', name: "Продать"},
    {url: '/buy', name: "Купить"},
    {url: '/notif', name: "Уведомления"},
    {url: '/about', name: "О нас"}
  ]

  constructor(private router: Router,
              private tokenStorage: TokenStorageService,
              private elementRef: ElementRef,
              private userService : UserService) {
  }

  ngOnInit(): void {
    this.elementRef.nativeElement.ownerDocument.body.style.backgroundImage = "linear-gradient(to top, #446366, #83ADB0, #446366)"

    this.aSub = this.userService.getRoleUser().subscribe(roles => {
      this.isAdmin = roles.indexOf('ROLE_ADMIN') > -1
    })
  }

  ngOnDestroy(): void {
    if (this.aSub){
      this.aSub.unsubscribe()
    }
  }

  logout(event: Event){
    event.preventDefault()
    this.tokenStorage.logOut()
    this.router.navigate(['/login'])
  }

}
