import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";

const CROP_API = 'http://localhost:8080/api/crop/';

@Injectable({
  providedIn: 'root'
})
export class CropService {

  constructor(private httpclient: HttpClient) { }

  createCrop(crop: any) :Observable<any> {
    return this.httpclient.post(CROP_API + 'create', crop);
  }

  getCropsForCurrentUser(): Observable<any>{
    return this.httpclient.get(CROP_API +'user/crops')
  }

  delete(id: number):Observable<any>{
    return this.httpclient.post(CROP_API + id +'/delete', null)
  }
}
