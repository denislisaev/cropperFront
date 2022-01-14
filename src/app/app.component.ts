import { Component } from '@angular/core';
import {TokenStorageService} from "./services/token-storage.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  title = 'Cropper';
  constructor(private tokenStorage : TokenStorageService) {
  }

  ngOnInit(){
    const potentialToken = localStorage.getItem('auth-token')
    if (potentialToken !== null){
      this.tokenStorage.saveToken(potentialToken)
    }
  }
}
