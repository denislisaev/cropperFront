
export interface Offer {
  id: number;
  username:string;
  volume: number;
  pricePerTon: number;
  info?: string;
  crop: string;
  typeOffer: boolean;
  location: string;
  date: string;
}
