import React, { useRef } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { api } from "../services/api";
import { fetchPlaces } from "../slices/placesSlice";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import MyLoader from "../components/MyLoader";
import { BASEURL } from "../constants/constants";
import { addUser } from "../slices/userSlice";
const IndexPage = () => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.user);
  React.useEffect(() => {
    dispatch(fetchPlaces());

    const fetchUser = async () => {
      if (user) return;
      const userData = await api.googleLogin();
      localStorage.setItem("token", userData.accessToken);
      dispatch(addUser(userData.googleUser));
    };
    fetchUser();
  }, []);

  const { isLoading, places, error } = useAppSelector((state) => state.place);

  if (isLoading) {
    return (
      <div className="sm:w-[85%] my-5 mx-auto grid  gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5">
        <MyLoader />
        <MyLoader />
        <MyLoader />
        <MyLoader />
        <MyLoader />
        <MyLoader />
        <MyLoader />
        <MyLoader />
        <MyLoader />
        <MyLoader />
      </div>
    );
  }

  if (error) {
    return (
      <h1 className="flex text-2xl font-bold my-10 justify-center items-center w-full">
        Не удалось загрузить! Перезагрузите страницу
      </h1>
    );
  }
  return (
    <div className="sm:w-[85%] p-4 my-5 mx-auto gap-5 grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5">
      {places.length > 0 &&
        places.map((place) => (
          <Link
            to={"/place/" + place._id}
            className="shadow-xl cursor-pointer hover:shadow-2xl transition-shadow hover:scale-[101%] relative"
            key={place._id}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6 cursor-pointer absolute right-1 top-1"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
              />
            </svg>
            <div className="flex flex-col">
              {place.photos.length > 0 && (
                <div>
                  <img
                    className="object-cover h-72 w-full rounded-t-lg "
                    src={`${BASEURL}/uploads/` + place.photos[0]}
                    alt=""
                  />
                </div>
              )}

              <div className="p-2">
                <div className="text-xl font-bold">{place?.title}</div>
                <div className="text-sm text-gray-500">{place?.address}</div>
                {/* <div className="text-md">
                  <span className="font-bold">{place?.price}</span>$ per night
                </div> */}
              </div>
            </div>
          </Link>
        ))}
    </div>
  );
};

export default IndexPage;
