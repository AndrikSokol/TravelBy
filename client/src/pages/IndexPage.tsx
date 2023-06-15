import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { api } from "../services/api";
import { useDispatch, useSelector } from "react-redux";
import { fetchPlaces } from "../slices/placesSlice";
const IndexPage = () => {
  const dispatch = useDispatch();
  // const [places, setPlaces] = React.useState([]);
  React.useEffect(() => {
    dispatch(fetchPlaces());
  }, []);

  const {isLoading,places,error} = useSelector((state) => state.place);

  if(isLoading){
    return <div>загрузка...</div>
  }

  if(error){
    return <div>Не удалось </div>
  }
  return (
    <div className="w-[90%] my-5 mx-auto grid  gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {places.length > 0 &&
        places.map((place) => (
          <Link
            to={"/place/" + place._id}
            className="shadow-xl cursor-pointer hover:shadow-2xl transition-shadow hover:scale-[101%] "
            key={place._id}
          >
            <div>
              {place.photos.length > 0 && (
                <div>
                  <img
                    className="object-cover w-full h-64 rounded-t-lg"
                    src={"http://localhost:4500/uploads/" + place.photos[0]}
                    alt=""
                  />
                </div>
              )}

              <div className="p-2">
                <div className="text-xl font-bold">{place?.title}</div>
                <div className="text-sm text-gray-500">{place?.address}</div>
                <div className="text-md">
                  <span className="font-bold">{place?.price}</span>$ per night
                </div>
              </div>
            </div>
          </Link>
        ))}
    </div>
  );
};

export default IndexPage;
