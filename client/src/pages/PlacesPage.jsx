import React from "react";
import { Link, useParams } from "react-router-dom";
import Perks from "../Perks";
import axios from "axios";

const PlacesPage = () => {
  const { action } = useParams();
  const [title, setTitle] = React.useState("");
  const [address, setAddress] = React.useState("");
  const [addedPhotos, setAddedPhotos] = React.useState([]);
  const [photoLink, setPhotoLink] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [perks, setPerks] = React.useState([]);
  const [extraInfo, setExtraInfo] = React.useState("");
  const [checkIn, setCheckIn] = React.useState("");
  const [checkOut, setCheckOut] = React.useState("");
  const [maxGuests, setMaxGuests] = React.useState(1);

  async function addPhotoByLink(ev) {
    try {
      ev.preventDefault();
      const { data: filename } = await axios.post("/upload-by-link", {
        link: photoLink,
      });
      setAddedPhotos((prev) => [...prev, filename]);
      setPhotoLink("");
      alert("photo added");
    } catch (err) {
      alert("err to add photo by link");
    }
  }

  async function uploadPhoto(ev) {
    const files = ev.target.files;
    const data = new FormData();
    for (let i = 0; i < files.length; i++) {
      data.append("photos", files[i]);
    }

    try {
      const { data: filenames } = await axios.post("/upload-by-device", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setAddedPhotos((prev) => [...prev, ...filenames]);
      alert("succesfull for upload by device");
    } catch (error) {
      alert("error for upload by device");
    }
  }

  return (
    <div>
      {action !== "new" && (
        <div className=" text-center">
          <Link
            className="inline-flex gap-1 bg-primary text-white rounded-full py-2 pl-4 pr-6"
            to={"/account/places/new"}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-6 h-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M12 6v12m6-6H6"
              />
            </svg>
            Add new place
          </Link>
        </div>
      )}

      {action === "new" && (
        <div className="w-[95%] mx-auto m-auto pl-4">
          <form>
            <h2 className="text-2xl mt-4">Title</h2>
            <p className="text-gray-500 text-sm">
              title for your place/ Should be short and catchy as in
              advertisment
            </p>
            <div className="MyInput">
              <input
                value={title}
                onChange={(ev) => setTitle(ev.target.value)}
                type="text"
                placeholder="title"
              />
            </div>

            <h2 className="text-2xl mt-4">Address</h2>
            <p className="text-gray-500 text-sm">Address to this place</p>
            <div className="MyInput">
              <input
                value={address}
                onChange={(ev) => setAddress(ev.target.value)}
                type="text"
                placeholder="address"
              />
            </div>

            <h2 className="text-2xl mt-4">Photos</h2>
            <p className="text-gray-500 text-sm">more = better</p>
            <div className="flex gap-2 ">
              <div className="MyInput ">
                <input
                  value={photoLink}
                  onChange={(ev) => setPhotoLink(ev.target.value)}
                  type="text"
                  placeholder={"Add using a link ...jpg"}
                />
              </div>
              <div className="flex py-2">
                <button
                  onClick={addPhotoByLink}
                  className="bg-gray-200 px-4 rounded-xl hover:opacity-90 transition-opacity"
                >
                  Add&nbsp;photo
                </button>
              </div>
            </div>
            <div className="mt-3 grid gap-2 grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
              {addedPhotos.length > 0 &&
                addedPhotos.map((link) => {
                  return (
                    <div className="h-32 flex">
                      <img
                        className="rounded-2xl w-full object-cover"
                        src={"http://localhost:4500/uploads/" + link}
                        alt=""
                      />
                    </div>
                  );
                })}
              <label className=" h-32 cursor-pointer flex items-center gap-1 justify-center border bg-transparent rounded-2xl p-2 text-2xl text-gray-600">
                <input
                  type="file"
                  multiple
                  className="hidden"
                  onChange={uploadPhoto}
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-8 h-8"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z"
                  />
                </svg>
                Upload
              </label>
            </div>
            <h2 className="text-2xl mt-4">Description</h2>
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
              <button className="hover:opacity-90 active:opacity-95 w-full bg-primary rounded-2xl py-2 text-white font-bold ">
                Save
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default PlacesPage;
