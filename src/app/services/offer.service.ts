import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Offer} from "../models/Offer";
import {OfferList} from "../models/OfferList";

const OFFER_API = 'https://cropper-nc.herokuapp.com/api/offer/';

@Injectable({
  providedIn: 'root'
})
export class OfferService {

  constructor(private httpclient: HttpClient) { }

  createOffer(offer: any): Observable<any> {
    return this.httpclient.post(OFFER_API + 'create', offer);
  }

  getAllOffers(): Observable<Offer[]>{
    return this.httpclient.get<Offer[]>(OFFER_API + 'all');
  }

  getAllSellOffers(): Observable<Offer[]>{
    return this.httpclient.get<Offer[]>(OFFER_API + 'all/sell');
  }

  getAllBuyOffers(): Observable<Offer[]>{
    return this.httpclient.get<Offer[]>(OFFER_API + 'all/buy');
  }

  getAllBuyOffersOnPage(page : number, offersOnPage : number): Observable<OfferList>{
    return this.httpclient.get<OfferList>(OFFER_API + 'all/buy/' + page + "/" + offersOnPage);
  }

  getOffersForCurrentUser(): Observable<Offer[]>{
    return this.httpclient.get<Offer[]>(OFFER_API+'user/offers')
  }

  delete(id: number):Observable<any>{
    return this.httpclient.post(OFFER_API+id+'/delete', null)
  }

  updateOffer(offer: any):Observable<any>{
    return this.httpclient.post(OFFER_API + offer.id + '/update', offer);
  }

}
