import React from "react";
import { Link, useLocation } from "react-router-dom";

const AccountNav = () => {
  const { pathname } = useLocation();
  let subpage: string | undefined = pathname.split("/")?.[2];
  if (subpage === undefined) subpage = "profile";

  function linkClasses(type: string | null = null) {
    let classes =
      "inline-flex gap-1 py-2 px-6 hover:shadow transition-shadow rounded-full";
    if (subpage === type) {
      classes += "  bg-primary text-white rounded-full";
    } else {
      classes += " bg-gray-100";
    }
    return classes;
  }

  return (
    <nav className="w-full mt-8 mx-auto grid grid-cols-1 sm:flex justify-center gap-8 mb-8">
      <Link className={linkClasses("profile")} to={"/account/profile"}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className="w-5 h-5"
        >
          <path d="M10 8a3 3 0 100-6 3 3 0 000 6zM3.465 14.493a1.23 1.23 0 00.41 1.412A9.957 9.957 0 0010 18c2.31 0 4.438-.784 6.131-2.1.43-.333.604-.903.408-1.41a7.002 7.002 0 00-13.074.003z" />
        </svg>
        Мой профиль
      </Link>
      <Link className={linkClasses("places")} to={"/account/places"}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className="w-5 h-5"
        >
          <path
            fillRule="evenodd"
            d="M9.293 2.293a1 1 0 011.414 0l7 7A1 1 0 0117 11h-1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-3a1 1 0 00-1-1H9a1 1 0 00-1 1v3a1 1 0 01-1 1H5a1 1 0 01-1-1v-6H3a1 1 0 01-.707-1.707l7-7z"
            clipRule="evenodd"
          />
        </svg>
        Мои места
      </Link>
    </nav>
  );
};

export default AccountNav;
