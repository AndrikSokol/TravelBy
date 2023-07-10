import { Route, Routes } from "react-router";
import Layout from "./components/Layout";
import "./App.css";
import LoginPage from "./pages/LoginPage";
import IndexPage from "./pages/IndexPage";
import RegistrationPage from "./pages/RegistrationPage";
import { UserContextProvider } from "./context/UserContext";
import ProfilePage from "./pages/ProfilePage";
import PlacesPage from "./pages/PlacesPage";
import PlacesFormPage from "./components/PlacesFormPage";
import PlacePage from "./pages/PlacePage";
import React from "react";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<IndexPage />}></Route>
        <Route path="/login" element={<LoginPage />}></Route>
        <Route path="/registration" element={<RegistrationPage />}></Route>
        <Route path="/account/profile" element={<ProfilePage />}></Route>
        <Route path="/account/places" element={<PlacesPage />}></Route>
        <Route path="/account/places/new" element={<PlacesFormPage />}></Route>
        <Route path="/account/places/:id" element={<PlacesFormPage />}></Route>
        <Route path="/place/:id" element={<PlacePage />}></Route>
      </Route>
    </Routes>
  );
}

export default App;
