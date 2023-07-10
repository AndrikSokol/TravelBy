import { IUser } from "./user.interface";

export interface IToken {
  accessToken: string;
  refreshToken: string;
  user: IUser;
}
