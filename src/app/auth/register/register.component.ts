import {Component, OnDestroy, OnInit} from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidatorFn,
  Validators
} from "@angular/forms";
import {Router} from "@angular/router";
import {AuthService} from "../../services/auth.service";
import {Subscription} from "rxjs";
import {MatSnackBar} from "@angular/material/snack-bar";
import {SnackBarService} from "../../materials/snackBar.service";


export default class Validation {
  static match(controlName: string, checkControlName: string): ValidatorFn {
    return (controls: AbstractControl) => {
      const control = controls.get(controlName);
      const checkControl = controls.get(checkControlName);

      if (checkControl?.errors && !checkControl.errors['matching']) {
        return null;
      }

      if (control?.value !== checkControl?.value) {
        controls.get(checkControlName)?.setErrors({ matching: true });
        return { matching: true };
      } else {
        return null;
      }
    };
  }
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit, OnDestroy {

  form!: FormGroup
  aSub!: Subscription

  constructor(private auth: AuthService, private formBuilder: FormBuilder, private router : Router, private snackBar: MatSnackBar) {
  }

  ngOnDestroy(): void {
        if (this.aSub){
          this.aSub.unsubscribe()
        }
    }

  ngOnInit(): void {
    if (this.auth.isAuthenticated()){
      this.router.navigate(['/profile'])
    }

    this.form = this.formBuilder.group({
      username: new FormControl(null, [Validators.required, Validators.minLength(5)]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      firstname: new FormControl(null, [Validators.required]),
      lastname: new FormControl(null, [Validators.required]),
      location: new FormControl(null, [Validators.required]),
      password: new FormControl(null,[Validators.required]),
      confirmPassword: new FormControl(null,[Validators.required])
    },
      {
        validators: [Validation.match('password', 'confirmPassword')]
      })
  }

  onSubmit() {
    this.form.disable()
    const user = {
      username: this.form.value.username,
      email: this.form.value.email,
      firstname: this.form.value.firstname,
      lastname: this.form.value.lastname,
      location: this.form.value.location,
      password: this.form.value.password,
      confirmPassword: this.form.value.confirmPassword
    }
    this.aSub = this.auth.register(user).subscribe(
      ()=>{
        this.router.navigate(['/login'], {
          queryParams:{
            registered: true
          }
        })
      },
      error => {
        console.log(Object.keys(error))
        console.log(error.status)
        console.log(error.error)
        SnackBarService.showMessage(this.snackBar, error?.message??'' + " " + error?.error??'')
        this.form.enable()
      }
    )
  }
}
