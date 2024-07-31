import React, { useEffect, useState } from "react";
import Header from "./Header";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { getUser } from "../../utils/localStorage";
import TasksComponent from "./TasksComponent";
import CreateTaskForm from "./ShowModal";
const TaskMainComponent = () => {
  const navigate = useNavigate();
  const [createTask, setCreateTask] = useState(false);
  const taskFormOpen = () =>{
    setCreateTask(!createTask)
  } 
  useEffect(() => {
    if (getUser() === null) {
      navigate("/login");
    }
  }, []);
  return (
    <>
      <div className="maincomponent w-full h-screen flex flex-col text-black overflow-hidden font-poppins">
        <Header />

        <div className="w-[80%] mx-auto">
          <div className="flex">
          <button className="text-black bg-slate-100 rounded-md shadow-xl py-2 px-5"
            onClick={()=>taskFormOpen()}
          >Create Task</button>

          </div>
          <TasksComponent />
        </div>
      </div>
      {
          createTask && <CreateTaskForm createTask={createTask} taskFormOpen={taskFormOpen} />
        }
      <ToastContainer />
    </>
  );
};

export default TaskMainComponent;
