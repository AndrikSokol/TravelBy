import React from "react";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../context/UserContext";
import { api } from "../services/api";
import { IUserContext } from "../types/user.interface";
import { useAppDispatch } from "../hooks/redux";
import { addUser } from "../slices/userSlice";

const LoginPage = () => {
  const [email, setEmail] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");
  const [redirect, setRedirect] = React.useState<boolean>(false);
  // const { setUser } = React.useContext<IUserContext>(UserContext);
  const dispatch = useAppDispatch();
  async function handleLoginSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    try {
      const userData = await api.login(email, password);
      localStorage.setItem("token", userData.accessToken);
      dispatch(addUser(userData.user));
      // setUser(userData.user);
      setRedirect(true);
    } catch (e) {
      console.log(e.respose?.data?.message);
    }
  }

  if (redirect) {
    return <Navigate to={"/"} />;
  }
  return (
    <div className="mt-4 grow flex items-center justify-around">
      <div className=" mb-32">
        <h1 className="text-4xl text-center">Вход</h1>
        <form className="max-w-2xl mx-auto" onSubmit={handleLoginSubmit}>
          <div className="flex border rounded-2xl my-4 py-3 px-2 gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                d="M16.5 12a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zm0 0c0 1.657 1.007 3 2.25 3S21 13.657 21 12a9 9 0 10-2.636 6.364M16.5 12V8.25"
              />
            </svg>
            <input
              type="email"
              placeholder="youremail@gmail.com"
              value={email}
              onChange={(ev) => setEmail(ev.target.value)}
            />
          </div>
          <div className="flex border rounded-2xl my-2 py-3 px-2 gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
              />
            </svg>
            <input
              type="password"
              placeholder="password"
              value={password}
              onChange={(ev) => setPassword(ev.target.value)}
            />
          </div>
          <button className="hover:opacity-90 active:opacity-95 w-full bg-primary rounded-2xl py-2 text-white font-bold ">
            Войти
          </button>
          <div className="text-center py-2 text-gray-500">
            Не имеете аккаунта?{" "}
            <Link
              to={"/registration"}
              className="text-black underline active:text-gray-700"
            >
              Зарегистрируйтесь
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
