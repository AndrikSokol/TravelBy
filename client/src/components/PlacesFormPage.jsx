import React from "react";
import Perks from "./Perks";
import axios from "axios";
import PhotosUploader from "./PhotosUploader";
import AccountNav from "./AccountNav";
import { Navigate } from "react-router";

const PlacesFormPage = () => {
  const [title, setTitle] = React.useState("");
  const [address, setAddress] = React.useState("");
  const [addedPhotos, setAddedPhotos] = React.useState([]);
  const [description, setDescription] = React.useState("");
  const [perks, setPerks] = React.useState([]);
  const [extraInfo, setExtraInfo] = React.useState("");
  const [checkIn, setCheckIn] = React.useState("");
  const [checkOut, setCheckOut] = React.useState("");
  const [maxGuests, setMaxGuests] = React.useState(1);
  const [redirect, setRedirect] = React.useState(false);

  function addedNewPlaces(event) {
    event.preventDefault();
    try {
      axios.post("/places", {
        title,
        address,
        addedPhotos,
        description,
        perks,
        extraInfo,
        checkIn,
        checkOut,
        maxGuests,
      });
      clearState();
      alert("succesfull add place");
      setRedirect(true);
    } catch (error) {
      alert(error);
    }
  }

  if (redirect) {
    return <Navigate to={"/account/places"} />;
  }

  const clearState = () => {
    setTitle("");
    setAddress("");
    setAddedPhotos([]);
    setDescription("");
    setPerks("");
    setExtraInfo("");
    setCheckIn("");
    setCheckOut("");
    setMaxGuests(1);
  };

  return (
    <div>
      <AccountNav />
      <form className="w-[80%] lg:w-[60%] mx-auto" onSubmit={addedNewPlaces}>
        <h2 className="text-2xl lg:text-3xl mt-4">Title</h2>
        <p className="text-gray-500 text-sm">
          title for your place/ Should be short and catchy as in advertisment
        </p>
        <div className="MyInput">
          <input
            value={title}
            onChange={(ev) => setTitle(ev.target.value)}
            type="text"
            placeholder="title"
          />
        </div>

        <h2 className="text-2xl lg:text-3xl mt-4">Address</h2>
        <p className="text-gray-500 text-sm">Address to this place</p>
        <div className="MyInput">
          <input
            value={address}
            onChange={(ev) => setAddress(ev.target.value)}
            type="text"
            placeholder="address"
          />
        </div>
        <PhotosUploader addedPhotos={addedPhotos} onChange={setAddedPhotos} />
        <h2 className="text-2xl lg:text-3xl mt-4">Description</h2>
        <p className="text-gray-500 text-sm">description of the place</p>
        <textarea
          value={description}
          onChange={(ev) => setDescription(ev.target.value)}
        ></textarea>
        <Perks selected={perks} onChange={setPerks} />
        <h2 className="text-2xl mt-4">Extra info</h2>
        <p className="text-gray-500 text-sm">house rules, etc</p>
        <textarea
          value={extraInfo}
          onChange={(ev) => setExtraInfo(ev.target.value)}
        ></textarea>
        <h2 className="text-2xl mt-4">Check in&out times</h2>
        <p className="text-gray-500 text-sm">
          add check in and out times, remember to have some time window for
          cleaning the room between guests
        </p>
        <div className="grid gap-2 sm:grid-cols-3">
          <div>
            <h3 className="mt-2 -mb-1">Check in time</h3>
            <input
              value={checkIn}
              onChange={(ev) => setCheckIn(ev.target.value)}
              className="MyInput"
              type="text"
              placeholder="14:00"
            />
          </div>
          <div>
            <h3 className="mt-2 -mb-1">Check out time</h3>
            <input
              value={checkOut}
              onChange={(ev) => setCheckOut(ev.target.value)}
              className="MyInput"
              type="text"
              placeholder="11:00"
            />
          </div>
          <div>
            <h3 className="mt-2 -mb-1">Max number of guests</h3>
            <input
              value={maxGuests}
              onChange={(ev) => setMaxGuests(ev.target.value)}
              className="MyInput"
              type="number"
            />
          </div>
        </div>
        <div className="my-4">
          <button className="w-[200px] hover:opacity-90 active:opacity-95  bg-primary rounded-2xl py-2 text-white font-bold ">
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default PlacesFormPage;
