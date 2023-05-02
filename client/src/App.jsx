import { Route, Routes } from "react-router";
import Layout from "./components/Layout";
import "./App.css";
import LoginPage from "./pages/LoginPage";
import IndexPage from "./pages/IndexPage";
import RegisterPage from "./pages/RegisterPage";
import axios from "axios";
import { UserContextProvider } from "./context/UserContext";
import AccountPage from "./pages/AccountPage";

axios.defaults.baseURL = "http://localhost:4500";
axios.defaults.withCredentials = true;
function App() {
  return (
    <UserContextProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<IndexPage />}></Route>
          <Route path="/login" element={<LoginPage />}></Route>
          <Route path="/register" element={<RegisterPage />}></Route>
          <Route path="/account/:subpage?" element={<AccountPage />}></Route>
          <Route
            path="/account/:subpage/:action"
            element={<AccountPage />}
          ></Route>
        </Route>
      </Routes>
    </UserContextProvider>
  );
}

export default App;
