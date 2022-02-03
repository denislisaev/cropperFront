import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Observable, Subscription} from "rxjs";
import {Crop} from "../../models/Crop";
import {User} from "../../models/User";
import {UserService} from "../../services/user.service";
import {CropService} from "../../services/crop.service";
import {OfferService} from "../../services/offer.service";
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import {SnackBarService} from "../../materials/snackBar.service";

@Component({
  selector: 'app-sell-form-page',
  templateUrl: './sell-form-page.component.html',
  styleUrls: ['./sell-form-page.component.css']
})
export class SellFormPageComponent implements OnInit {

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
      typeOffer: false,
      crop : this.selectedCrop
    }
    this.aSub = this.offerService.createOffer(offer).subscribe(
      ()=>{
        this.router.navigate(['/profile'])
        SnackBarService.showMessage(this.snackBar, "Объявление создано")
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
