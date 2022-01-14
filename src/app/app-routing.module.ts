import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./auth/login/login.component";
import {RegisterComponent} from "./auth/register/register.component";
import {AuthLayoutComponent} from "./shared/layouts/auth-layout/auth-layout.component";
import {SiteLayoutComponent} from "./shared/layouts/site-layout/site-layout.component";
import {AuthGuard} from "./guards/auth.guard";
import {ProfilePageComponent} from "./pages/profile-page/profile-page.component";
import {MainPageComponent} from "./pages/main-page/main-page.component";
import {BuyPageComponent} from "./pages/buy-page/buy-page.component";
import {SellPageComponent} from "./pages/sell-page/sell-page.component";
import {AboutPageComponent} from "./pages/about-page/about-page.component";
import {NotifPageComponent} from "./pages/notif-page/notif-page.component";

const routes: Routes = [
  {path: '', component: AuthLayoutComponent, children: [
      {path: '', redirectTo: '/main', pathMatch: 'full'},
      {path: 'login', component: LoginComponent},
      {path: 'register', component: RegisterComponent},
      {path: 'main', component: MainPageComponent}
    ]},
  {path: '', component: SiteLayoutComponent, canActivate: [AuthGuard], children: [
      {path: 'profile', component: ProfilePageComponent},
      {path: 'buy', component: BuyPageComponent},
      {path: 'sell', component: SellPageComponent},
      {path: 'about', component: AboutPageComponent},
      {path: 'notif', component: NotifPageComponent}
    ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
