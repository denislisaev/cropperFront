import {MatSnackBar} from "@angular/material/snack-bar";
import {Injectable} from "@angular/core";

export class SnackBarService {
  static showMessage(snackBar: MatSnackBar, message : string){
    snackBar.open(message, "Закрыть", {
      horizontalPosition: 'end',
      verticalPosition: 'top',
      panelClass: ['gray-snackbar'],
      duration: 5000
    })
  }
}
