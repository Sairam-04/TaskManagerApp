import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { deleteTodo } from "../../features/task/slice";

const DeleteTask = ({ task, deleteTaskForm }) => {
  const dispatch = useDispatch();
  const deleteData = () => {
    dispatch(deleteTodo({ id: task._id }));
    deleteTaskForm()
  };

  const deleteStatus = useSelector(
    (state) => state.todos.deleteTodoData.status
  );
  const deleteError = useSelector((state) => state.todos.deleteTodoData.error);

  useEffect(() => {
    if (deleteStatus === "idle" || deleteStatus === "fullfilled") {
      toast.success(`Deleted task: ${task.title}`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } else if (deleteStatus === "rejected") {
      toast.error(`Failed to delete the task: ${deleteError}`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  }, [deleteStatus, deleteError, task.title, deleteTaskForm]);

  return (
    <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
      <div className="relative sm:w-[40%] w-[95%] my-6 mx-auto max-w-3xl">
        <div className="border-0 relative flex flex-col w-full rounded-lg bg-gray-100 outline-none focus:outline-none">
          <div className="flex items-center justify-between p-3 border-b border-solid border-blueGray-200 rounded-t text-black">
            <h3 className="text-xl font-semibold">Delete Task</h3>
            <button
              onClick={()=>deleteTaskForm()}
              className="bg-none p-1 ml-auto border-0 text-red-600 float-right text-2xl leading-none font-semibold hover:bg-red-600 hover:text-white hover:px-1 hover:rounded-md"
            >
              X
            </button>
          </div>
          <div className="flex py-5 px-2 flex-col gap-4 ">
            <div className="text-lg">
              Are you sure you want to delete this item {task.title}?
            </div>
            <div className="flex items-center justify-end p-2 border-t border-solid border-blueGray-200 rounded-b">
              <button
                className="bg-[#0560FD] text-white active:bg-[#005eff] font-bold uppercase text-sm px-4 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                onClick={()=>deleteData()}
                disabled={deleteStatus === "pending"}
              >
                {deleteStatus === "pending" ? (
                  <svg
                    aria-hidden="true"
                    role="status"
                    className="inline w-4 h-4 me-3 text-white animate-spin"
                    viewBox="0 0 100 101"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                      fill="#E5E7EB"
                    />
                    <path
                      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                      fill="currentColor"
                    />
                  </svg>
                ) : (
                  "Submit"
                )}
              </button>
            </div>
          </div>
        </div>
        <div className="opacity-25 fixed inset-0 -z-40 bg-black/30"></div>
      </div>
    </div>
  );
};

export default DeleteTask;
