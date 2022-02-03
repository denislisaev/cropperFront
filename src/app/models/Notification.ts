import {User} from "./User";

export interface Notification {
  id: number;
  usernameTo: string;
  usernameFrom: string;
  username: string;
  title: string;
  message: string;
  hasRead: boolean;
  createDate: string;
}
