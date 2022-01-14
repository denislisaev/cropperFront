import { Component, OnInit } from '@angular/core';
import {UserService} from "../../services/user.service";
import {User} from "../../models/User";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Subscription} from "rxjs";
import {SnackBarService} from "../../materials/snackBar.service";
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css']
})
export class ProfilePageComponent implements OnInit {

  loading = false
  user!: User
  form!: FormGroup
  aSub!: Subscription

  constructor(public userService : UserService, private auth: AuthService, private formBuilder: FormBuilder, private router : Router, private snackBar: MatSnackBar) {

  }

  ngOnInit(): void {
    this.loading = true
    this.userService.getCurrentUser().subscribe(user => {
      this.loading = false
      this.user = user

      this.form = this.formBuilder.group({
          firstname: new FormControl(user.firstname, [Validators.required]),
          lastname: new FormControl(user.lastname, [Validators.required]),
          location: new FormControl(user.location, [Validators.required])
        })
    })
  }

  onSubmit() {
    this.form.disable()
    const user = {
      username: this.user.username,
      email: this.user.email,
      firstname: this.form.value.firstname,
      lastname: this.form.value.lastname,
      location: this.form.value.location,
    }
    this.aSub = this.userService.update(user).subscribe(
      ()=>{
        this.router.navigate(['/profile'])
      },
      error => {
        SnackBarService.showMessage(this.snackBar, error.message)
        this.form.enable()
      }
    )
  }
}
