import {Component,OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import {Subscription} from "rxjs";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import {SnackBarService} from "../../materials/snackBar.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  form!: FormGroup
  aSub!: Subscription

  constructor(private auth: AuthService,
              private router: Router,
              private route: ActivatedRoute,
              private snackBar: MatSnackBar
  ) {
  }

  ngOnDestroy(): void {
    if (this.aSub) {
      this.aSub.unsubscribe()
    }
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(6)])
    })

    this.route.queryParams.subscribe((params: Params) => {
      if (params['registered']){
        SnackBarService.showMessage(this.snackBar, "Теперь можно зайти в систему используя свои данные")
      } else if (params['accessDenied']){
        SnackBarService.showMessage(this.snackBar, "Для начала авторизуйтесь в системе")
      } else if (params['sessionFailed']){
        SnackBarService.showMessage(this.snackBar, "Пожалуйста, заного войдите в систему")
      }
    })
  }

  onSubmit(){
    this.form.disable()
    const user = {
      username: this.form.value.email,
      password: this.form.value.password
    }

    this.aSub = this.auth.login(user).subscribe(
      ()=> {this.router.navigate(['/profile'])
        SnackBarService.showMessage(this.snackBar, "Вы успешно авторизовались!")},
      error => {
        SnackBarService.showMessage(this.snackBar, error.message)
        this.form.enable()
      }
    )
  }

}
