import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {Crop} from "../models/Crop";

const CROP_API = 'https://cropper-nc.herokuapp.com/api/crop';

@Injectable({
  providedIn: 'root'
})
export class CropService {

  constructor(private httpclient: HttpClient) { }

  createCrop(crop: any) :Observable<any> {
    return this.httpclient.post(CROP_API + '/create', crop);
  }

  getCrops(): Observable<any>{
    return this.httpclient.get<Crop[]>(CROP_API +'/crops')
  }

  delete(id: number):Observable<any>{
    return this.httpclient.delete(CROP_API + "/" + id +'/delete')
  }
}
