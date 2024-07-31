import React, { useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { useDispatch, useSelector } from "react-redux";
import { getAllTodos, editTodo } from "../../features/task/slice";
import EditTask from "./EditTask";
import DeleteTask from "./DeleteTask";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const TasksComponent = () => {
  const [todos, setTodos] = useState([]);
  const [inProgress, setInProgress] = useState([]);
  const [done, setDone] = useState([]);
  const [editTask, setEditTask] = useState(false);
  const editTaskForm = () => {
    setEditTask(!editTask);
  };
  const [deleteTask, setDeleteTask] = useState(false);
  const deleteTaskForm = () => {
    setDeleteTask(!deleteTask);
  };
  const dispatch = useDispatch();
  const { data, status, error } = useSelector((state) => state.todos.todos);

  useEffect(() => {
    dispatch(getAllTodos());
  }, [dispatch]);

  useEffect(() => {
    if (data) {
      const todosData = data.filter((todo) => todo.status === "todo");
      const inProgressData = data.filter(
        (todo) => todo.status === "inprogress"
      );
      const doneData = data.filter((todo) => todo.status === "done");

      setTodos(todosData);
      setInProgress(inProgressData);
      setDone(doneData);
    }
  }, [data]);

  if (status === "pending") {
    return <div>Loading...</div>;
  }

  if (status === "rejected") {
    return <div>Error: {error}</div>;
  }

  const onDragEnd = (result) => {
    const { source, destination } = result;
    if (!destination) return;

    let sourceList = getList(source.droppableId);
    let destList = getList(destination.droppableId);
    let [movedItem] = sourceList.splice(source.index, 1);
    destList.splice(destination.index, 0, movedItem);

    setList(source.droppableId, sourceList);
    setList(destination.droppableId, destList);

    const updatedTask = { ...movedItem, status: destination.droppableId };
    dispatch(editTodo(updatedTask))
      .unwrap()
      .then(() => {
        toast.success(`Task "${movedItem.title}" status updated to ${destination.droppableId}`);
      })
      .catch((error) => {
        toast.error(`Failed to update task status: ${error.message}`);
      });
  };

  const getList = (id) => {
    switch (id) {
      case "todo":
        return todos;
      case "inprogress":
        return inProgress;
      case "done":
        return done;
      default:
        return [];
    }
  };

  const setList = (id, list) => {
    switch (id) {
      case "todo":
        setTodos(list);
        break;
      case "inprogress":
        setInProgress(list);
        break;
      case "done":
        setDone(list);
        break;
      default:
        break;
    }
  };

  const renderList = (items, droppableId) => (
    <Droppable droppableId={droppableId}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.droppableProps}
          className="flex flex-col gap-2 items-center"
        >
          {items.map((item, index) => (
            <Draggable key={item._id} draggableId={item._id} index={index}>
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                  className="draggable-item bg-white my-2 p-2 rounded-md w-4/5 flex justify-between items-center"
                >
                  <div className="w-4/5">{item.title}</div>
                  <div className="flex gap-3">
                    <i
                      className="bi bi-pencil-square text-lg cursor-pointer"
                      onClick={() => editTaskForm()}
                    ></i>
                    <i className="bi bi-x-circle-fill text-lg text-red-500 cursor-pointer"
                    onClick={()=> deleteTaskForm()}
                    ></i>
                  </div>
                  {editTask && <EditTask task={item} editTaskForm={editTaskForm}  />}
                  {deleteTask && <DeleteTask task={item} deleteTaskForm={deleteTaskForm} />}
                </div>
              )}
            </Draggable>
          ))}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );

  return (
    <>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="flex sm:flex-row flex-col sm:justify-between sm:gap-0 gap-5 h-screen w-full py-4">
          <div className="sm:w-[32%] w-full min-h-10 h-fit bg-gray-500/30 rounded-md text-center">
            <h2 className="font-semibold text-lg">Todo</h2>
            {renderList(todos, "todo")}
          </div>
          <div className="sm:w-[32%] w-full min-h-10 h-fit bg-gray-500/30 rounded-md text-center">
            <h2 className="font-semibold text-lg">In Progress</h2>
            {renderList(inProgress, "inprogress")}
          </div>
          <div className="sm:w-[32%] w-full min-h-10 h-fit bg-gray-500/30 rounded-md text-center">
            <h2 className="font-semibold text-lg">Done</h2>
            {renderList(done, "done")}
          </div>
        </div>
        <ToastContainer />
      </DragDropContext>
    </>
  );
};

export default TasksComponent;
