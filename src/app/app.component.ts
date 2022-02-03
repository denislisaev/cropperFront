import { Component } from '@angular/core';
import {TokenStorageService} from "./services/token-storage.service";
import {AuthService} from "./services/auth.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  title = 'Cropper';
  constructor(private tokenStorage : TokenStorageService, private authService : AuthService) {
  }

  ngOnInit(){
    const potentialToken = localStorage.getItem('auth-token')
    if (potentialToken !== null){
      this.tokenStorage.saveToken(potentialToken)
    }
  }
}
