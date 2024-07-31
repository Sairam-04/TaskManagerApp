import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createTodo, editTodo } from "../../features/task/slice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EditTask = ({ task, editTaskForm }) => {
  const [taskData, setTaskData] = useState(task);
  const [tag, setTag] = useState("");
  const [tagsList, setTagsList] = useState(task.tags || []);
  const [taskErrors, setTaskErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState("");

  const dispatch = useDispatch();
  const { data, status, error } = useSelector((state) => state.todos);

  useEffect(() => {
    if (status === "rejected" && error) {
      setApiError(error);
      console.log(error);
    }
  }, [status, error]);

  const validateTaskForm = (values) => {
    const errors = {};
    if (!values.title) {
      errors.title = "Title is Required";
    } else if (values.title.length < 5) {
      errors.title = "Title must at least contain 5 characters";
    }
    if (!values.desc) {
      errors.desc = "Description is Required";
    }
    return errors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTaskData((prevTask) => ({
      ...prevTask,
      [name]: value,
    }));
  };

  const SubmitTask = (e) => {
    e.preventDefault();
    const errors = validateTaskForm(taskData);
    setTaskErrors(errors);

    if (!Object.keys(errors).length) {
      setLoading(true);
      editTaskForm();
      console.log(taskData);
      dispatch(editTodo(taskData))
        .unwrap()
        .then(() => {
          toast.success(
            `Task "${taskData.title}" is Updated`
          );
          setLoading(false);
          setTaskData({
            title: "",
            desc: "",
            tags: [],
            status: "todo",
          });
          setTagsList([]);
          editTaskForm();
        })
        .catch((error) => {
          toast.error(`Failed to update task status: ${error.message}`);
        });
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
    }
  };

  const onTaskChange = (e) => {
    setTag(e.target.value);
  };

  const addTask = (e) => {
    if (e.key === "Enter") {
      setTagsList((prevTag) => [tag, ...prevTag]);
      setTag("");
    }
  };

  const removeTag = (index) => {
    const newarr = tagsList.filter((item, i) => i !== index);
    setTagsList(newarr);
  };

  return (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative sm:w-[40%] w-full my-6 mx-auto max-w-3xl">
          <form
            onSubmit={SubmitTask}
            className="border-0 relative flex flex-col w-full rounded-lg shadow-2xl bg-gray-100 outline-none focus:outline-none"
          >
            <div className="flex items-center justify-between p-3 border-b border-solid border-blueGray-200 rounded-t text-black">
              <h3 className="text-xl font-semibold">Edit Task</h3>
              <div
                onClick={() => editTaskForm()}
                type="button"
                className="bg-none p-1 ml-auto border-0 text-red-600 float-right text-2xl leading-none font-semibold hover:bg-red-600 hover:text-white hover:px-1 hover:rounded-md"
              >
                X
              </div>
            </div>
            <div className="relative p-6 flex-auto h-[60vh] overflow-y-auto">
              <div className="flex flex-col gap-3">
                <div className="sm:w-4/5 w-full text-left">
                  <label
                    htmlFor="title"
                    className="block mb-2 text-base font-medium text-gray-900"
                  >
                    Title
                  </label>
                  <input
                    name="title"
                    type="text"
                    value={taskData.title}
                    onChange={handleChange}
                    placeholder="Title"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                  />
                  <p className="mt-2 text-sm text-red-500">
                    {taskErrors.title}
                  </p>
                </div>
                <div className="sm:w-4/5 w-full text-left">
                  <label
                    htmlFor="desc"
                    className="block mb-2 text-base font-medium text-gray-900"
                  >
                    Description
                  </label>
                  <textarea
                    name="desc"
                    value={taskData.desc}
                    onChange={handleChange}
                    placeholder="Desc"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                  />
                  <p className="mt-2 text-sm text-red-500">{taskErrors.desc}</p>
                </div>
                <div className="sm:w-4/5 w-full text-left">
                  <label
                    htmlFor="status"
                    className="block mb-2 text-base font-medium text-gray-900"
                  >
                    Status
                  </label>
                  <select
                    name="status"
                    value={taskData.status}
                    onChange={handleChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  >
                    <option value="todo">Todo</option>
                    <option value="inprogress">In Progress</option>
                    <option value="done">Done</option>
                  </select>
                  <p className="mt-2 text-sm text-red-500">
                    {taskErrors.status}
                  </p>
                </div>

                <div className="tags flex flex-col gap-5 text-left">
                  {tagsList && tagsList.length > 0 && (
                    <div className="flex flex-wrap w-full h-auto border border-blue-400 p-2 gap-1">
                      {tagsList.map((ele, ind) => (
                        <div
                          key={ind}
                          className="py-0.5 pl-2 bg-[#0560FD] text-white rounded-xl justify-between text-xs flex gap-2"
                        >
                          <div>{ele}</div>
                          <div
                            onClick={() => removeTag(ind)}
                            className="bg-white text-gray-900 flex items-center justify-center rounded-full w-4 cursor-pointer"
                          >
                            X
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                  <div className="sm:w-4/5 w-full">
                    <label
                      htmlFor="tag"
                      className="block mb-2 text-base font-medium text-gray-900"
                    >
                      Tags
                    </label>
                    <input
                      name="tag"
                      value={tag}
                      onChange={onTaskChange}
                      onKeyDown={addTask}
                      placeholder="Tags"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                    />
                  </div>
                </div>
              </div>
            </div>
            {apiError && (
              <div className="text-red-500 text-sm px-6 py-2">{apiError}</div>
            )}
            <div className="flex items-center justify-end p-2 border-t border-solid border-blueGray-200 rounded-b">
              <button
                className="bg-[#0560FD] text-white active:bg-[#005eff] font-bold uppercase text-sm px-4 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="submit"
                disabled={loading}
              >
                {loading ? (
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
          </form>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 -z-40 bg-black"></div>
    </>
  );
};

export default EditTask;
