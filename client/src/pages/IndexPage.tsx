import React, { useRef } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { api } from "../services/api";
import { fetchPlaces } from "../slices/placesSlice";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import MyLoader from "../components/MyLoader";
import { BASEURL } from "../constants/constants";
const IndexPage = () => {
  const dispatch = useAppDispatch();
  const divRef = useRef();
  // const [places, setPlaces] = React.useState([]);
  React.useEffect(() => {
    dispatch(fetchPlaces());
  }, []);

  const { isLoading, places, error } = useAppSelector((state) => state.place);

  if (isLoading) {
    return (
      <div className=" my-5 mx-auto grid  gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
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
  // sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4
  return (
    <div className="my-5 mx-auto gap-5 grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {places.length > 0 &&
        places.map((place) => (
          <Link
            to={"/place/" + place._id}
            className="shadow-xl cursor-pointer hover:shadow-2xl transition-shadow hover:scale-[101%] "
            key={place._id}
          >
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
