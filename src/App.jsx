import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import AgeCheck from "./pages/AgeCheck";
import Explore from "./pages/Explore";
import NetworkStatus from "./components/NetworkStatus";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
const App = () => {
  return (
    <BrowserRouter>
      <NetworkStatus />

      <Routes>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/" element={<Home />} />
        <Route path="/agecheck" element={<AgeCheck />} />
        <Route path="/agecheck/:movieId" element={<AgeCheck />} />
        <Route path="/explore" element={<Explore />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
