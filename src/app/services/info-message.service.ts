import { Injectable } from '@angular/core';
import {MatSnackBar} from "@angular/material/snack-bar";

@Injectable({
  providedIn: 'root'
})
export class InfoMessageService {
  constructor(private snackBar: MatSnackBar) { }

  public showSnackBar(message: string): void {
    this.snackBar.open(message, "", {
      duration: 2000
    });
  }
}
