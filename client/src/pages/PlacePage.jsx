import axios from "axios";
import React from "react";
import { useParams } from "react-router";
import { MdPlace } from "react-icons/md";

const PlacePage = () => {
  const [place, setPlace] = React.useState({});
  const [showAllPhotos, setShowAllPhotos] = React.useState(false);
  const { id } = useParams();
  React.useEffect(() => {
    async function fetchPlace() {
      try {
        const { data } = await axios.get(`/place/${id}`);
        setPlace(data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchPlace();
  }, []);

  if (showAllPhotos) {
    return (
      <div className=" px-8 py-2 absolute inset-0 bg-white  min-h-screen">
        <h2 className="w-full text-center text-2xl mb-2 ">
          Photos of {place.title}
        </h2>
        <div className="mb-8">
          <button
            className="fixed top-12 gap-1 right-2 px-2 py-2 shadow-lg items-center flex justify-between bg-primary text-white rounded-2xl "
            onClick={() => setShowAllPhotos(false)}
          >
            <div>Close Photos</div>
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
                d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </button>
        </div>

        <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4 ">
          {place?.photos?.length > 0 &&
            place.photos.map((photo) => (
              <div className="w-full flex justify-center">
                <img
                  className="rounded-sm"
                  src={`http://localhost:4500/uploads/` + photo}
                  alt=""
                />
              </div>
            ))}
        </div>
      </div>
    );
  }
  return (
    <div className="w-[95%] mx-auto">
      {place !== undefined && (
        <div className="mt-4">
          <div className="flex flex-col">
            <div className="text-xl font-bold">{place.title}</div>
            <div className="flex justify-between  gap-4 py-2">
              <a
                target="_blank"
                href={`https://maps.google.com/?q=` + place.address}
                className="flex gap-2 items-center"
              >
                <MdPlace /> {place.address}
              </a>
              <div className="flex gap-3">
                <div className="flex gap-2 cursor-pointer hover:scale-[103%]">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-6 h-6 "
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z"
                    />
                  </svg>
                  <h2 className="text-md ">Share</h2>
                </div>
                <div className="flex gap-2 cursor-pointer hover:scale-[103%]">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-6 h-6 cursor-pointer"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                    />
                  </svg>
                  <h2 className="text-md ">Save</h2>
                </div>
              </div>
            </div>
          </div>
          <div className="relative ">
            <div className="rounded-2xl overflow-hidden grid gap-2 grid-cols-[2fr_1fr] justify-center">
              <div>
                {place.photos?.[0] && (
                  <div className="aspect-square  object-cover">
                    {" "}
                    <img
                      src={"http://localhost:4500/uploads/" + place.photos[0]}
                      alt=""
                    />
                  </div>
                )}
              </div>
              <div className="grid gap-y-2">
                {place.photos?.[1] && (
                  <img
                    className="aspect-square object-cover"
                    src={"http://localhost:4500/uploads/" + place.photos[1]}
                    alt=""
                  />
                )}
                <div className="overflow-hidden">
                  {place.photos?.[2] && (
                    <img
                      className="aspect-square object-cover"
                      src={"http://localhost:4500/uploads/" + place.photos[2]}
                      alt=""
                    />
                  )}
                </div>
              </div>
            </div>
            <button
              onClick={() => setShowAllPhotos(true)}
              className="flex gap-1 absolute bottom-2 right-2 py-2 px-4 bg-white rounded-2xl ahadow shadow-md hover:scale-[102%] ease-in-out "
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
                  d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                />
              </svg>
              Show more photos
            </button>
          </div>
        </div>
      )}
      <div className="py-2">
        <h2 className="font-semibold text-2xl">Description</h2>
        <p className="sm:text-lg">{place.description}</p>
      </div>
      <div className="grid grid-cols-2 ">
        <div className="sm:text-xl">
          Check-in: {place.checkIn} <br />
          Check-out: {place.checkOut} <br />
          Max number of guests: {place.maxGuests} <br />
        </div>
        <div className="sm:w-[250px] overflow-hidden shadow sm:text-xl gap-1 bg-gray-300 flex flex-col items-center justify-center rounded-2xl">
          <div>Price: {place.price}$ / per night</div>
          <button className="bg-primary p-1 text-white rounded-2xl w-full">
            Book this place
          </button>
        </div>
      </div>
    </div>
  );
};

export default PlacePage;
