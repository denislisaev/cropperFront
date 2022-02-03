import { Component, OnInit } from '@angular/core';
import {OfferService} from "../../services/offer.service";
import {Offer} from "../../models/Offer";
import {Observable, Subscription} from "rxjs";
import {UserService} from "../../services/user.service";
import {Sort} from "@angular/material/sort";
import {PageEvent} from "@angular/material/paginator";
import {SnackBarService} from "../../materials/snackBar.service";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-buy-page',
  templateUrl: './buy-page.component.html',
  styleUrls: ['./buy-page.component.css']
})
export class BuyPageComponent implements OnInit {
  sortedData!: Offer[];
  offers$! : Observable<Offer[]>
  offers! : Offer[];
  oSub!: Subscription

  pageIndex!:number;
  pageSize!:number;
  length!:number;

  aSub!: Subscription
  isAdmin! : boolean

  constructor(private offerService : OfferService, private userService : UserService, private snackBar: MatSnackBar) { }

  ngOnDestroy(): void {
    if (this.oSub) {
      this.oSub.unsubscribe()
    }
  }

  ngOnInit(): void {
    this.aSub = this.userService.getRoleUser().subscribe(roles => {
      this.isAdmin = roles.indexOf('ROLE_ADMIN') > -1
    })
    this.pageIndex = 0
    this.pageSize = 10
    this.offers$ = this.offerService.getAllSellOffers()
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
  }

  deleteOffer(id: number) {
    this.offerService.delete(id).subscribe(()=>{
      this.offers$ = this.offerService.getAllBuyOffers()
      this.oSub.unsubscribe()
      this.oSub = this.offers$.subscribe((offers) => {
        this.offers = offers
        this.length = offers.length
        if (this.offers.length > 0){
          if (this.offers.length >= this.pageSize){
            this.sortedData = this.offers.slice(this.pageIndex*this.pageSize, this.pageIndex*this.pageSize + this.pageSize);
          } else {
            this.sortedData = this.offers.slice(this.pageIndex*this.pageSize, this.length);
          }
        }
        SnackBarService.showMessage(this.snackBar, "Объявдение удалено!")
      }, error => {
        SnackBarService.showMessage(this.snackBar, error?.message)
        for (let key in error) {
          SnackBarService.showMessage(this.snackBar, error[key])
        }
      })
    })
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
        case 'user':
          return compare(a.username, b.username, isAsc);
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
