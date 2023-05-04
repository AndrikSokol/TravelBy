import React from "react";
import { Link } from "react-router-dom";
import AccountNav from "../components/AccountNav";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { deletePlace } from "../slices/placesSlice";
import { addPlaces } from "../slices/placesSlice";

const PlacesPage = () => {
  const dispatch = useDispatch();
  React.useEffect(() => {
    async function fetchData() {
      console.log("useeffect");
      const { data } = await axios.get("/places");
      dispatch(addPlaces(data));
    }
    fetchData();
  }, []);

  async function deletePlace(e, place) {
    try {
      e.preventDefault();
      const { data } = await axios.delete("places", place);
      dispatch(deletePlace(data._id));
      alert("succesfull delete");
    } catch (error) {
      alert("cant delete");
    }
  }
  const places = useSelector((state) => state.place.places);

  return (
    <div>
      <AccountNav />
      <div className="w-full lg:w-[80%] mx-auto">
        {places !== undefined && (
          <div>
            <div className="text-center"> List Of All Added Places</div>

            <div>
              {places.map((place) => (
                <div
                  className="flex  gap-4 justify-between shadow p-3 my-2 items-center rounded-lg"
                  key={place._id}
                >
                  <div className="flex gap-4">
                    {place.photos.length > 0 && (
                      <div className="h-32 w-32 shrink-0 grow">
                        <img src={place.photos[0]} alt="" />
                      </div>
                    )}

                    <div className="text-justify grow-0 shrink">
                      <div className=" text-lg lg:text-xl lg:font-bold">
                        {place.title}
                      </div>
                      <p>{place.description}</p>
                    </div>
                  </div>

                  <div className="flex gap-3 text-white">
                    <Link
                      to={"/account/places/" + place._id}
                      className="bg-primary py-1 px-3 rounded-md hover:opacity-95 ease-in-out"
                    >
                      show
                    </Link>
                    <button
                      onClick={(e) => deletePlace(e, place)}
                      className="bg-primary py-1 px-3 rounded-md hover:opacity-95 ease-in-out"
                    >
                      delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <br />
          </div>
        )}

        <Link
          className="inline-flex gap-1 bg-primary text-white rounded-full py-2 pl-4 pr-6"
          to={"/account/places/new"}
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
              d="M12 6v12m6-6H6"
            />
          </svg>
          Add new place
        </Link>
      </div>
    </div>
  );
};

export default PlacesPage;
