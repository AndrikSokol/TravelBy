import React from "react";
import { Link, useParams } from "react-router-dom";
import PlacesFormPage from "../components/PlacesFormPage";
import AccountNav from "../components/AccountNav";

const PlacesPage = () => {
  React.useEffect(() => {
    async function fetchData() {
      await axios.get("/places");
    }
    fetchData();
  }, []);
  return (
    <div>
      <AccountNav />
      <div className=" text-center">
        List Of All Added Places
        <br />
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
