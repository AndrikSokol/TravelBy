import React, { LegacyRef, MouseEventHandler } from "react";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../context/UserContext";
import { api } from "../services/api";
import { IUserContext } from "../types/user.interface";
import { useAppDispatch } from "../hooks/redux";
import { addUser } from "../slices/userSlice";
import nature from "../assets/nature.jpg";

const LoginPage = () => {
  const [email, setEmail] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");
  const [redirect, setRedirect] = React.useState<boolean>(false);
  const emailInputRef = React.useRef();
  const [qrCodeURL, setQrCodeURL] = React.useState<string>();
  const dispatch = useAppDispatch();
  const [isShow, setIsShow] = React.useState<boolean>(false);
  const [isInvalidData, setIsInvalidData] = React.useState<boolean>(false);

  async function handleLoginSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    try {
      const userData = await api.login(email, password);
      localStorage.setItem("token", userData.accessToken);
      dispatch(addUser(userData.user));
      //fetchQRcode(email);
      setRedirect(true);
    } catch (e) {
      if (e.request.status === 400 || e.request.status === 401) {
        setIsInvalidData(true);
      }
    }
  }

  async function fetchQRcode(email: string) {
    try {
      const qrCodeImgResponse = await api.getQrCodeForSignIn(email);
      setQrCodeURL(qrCodeImgResponse);
    } catch (error) {
      console.error("Error fetching QR code:", error);
    }
  }

  React.useEffect(() => {
    setIsShow(true);
    // async function fetchQRcode() {
    //   try {
    //     const qrCodeImgResponse = await api.getQrCodeForSignIn();
    //     setQrCodeURL(qrCodeImgResponse);
    //     // if (qrCodeImgResponse instanceof Blob) {
    //     //   // Check if the response is a Blob (or a File)
    //     //   // const qrCodeURL = URL.createObjectURL(qrCodeImgResponse);
    //     //   setQrCodeURL(qrCodeURL);
    //     // } else {
    //     //   console.error("QR code response is not a Blob:", qrCodeImgResponse);
    //     // }
    //   } catch (error) {
    //     console.error("Error fetching QR code:", error);
    //   }
    // }
    // fetchQRcode();
  }, []);

  const googleAuth = () => {
    window.open("http://localhost:4500/auth/google ", "_self");
  };

  if (redirect) {
    return <Navigate to={"/"} />;
  }

  const verifyCode = async (code) => {
    const { data: isValid } = await api.verify2fa(code, email);
    console.log(isValid, "valid");
    isValid ? setRedirect(true) : console.log("error");
  };

  return (
    <div className="grow flex items-center  flex-row bg-nature bg-cover">
      <div
        className={`  mb-40 min-w-fit  max-w-3xl   bg-white ${
          isShow ? "bg-opacity-50 ease-in-out  duration-200" : "bg-opacity-0"
        } shadow-lg p-4  rounded-md `}
      >
        <h1
          className={` ${
            isShow
              ? "opacity-100 ease-in-out  delay-300 duration-200"
              : "opacity-0"
          } text-4xl text-center pb-4 font-medium`}
        >
          Вход
        </h1>
        <div className="grid grid-cols-2 gap-3 overflow-hidden">
          <div className="border-red-100 border-r-2 pr-2 flex flex-col  items-center    overflow-hidden">
            <button
              onClick={googleAuth}
              className={`${
                isShow
                  ? " translate-x-0  opacity-100"
                  : " translate-x-[-300px] opacity-0"
              }  ease-in-out px-2 flex items-center gap-2  bg-slate-300 active:opacity-90  bg-opacity-80 w-64  delay-300 duration-500  rounded-md py-2  font-bold`}
            >
              <img
                src="/icons/login/google.png"
                className="w-6 h-6"
                alt="Google Sign In image"
              ></img>{" "}
              Войти с помощью Google
            </button>
            {qrCodeURL && (
              <>
                <img src={qrCodeURL} className="  w-48" alt="google qr-code" />
                <input
                  placeholder="verify"
                  onChange={(e) => verifyCode(e.target.value)}
                ></input>
              </>
            )}
          </div>
          <form
            className={`${
              isShow
                ? "translate-x-0 ease-in-out opacity-100"
                : " translate-x-[300px] opacity-0"
            } mx-auto  delay-100 duration-200`}
            onSubmit={handleLoginSubmit}
          >
            <div
              className={`flex border rounded-2xl my-4 py-3 px-2 gap-2 ${
                isInvalidData ? "border-red-500 border-2 " : ""
              }`}
            >
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
                className="bg-white bg-opacity-0 placeholder-gray-700"
                type="email"
                placeholder="youremail@gmail.com"
                value={email}
                onChange={(ev) => setEmail(ev.target.value)}
              />
            </div>
            <div
              className={`flex border rounded-2xl my-4 py-3 px-2 gap-2 ${
                isInvalidData ? "border-red-500 border-2 " : ""
              }`}
            >
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
                className="bg-white bg-opacity-0 placeholder-gray-700"
                type="password"
                placeholder="password"
                value={password}
                onChange={(ev) => setPassword(ev.target.value)}
              />
            </div>

            <button className="hover:opacity-90 active:opacity-95 w-full bg-primary rounded-2xl py-2 text-white font-bold ">
              Войти
            </button>

            <div className="text-center py-2   text-gray-800 ">
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
    </div>
  );
};

export default LoginPage;
