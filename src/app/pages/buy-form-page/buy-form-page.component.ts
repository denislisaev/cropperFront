import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from "@angular/forms";
import {Observable, Subscription} from "rxjs";
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import {OfferService} from "../../services/offer.service";
import {SnackBarService} from "../../materials/snackBar.service";
import {Crop} from "../../models/Crop";
import {CropService} from "../../services/crop.service";
import {UserService} from "../../services/user.service";
import {User} from "../../models/User";

@Component({
  selector: 'app-buy-form-page',
  templateUrl: './buy-form-page.component.html',
  styleUrls: ['./buy-form-page.component.css']
})
export class BuyFormPageComponent implements OnInit {

  form!: FormGroup
  aSub!: Subscription
  crops$!: Observable<Crop[]>
  uSub!: Subscription
  user!: User
  selectedCrop!: string

  constructor(private userServie : UserService, private cropService : CropService, private offerService : OfferService, private formBuilder: FormBuilder, private router : Router, private snackBar: MatSnackBar) { }

  ngOnDestroy(): void {
    if (this.aSub){
      this.aSub.unsubscribe()
    }

    if (this.uSub){
      this.uSub.unsubscribe()
    }
  }


  ngOnInit(): void {
    this.uSub = this.userServie.getCurrentUser().subscribe(
      (user)=>{
        this.user = user
      }
    )


    this.crops$ = this.cropService.getCrops()
    this.form = new FormGroup({
      volume: new FormControl(null, [Validators.required]),
      price: new FormControl(null, [Validators.required]),
      info: new FormControl(null, [Validators.required])
    })
  }

  onSubmit() {
    this.form.disable()

    const offer = {
      username: this.user.username,
      volume: this.form.value.volume,
      pricePerTon: this.form.value.price,
      info: this.form.value.info,
      typeOffer: true,
      crop : this.selectedCrop
    }
    this.aSub = this.offerService.createOffer(offer).subscribe(
      ()=>{
        this.router.navigate(['/profile'])
        SnackBarService.showMessage(this.snackBar, "Объявление создано")
      },
      error => {
        if (error?.message){
          SnackBarService.showMessage(this.snackBar, error?.message)
        } else {
          if (error.status){
            SnackBarService.showMessage(this.snackBar, "Ошибка! Код: " + error.status)
          }
        }
        this.form.enable()
      }
    )
  }

}
