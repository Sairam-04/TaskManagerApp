import axios from "axios";
import { getUser } from "../../utils/localStorage";
import { API_BASE_URL } from "../../constants/url";

// Fetch all todos
const fetchAllTodos = () => {
  const uri = `${API_BASE_URL}/get-todo-list`;
  return axios.get(uri, {
    headers: {
      "Content-Type": "application/json",
      "x-auth-token": getUser(),
    },
  });
};

const createTodo = (data) => {
  const uri = `${API_BASE_URL}/create-todo`;
  const payload = { todolist: [data] };
  return axios.post(uri, payload, {
    headers: {
      "Content-Type": "application/json",
      "x-auth-token": getUser(),
    },
  });
};

const editTodo = (data) =>{
    const uri = `${API_BASE_URL}/update-todo/${data._id}`;
    return axios.put(uri, data, {
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": getUser(),
        },
      });
}

const deleteTodo = (id) => {
  const uri = `${API_BASE_URL}/delete-todo/${id}`;
  return axios.delete(uri, {
    headers: {
      "Content-Type": "application/json",
      "x-auth-token": getUser(),
    },
  });
};

export default {
  fetchAllTodos,
  createTodo,
  deleteTodo,
  editTodo
};
