import { FC, createContext, useEffect, useState } from "react";
import React from "react";
import { api, instance } from "../services/api";
import { IUser, IUserContext } from "../types/user.interface";

export const UserContext = createContext<IUserContext>({} as IUserContext);

type UserContextProviderProps = {
  children: React.ReactNode;
};

export const UserContextProvider: FC<UserContextProviderProps> = ({
  children,
}) => {
  const [user, setUser] = useState<IUser | null>(null);

  const [ready, setReady] = useState<boolean>(false);

  useEffect(() => {
    async function fetchUser() {
      // if (user === null) {
      //   const userDoc = await api.getProfile();
      //   console.log("uuuser " + userDoc);
      //   setUser(userDoc);
      //   setReady(true);
      // }
    }
    fetchUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, ready }}>
      {children}
    </UserContext.Provider>
  );
};
