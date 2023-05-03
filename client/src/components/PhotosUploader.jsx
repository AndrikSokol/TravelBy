import axios from "axios";
import React from "react";

const PhotosUploader = ({ addedPhotos, onChange }) => {
  const [photoLink, setPhotoLink] = React.useState("");

  async function addPhotoByLink(ev) {
    try {
      ev.preventDefault();
      const { data: filename } = await axios.post("/upload-byLink", {
        link: photoLink,
      });
      onChange((prev) => [...prev, filename]);
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
      onChange((prev) => [...prev, ...filenames]);
      alert("succesfull for upload by device");
    } catch (error) {
      alert("error for upload by device");
    }
  }

  return (
    <>
      <h2 className="text-2xl lg:text-3xl mt-4">Photos</h2>
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
              <div className="h-32 flex" key={link}>
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
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-8 h-8"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z"
            />
          </svg>
          Upload
        </label>
      </div>
    </>
  );
};

export default PhotosUploader;
