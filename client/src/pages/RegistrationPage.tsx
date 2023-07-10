import React from "react";
import { Link, Navigate } from "react-router-dom";
import { api } from "../services/api";
import { IUserContext } from "../types/user.interface";
import { UserContext } from "../context/UserContext";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { addUser } from "../slices/userSlice";
const RegistrationPage = () => {
  const [username, setUsername] = React.useState<string>("");
  const [email, setEmail] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");
  // const { user, ready, setUser } = React.useContext<IUserContext>(UserContext);
  const [error, setError] = React.useState<string | undefined>();
  const dispatch = useAppDispatch();
  const { setAuth, user } = useAppSelector((state) => state.user);

  if (user && setAuth) {
    return <Navigate to="/" />;
  }

  async function registerUser(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    try {
      const userData = await api.registration(username, email, password);
      localStorage.setItem("token", userData.accessToken);
      // setUser(userData.user);
      dispatch(addUser(userData.user));
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <div className="mt-4 grow flex items-center justify-around">
      <div className="mb-32">
        <h1 className="text-4xl text-center">Register</h1>
        <form className="max-w-md mx-auto" onSubmit={registerUser}>
          <div className=" flex border rounded-2xl my-4 py-3 px-2 gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
            </svg>
            <input type="userName" placeholder="userName" value={username} onChange={(e) => setUsername(e.target.value)} />
          </div>
          <div className=" flex border rounded-2xl my-4 py-3 px-2 gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" d="M16.5 12a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zm0 0c0 1.657 1.007 3 2.25 3S21 13.657 21 12a9 9 0 10-2.636 6.364M16.5 12V8.25" />
            </svg>
            <input type="email" placeholder="youremail@gmail.com" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className="flex border rounded-2xl my-2 py-3 px-2 gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
            </svg>
            <input type="password" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          {error && <div className="font-bold bg-red-500">{error}</div>}
          <button className="w-full bg-primary transition-transform hover:opacity-90 active:opacity-95 rounded-2xl py-2 text-white font-bold ">Register</button>
          <div className="text-center py-2 text-gray-500 ">
            Do you have account?{" "}
            {!error && (
              <Link to={"/login"} className="text-black underline active:text-gray-700">
                Login
              </Link>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegistrationPage;
