import React, { useCallback, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import travel from "../../assets/travel.png";
import { useAppSelector } from "../../hooks/redux";
import { useDispatch } from "react-redux";
import { addFilter, clearFitler } from "../../slices/placesSlice";

const Header = () => {
  const dispath = useDispatch();
  const { setAuth, user } = useAppSelector((state) => state.user);
  const [filter, setFilter] = useState<string>("");
  const { pathname } = useLocation();

  let subpage: string | undefined = pathname.split("/")?.[2];

  const handleFilterButton = () => {
    dispath(addFilter(filter));
  };

  const handleInput = (event) => {
    if (event.key === "Enter" || event.keyCode === 13) {
      dispath(addFilter(filter));
    }
  };

  useEffect(() => {
    if (subpage != undefined) {
      dispath(clearFitler());
    }
  }, [subpage]);

  return (
    <header
      className={`w-full  border-b p-4 ${
        subpage === "login" ? "relative opacity-5" : " "
      }`}
    >
      <div className="sm:w-[85%] mx-auto flex gap-2 justify-between  w-full">
        <Link to={"/"} className="flex items-center gap-1">
          <div className="flex">
            <img className="w-6 h-6 sm:w-8 sm:h-8" src={travel} alt="travel" />
            <span className="font-bold text-lg sm:text-xl">TravelBY</span>
          </div>
        </Link>
        <div
          className={`flex gap-4 border border-gray-300 rounded-full py-2 px-4 shadow-md shadow-gray-300  ${
            pathname == "/" ? "opacity-100" : "opacity-0"
          }`}
        >
          <input
            className=""
            value={filter}
            type="text"
            placeholder="место..."
            onChange={(e) => setFilter(e.target.value)}
            onKeyUp={handleInput}
          />

          <button
            className="bg-primary rounded-full text-white p-1"
            onClick={handleFilterButton}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-4 h-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
              />
            </svg>
          </button>
        </div>
        <Link
          to={setAuth ? "/account/profile" : "/login"}
          className="flex items-center  gap-1 sm:gap-2 border border-gray-300 rounded-full py-1 sm:py-2 px-2 sm:px-4 hover:shadow transition-shadow "
        >
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5"
              />
            </svg>
          </div>
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-6 h-6"
            >
              <path
                fillRule="evenodd"
                d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          {setAuth && <div>{user?.username}</div>}
        </Link>
      </div>
    </header>
  );
};

export default React.memo(Header);
