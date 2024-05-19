import logo from "./logo.svg";
import "./App.css";
import HomePage from "./Pages/HomePage";
import CreatePost from "./Pages/CreatePost";
import ProfilePage from "./Pages/ProfilePage";
import LoginPage from "./Pages/Login";
import LogOut from "./Pages/Logout";
import PrivateRoute from "./utils/PrivateRoute";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignupPage from "./Pages/Register";
import UpdatePost from "./Pages/UpdatePost";
import FutureFeature from "./Pages/FutureFeature";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PrivateRoute />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/new" element={<CreatePost />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/logout" element={<LogOut />} />
          <Route path="/edit" element={<UpdatePost />} />
          <Route path="/message" element={<FutureFeature />} />
          <Route path="/contact" element={<FutureFeature/>} />
        </Route>

        <Route path="/login" element={<LoginPage />} />

        <Route path="/register" element={<SignupPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
