export interface User {
  _id?: string;
  firstName: string;
  lastName: string;
  userName: string;
  password: string;
  userSince: Date;
  isAdmin: boolean;
}
