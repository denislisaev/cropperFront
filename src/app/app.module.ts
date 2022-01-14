import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MaterialModule} from "./material-module";
import {HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {authInterceptorProviders} from "./interceptors/auth-interceptor.service";
import {authErrorInterceptorProviders} from "./interceptors/error-interceptor.service";
import {LoginComponent} from './auth/login/login.component';
import {RegisterComponent} from './auth/register/register.component';
import {AuthLayoutComponent} from './shared/layouts/auth-layout/auth-layout.component';
import {SiteLayoutComponent} from './shared/layouts/site-layout/site-layout.component';
import {MatSnackBar, MatSnackBarModule} from "@angular/material/snack-bar";
import { ProfilePageComponent } from './pages/profile-page/profile-page.component';
import { LoaderComponent } from './materials/loader/loader.component';
import {MatGridListModule} from "@angular/material/grid-list";
import {MatListModule} from "@angular/material/list";
import { MainPageComponent } from './pages/main-page/main-page.component';
import { SellPageComponent } from './pages/sell-page/sell-page.component';
import { BuyPageComponent } from './pages/buy-page/buy-page.component';
import { NotifPageComponent } from './pages/notif-page/notif-page.component';
import { AboutPageComponent } from './pages/about-page/about-page.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    AuthLayoutComponent,
    SiteLayoutComponent,
    ProfilePageComponent,
    LoaderComponent,
    MainPageComponent,
    SellPageComponent,
    BuyPageComponent,
    NotifPageComponent,
    AboutPageComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        MaterialModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        MatSnackBarModule,
        MatGridListModule,
        MatListModule
    ],
  providers: [authInterceptorProviders,
    authErrorInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule {
}
