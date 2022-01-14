import {Crop} from "./Crop";

export interface Offer {
  id?: number;
  volume: number;
  pricePerTon: number;
  info?: string;
  crop: Crop;
  typeOffer: boolean;
}
