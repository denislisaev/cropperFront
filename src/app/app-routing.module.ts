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
import {BuyFormPageComponent} from "./pages/buy-form-page/buy-form-page.component";
import {SellFormPageComponent} from "./pages/sell-form-page/sell-form-page.component";
import {NotifFormPageComponent} from "./pages/notif-form-page/notif-form-page.component";
import {AdminPageComponent} from "./pages/admin-page/admin-page.component";
import {NotFoundPageComponent} from "./pages/not-found-page/not-found-page.component";
import {ChatPageComponent} from "./pages/chat-page/chat-page.component";

const routes: Routes = [
  {path: '', component: AuthLayoutComponent, children: [
      {path: '', redirectTo: '/main', pathMatch: 'full'},
      {path: 'login', component: LoginComponent},
      {path: 'register', component: RegisterComponent},
      {path: 'main', component: MainPageComponent}
    ]},
  {path: '', component: SiteLayoutComponent, canActivate: [AuthGuard], children: [
      {path: 'admin', component: AdminPageComponent},
      {path: 'profile', component: ProfilePageComponent},
      {path: 'buy', component: BuyPageComponent},
      {path: 'sell', component: SellPageComponent},
      {path: 'about', component: AboutPageComponent},
      {path: 'buy/new', component: BuyFormPageComponent},
      {path: 'sell/new', component: SellFormPageComponent},
      {path: 'notif', component: NotifPageComponent},
      {path: 'notif/new', component: NotifFormPageComponent},
      {path: 'notif/new/:username', component: NotifFormPageComponent},
      {path: 'notif/chat/:username', component: ChatPageComponent}
    ]},
  {path: '', component: SiteLayoutComponent, canActivate: [AuthGuard],children: [
      {path: '**', component: NotFoundPageComponent}
    ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
