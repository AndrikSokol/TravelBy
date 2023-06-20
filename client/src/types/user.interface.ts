export interface IUser {
  username: string;
  password: string;

  email: string;
}

export interface IUserContext {
  user: IUser | null;
  setUser: React.Dispatch<React.SetStateAction<IUser | null>>;
  ready: boolean;
}

export interface IUserData extends IUser {
  _id: string;
}
