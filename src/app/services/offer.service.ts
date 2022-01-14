import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

const OFFER_API = 'http://localhost:8080/api/offer/';

@Injectable({
  providedIn: 'root'
})
export class OfferService {

  constructor(private httpclient: HttpClient) { }

  createOffer(offer: any): Observable<any> {
    return this.httpclient.post(OFFER_API + 'create', offer);
  }

  getAllOffers(): Observable<any>{
    return this.httpclient.get(OFFER_API + 'all');
  }

  getAllSellOffers(): Observable<any>{
    return this.httpclient.get(OFFER_API + 'all/sell');
  }

  getAllBuyOffers(): Observable<any>{
    return this.httpclient.get(OFFER_API + 'all/buy');
  }

  getOffersForCurrentUser(): Observable<any>{
    return this.httpclient.get(OFFER_API+'user/offers')
  }

  delete(id: number):Observable<any>{
    return this.httpclient.post(OFFER_API+id+'/delete', null)
  }

}
