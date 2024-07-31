import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { endpoint } from "../constants/url";
import getService from "../../services/getService";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import logo from "../../assets/Logo.svg";
import Avatar from "react-avatar";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../../utils/localStorage";
import { fetchUser } from "../../features/user/slice";

const Header = () => {
  const dispatch = useDispatch();
  const token = getUser();
  const userData = useSelector((state) => state.users.fetchUserData.data);
  const status = useSelector((state) => state.users.fetchUserData.status);
  const error_data = useSelector((state) => state.users.fetchUserData.error);

  useEffect(()=>{
      dispatch(fetchUser())
      
  }, [dispatch]);
  return (
    <>
      <div className="flex flex-col gap-10 w-full relative  text-black py-2">
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
            <form className="max-w-md mx-auto">
              <div className="relative flex items-center w-full h-10 rounded-lg focus-within:shadow-lg bg-white overflow-hidden">
                <div className="grid place-items-center h-full w-12 text-gray-300">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>

                <input
                  className="h-full w-full outline-none text-sm text-gray-700 pr-2"
                  type="text"
                  id="search"
                  placeholder="Search"
                />
              </div>
            </form>
            <div>
              {
                userData && userData?.success && (
                  <Avatar name={userData?.user?.firstName + " " +userData?.user?.lastName} size="40" round={true} />
                  // userData?.user?.profilePicture ? <Avatar img={userData?.user?.profilePicture} size="40" round={true} />
                  // : <Avatar name={userData?.user?.firstName} size="40" textSizeRatio={2} round={true} />

                )
              }
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default Header;
