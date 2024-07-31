import { useState } from "react";
import TaskMainComponent from "./components/landing/TaskMainComponent";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomeComponent from "./components/landing/HomeComponent";
import UserLoginComponent from "./components/login-signup/UserLoginComponent";
import Login from "./components/login-signup/Login";
import SignUp from "./components/login-signup/SignUp";

function App() {
  return (
      <Router>
        <Routes>
          <Route path="/" element={<UserLoginComponent />}>
            <Route index element={<Login />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/register" element={<SignUp />}></Route>
          </Route>

          <Route path="/home" element={<TaskMainComponent />}>
            <Route index element={<HomeComponent />}></Route>
          </Route>
        </Routes>
      </Router>
  );
}

export default App;
