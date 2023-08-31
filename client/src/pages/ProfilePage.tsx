import React from "react";
import { UserContext } from "../context/UserContext";
import { Navigate } from "react-router-dom";
import style from "../assets/css/profilePage.module.scss";
import axios from "axios";
import AccountNav from "../components/AccountNav";
import { api } from "../services/api";
import { IUser, IUserContext } from "../types/user.interface";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { deletePlacesForUser } from "../slices/placesSlice";
import { deleteUser } from "../slices/userSlice";

const ProfilePage = () => {
  const [redirect, setRedirect] = React.useState<string | null>(null);
  const dispatch = useAppDispatch();
  const { setAuth, user } = useAppSelector((state) => state.user);

  async function logout() {
    try {
      await api.logout();
      localStorage.removeItem("token");
      setRedirect("/");
      dispatch(deleteUser());
      dispatch(deletePlacesForUser());
    } catch (e) {}
  }

  if (redirect === "/") {
    return <Navigate to="/" />;
  }

  if (!setAuth && !user) {
    return (
      <div className={style.loading}>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>
    );
  }

  if (!user && setAuth && !redirect) {
    return <Navigate to="/login" />;
  }

  return (
    <div>
      <AccountNav />
      <div className="text-center max-w-lg mx-auto">
        {user !== null && (
          <div>
            Зашёл под пользователем: {user.username} ({user.email})
          </div>
        )}

        <button
          onClick={logout}
          className="bg-primary w-full max-w-sm py-2 px-6 mt-4 font-bold text-white rounded-full"
        >
          Выйти
        </button>
      </div>
    </div>
  );
};

export default ProfilePage;
