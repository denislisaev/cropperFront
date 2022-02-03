import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Observable, Subscription} from "rxjs";
import {Crop} from "../../models/Crop";
import {User} from "../../models/User";
import {UserService} from "../../services/user.service";
import {CropService} from "../../services/crop.service";
import {OfferService} from "../../services/offer.service";
import {ActivatedRoute, Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import {SnackBarService} from "../../materials/snackBar.service";
import {NotificationService} from "../../services/notification.service";

@Component({
  selector: 'app-notif-form-page',
  templateUrl: './notif-form-page.component.html',
  styleUrls: ['./notif-form-page.component.css']
})
export class NotifFormPageComponent implements OnInit {
  form!: FormGroup
  aSub!: Subscription
  username : string
  isUsername : boolean

  constructor(private userServie : UserService,
              private notifServise : NotificationService,
              private formBuilder: FormBuilder,
              private router : Router,
              private snackBar: MatSnackBar,
              private activateRoute : ActivatedRoute) {
    this.username = activateRoute.snapshot.params['username'];
    this.isUsername = true;
  }

  ngOnDestroy(): void {
    if (this.aSub){
      this.aSub.unsubscribe()
    }
  }

  ngOnInit(): void {
    if (this.username) {
      this.isUsername = false
    }

    if (this.isUsername) {
      this.form = new FormGroup({
        usernameTo: new FormControl(null, [Validators.required]),
        title: new FormControl(null, [Validators.required]),
        message: new FormControl(null, [Validators.required])
      })
    } else {
      this.form = new FormGroup({
        title: new FormControl(null, [Validators.required]),
        message: new FormControl(null, [Validators.required])
      })
    }
  }

  onSubmit() {
    this.form.disable()

    let notif = null

    if (this.isUsername) {
      notif = {
        usernameTo: this.form.value.usernameTo,
        title: this.form.value.title,
        message: this.form.value.message
      }
    } else {
      notif = {
        usernameTo: this.username,
        title: this.form.value.title,
        message: this.form.value.message
      }
    }
    this.aSub = this.notifServise.createNotification(notif).subscribe(
      ()=>{
        this.router.navigate(['/notif'])
        SnackBarService.showMessage(this.snackBar, "Сообщение отправлено")
      },
      error => {
        SnackBarService.showMessage(this.snackBar, error?.message)
        for (let key in error) {
          SnackBarService.showMessage(this.snackBar, error[key])
        }
        this.form.enable()
      }
    )
  }

}
