import axios from "axios";
import React, { FC } from "react";
import { api } from "../services/api";
import { BASEURL } from "../constants/constants";

type PhotosUploaderProps = {
  addedPhotos: string[];
  onChange: React.Dispatch<React.SetStateAction<string[]>>;
};
const PhotosUploader: FC<PhotosUploaderProps> = ({ addedPhotos, onChange }) => {
  const [photoLink, setPhotoLink] = React.useState<string>("");

  async function addPhotoByLink(
    ev: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) {
    try {
      ev.preventDefault();
      const filename = await api.uploadByLink(photoLink);
      onChange((prev: string[]) => [...prev, filename]);
      setPhotoLink("");
      alert("photo added");
    } catch (err) {
      alert("err to add photo by link");
    }
  }

  async function uploadPhoto(ev: React.ChangeEvent<HTMLInputElement>) {
    const files = ev.target.files;
    if (files === null) {
      return alert("Добавьте фото");
    }
    const data = new FormData();
    for (let i = 0; i < files.length; i++) {
      data.append("photos", files[i]);
    }
    try {
      const filenames = await api.uploadByDevice(data);
      onChange((prev: string[]) => [...prev, ...filenames]);
      alert("succesfull for upload by device");
    } catch (error) {
      alert("error for upload by device");
    }
  }

  const removePhoto = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    filename: string
  ): void => {
    event.preventDefault();
    onChange([...addedPhotos.filter((photo) => photo !== filename)]);
  };

  const selectAsMainPhoto = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    filename: string
  ): void => {
    event.preventDefault();
    onChange([filename, ...addedPhotos.filter((photo) => photo !== filename)]);
  };

  return (
    <>
      <h2 className="text-2xl lg:text-3xl mt-4">Фото</h2>
      <p className="text-gray-500 text-sm">больше = лучше</p>
      <div className="flex gap-2 ">
        <div className="MyInput ">
          <input
            value={photoLink}
            onChange={(ev) => setPhotoLink(ev.target.value)}
            type="text"
            placeholder={"Добавьте с помощью ссылки ...jpg"}
          />
        </div>
        <div className="flex py-2">
          <button
            onClick={addPhotoByLink}
            className="bg-gray-200 px-4 rounded-xl hover:opacity-90 transition-opacity"
          >
            добавить&nbsp;фото
          </button>
        </div>
      </div>
      <div className="mt-3 grid gap-2 grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
        {addedPhotos.length > 0 &&
          addedPhotos.map((link) => {
            return (
              <div className="h-32 flex relative" key={link}>
                <img
                  className="rounded-2xl w-full object-cover"
                  src={`${BASEURL}/uploads/` + link}
                  alt=""
                />
                <button
                  onClick={(event) => removePhoto(event, link)}
                  className="absolute bottom-1 right-1 text-white bg-black opacity-40 rounded-2xl py-2 px-2"
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
                      d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                    />
                  </svg>
                </button>

                <button
                  onClick={(event) => selectAsMainPhoto(event, link)}
                  className="absolute top-1 left-1 text-white bg-black opacity-40 rounded-2xl py-2 px-2"
                >
                  {link === addedPhotos[0] ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="w-6 h-6 text-[#f1b636] scale-[120%]"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="w-6 h-6 text-white"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
                      />
                    </svg>
                  )}
                </button>
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
          Загрузить
        </label>
      </div>
    </>
  );
};

export default PhotosUploader;
