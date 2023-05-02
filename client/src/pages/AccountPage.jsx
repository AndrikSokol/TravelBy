import React from "react";
import { UserContext } from "../context/UserContext";
import { Link, Navigate, useParams } from "react-router-dom";
import style from "../assets/css/accountPage.module.scss";
import axios from "axios";
import PlacesPage from "./PlacesPage";
import AccountNav from "../components/AccountNav";

const AccountPage = () => {
  const [redirect, setRedirect] = React.useState(null);
  const { user, ready, setUser } = React.useContext(UserContext);
  let { subpage } = useParams();

  if (subpage === undefined) {
    subpage = "profile";
  }

  async function logout() {
    try {
      await axios.post("/logout");
      alert("logout succesfull");
      setRedirect("/");
      setUser(null);
    } catch (e) {
      alert("logout err");
    }
  }

  if (redirect === "/") {
    return <Navigate to="/" />;
  }

  if (!ready && !user) {
    return (
      <div className={style.loading}>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>
    );
  }

  if (user === null && ready && !redirect) {
    return <Navigate to="/login" />;
  }

  return (
    <div>
      <AccountNav subpage={subpage} />
      {subpage === "profile" && (
        <div className="text-center max-w-lg mx-auto">
          <div>
            Logged in as {user.username} ({user.email})
          </div>
          <button
            onClick={logout}
            className="bg-primary w-full max-w-sm py-2 px-6 mt-4 font-bold text-white rounded-full"
          >
            Logout
          </button>
        </div>
      )}

      {subpage === "places" && <PlacesPage />}
    </div>
  );
};

export default AccountPage;
