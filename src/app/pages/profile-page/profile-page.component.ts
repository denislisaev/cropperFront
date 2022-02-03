import { Component, OnInit } from '@angular/core';
import {UserService} from "../../services/user.service";
import {User} from "../../models/User";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Observable, Subscription} from "rxjs";
import {SnackBarService} from "../../materials/snackBar.service";
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Offer} from "../../models/Offer";
import {OfferService} from "../../services/offer.service";
import {Sort} from "@angular/material/sort";
import {HttpClient} from "@angular/common/http";
import {Crop} from "../../models/Crop";
import {CropService} from "../../services/crop.service";
import {PageEvent} from "@angular/material/paginator";

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
  uSub!: Subscription
  eSub!: Subscription
  offers$!: Observable<Offer[]>
  offers! : Offer[];
  sortedData!: Offer[];
  oSub!: Subscription;
  dSub!: Subscription;
  offerForm!: FormGroup
  crops$!: Observable<Crop[]>
  selectedCrop!: string
  editingOffer?: Offer

  pageIndex!:number;
  pageSize!:number;
  length!:number;

  constructor(private cropService : CropService, private offerService: OfferService, public userService : UserService, private auth: AuthService, private formBuilder: FormBuilder, private router : Router, private snackBar: MatSnackBar) {

  }

  ngOnDestroy(): void {
    if (this.aSub){
      this.aSub.unsubscribe()
    }

    if (this.uSub){
      this.uSub.unsubscribe()
    }

    if (this.oSub) {
      this.oSub.unsubscribe()
    }

    if (this.dSub){
      this.dSub.unsubscribe()
    }

    if (this.eSub){
      this.eSub.unsubscribe()
    }
  }

  ngOnInit(): void {
    this.pageIndex = 0
    this.pageSize = 10
    this.loading = true
    this.crops$ = this.cropService.getCrops()
    this.offers$ = this.offerService.getOffersForCurrentUser()
    this.oSub = this.offers$.subscribe((offers) => {
      this.offers = offers;
      this.length = offers.length;
      if (offers.length > this.pageIndex*this.pageSize){
        if (offers.length >= this.pageIndex*this.pageSize + this.pageSize){
          this.sortedData = offers.slice(this.pageIndex*this.pageSize, this.pageIndex*this.pageSize + this.pageSize);
        } else {
          this.sortedData = offers.slice(this.pageIndex*this.pageSize, offers.length);
        }
      }
    })
    this.uSub = this.userService.getCurrentUser().subscribe(user => {
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
    const user = {
      username: this.user.username,
      email: this.user.email,
      firstname: this.form.value.firstname,
      lastname: this.form.value.lastname,
      location: this.form.value.location,
    }
    this.aSub = this.userService.update(user).subscribe(
      ()=>{
        SnackBarService.showMessage(this.snackBar, "Данные успешно сохранены")
      },
      error => {
        SnackBarService.showMessage(this.snackBar, error.message)
      }
    )
  }

  sortData(sort: Sort){
      const data = this.offers.slice();
      if (!sort.active || sort.direction === '') {
        this.sortedData = data;
        return;
      }

      this.offers = data.sort((a, b) => {
        const isAsc = sort.direction === 'asc';
        switch (sort.active) {
          case 'crop':
            return compare(a.crop, b.crop, isAsc);
          case 'price':
            return compare(a.pricePerTon, b.pricePerTon, isAsc);
          case 'volume':
            return compare(a.volume, b.volume, isAsc);
          case 'location':
            return compare(a.location, b.location, isAsc);
          case 'date':
            return compare(a.location, b.location, isAsc);
          default:
            return 0;
        }
      })

    if (this.offers.length > this.pageIndex*this.pageSize){
      if (this.offers.length >= this.pageIndex*this.pageSize + this.pageSize){
        this.sortedData = this.offers.slice(this.pageIndex*this.pageSize, this.pageIndex*this.pageSize + this.pageSize);
      } else {
        this.sortedData = this.offers.slice(this.pageIndex*this.pageSize, this.offers.length);
      }
    }
  }

  editOffer(offer : Offer){
    this.selectedCrop = offer.crop
    this.crops$ = this.cropService.getCrops()
    this.offerForm = new FormGroup({
      volume: new FormControl(offer.volume, [Validators.required]),
      price: new FormControl(offer.pricePerTon, [Validators.required]),
      info: new FormControl(offer.info, [Validators.required]),
    })
  }

  updateEditOffer(){
    const offer = {
      id: this.editingOffer?.id,
      username: this.user.username,
      volume: this.offerForm.value.volume,
      pricePerTon: this.offerForm.value.price,
      info: this.offerForm.value.info,
      typeOffer: this.editingOffer?.typeOffer,
      crop : this.selectedCrop
    }
    this.eSub = this.offerService.updateOffer(offer).subscribe(
      ()=>{
        this.ngOnInit()
        SnackBarService.showMessage(this.snackBar, "Отредактировано")
      },
      error => {
        SnackBarService.showMessage(this.snackBar, error?.message)
        for (let key in error) {
          SnackBarService.showMessage(this.snackBar, error[key])
        }
      }
    )

    this.editingOffer = undefined
  }

  deleteOffer(id: number){
    this.dSub = this.offerService.delete(id).subscribe(()=>{
        this.offers$ = this.offerService.getOffersForCurrentUser()
        SnackBarService.showMessage(this.snackBar, "Объявление удалено")},
      error => {
        SnackBarService.showMessage(this.snackBar, error.message)
    })
  }

  onPaginateChange(event: PageEvent) {
    this.pageSize = event.pageSize
    this.pageIndex = event.pageIndex
    if (this.offers.length > this.pageIndex*this.pageSize){
      if (this.offers.length >= this.pageIndex*this.pageSize + this.pageSize){
        this.sortedData = this.offers.slice(this.pageIndex*this.pageSize, this.pageIndex*this.pageSize + this.pageSize);
      } else {
        this.sortedData = this.offers.slice(this.pageIndex*this.pageSize, this.offers.length);
      }
    }
  }
}
function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
