import React, { useEffect, useState } from "react";
import CreateTaskForm from "./ShowModal";
import { endpoint } from "../constants/url";
import getService from "../../services/getService";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import deleteService from "../../services/deleteService";
import putService from "../../services/putService";
import Loader from "./Loader";

const HomeComponent = () => {
  return (
    <>
      <div className="homecomponent py-5 flex flex-col gap-3">
        <div className="text-3xl text-center font-bold -tracking-tighter py-2 px-2 w-full">
          👋 Hello, {"   "}
          <span className="text-transparent bg-clip-text font-extrabold bg-gradient-to-r from-fuchsia-400 to-cyan-300">
            {"Sairam"}
          </span>
        </div>
        <div className="flex flex-col gap-3">
          <div>
            <button 
              onClick={()=>taskFormOpen()}
            className="bg-[#7864F4] hover:bg-[#6a54f8] text-white font-semibold py-2 px-4 rounded">
              Create Task
            </button>
          </div>
        </div>
        <TasksList />
        
        <ToastContainer />
      </div>
    </>
  );
};

export default HomeComponent;
