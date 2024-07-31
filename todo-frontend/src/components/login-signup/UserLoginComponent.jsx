import React, { useEffect } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import logo from "../../assets/Logo.svg";
import { getUser } from "../../utils/localStorage";

const UserLoginComponent = () => {
  const location = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    if (!(getUser() === null)) {
      navigate("/home");
    }
  }, []);
  return (
    <div className="flex flex-col gap-10 w-full h-screen relative  text-black py-2">
      <div
        className="absolute w-full 
                    bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 
                    top-0 left-0 h-screen opacity-50 filter blur-3xl -z-50"
      ></div>
      <div className="flex justify-between px-2 py-1 items-center">
        <div className="logo flex gap-3 items-center px-3">
          <img src={logo} className="h-10 w-100" alt="Logo"></img>
          <div className="text-xl text-black font-medium"> Task Manager </div>
        </div>
        <div className="flex gap-6 items-center">
          <Link
            to="/login"
            className="bg-gray-200/30 shadow-lg px-5 py-2 rounded-lg text-lg font-semibold hover:scale-105 hover:bg-gray-200"

          >
            Login
          </Link>
          <Link
            to="/register"
            className="bg-gray-200/30 shadow-lg px-5 py-2 rounded-lg text-lg font-semibold hover:scale-105 hover:bg-gray-200"
          >
            SignUp
          </Link>
        </div>
      </div>
      <Outlet />
    </div>
  );
};

export default UserLoginComponent;
