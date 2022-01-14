import {Offer} from "./Offer";
import {Notification} from "./Notification";

export interface User {
  id: number;
  username: string;
  email: string;
  firstname: string;
  lastname: string;
  location: string;
  offers?: Offer[];
  notifications?: Notification[];
}
