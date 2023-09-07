export interface IUser {
  id: string;
  username: string;
  email: string;
}

export interface IUserContext {
  user: IUser | null;
  setUser: React.Dispatch<React.SetStateAction<IUser | null>>;
  ready: boolean;
}

export interface IUserData {
  user: IUser;
  accessToken: string;
  refreshToken: string;
}

export interface IGoogleUser {
  googleId: string;
  username: string;
  email: string;
}

export interface IGoogleUserData {
  googleUser: IGoogleUser;
  accessToken: string;
  refreshToken: string;
}
