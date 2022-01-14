import {User} from "./User";

export interface Notification {
  id: number;
  userTo: User;
  userFrom: User;
  firstname: string;
  title: string;
  message: string;
  hasRead: boolean;
}
