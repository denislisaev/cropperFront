import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {TokenStorageService} from "../../../services/token-storage.service";

@Component({
  selector: 'app-site-layout',
  templateUrl: './site-layout.component.html',
  styleUrls: ['./site-layout.component.css']
})
export class SiteLayoutComponent implements OnInit {

  links = [
    {url: '/profile', name: "Профиль"},
    {url: '/sell', name: "Продать"},
    {url: '/buy', name: "Купить"},
    {url: '/notif', name: "Уведомления"},
    {url: '/about', name: "О нас"}
  ]

  constructor(private router: Router,
              private tokenStorage: TokenStorageService) {
  }

  ngOnInit(): void {
  }

  logout(event: Event){
    event.preventDefault()
    this.tokenStorage.logOut()
    this.router.navigate(['/login'])
  }

}
