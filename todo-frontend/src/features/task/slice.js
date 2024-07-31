import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import todoService from "./service";

const initialState = {
  todos: {
    data: [],
    status: "init",
    error: "",
  },
  newTodo: {
    data: [],
    status: "init",
    error: "",
  },
  deleteTodoData: {
    status: "init",
    error: "",
  },
  editTodoData: {
    status: "init",
    error: "",
  }
};

// Async thunk for fetching all todos
export const getAllTodos = createAsyncThunk(
  "todos/getAllTodos",
  async (_, { rejectWithValue }) => {
    try {
      const response = await todoService.fetchAllTodos();
      return response.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.message || error?.message);
    }
  }
);

export const createTodo = createAsyncThunk(
  "todos/createTodo", // Corrected slice name
  async (data, { rejectWithValue, dispatch }) => {
    try {
      const response = await todoService.createTodo(data);
      dispatch(getAllTodos());
      return response.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.message || error?.message);
    }
  }
);

export const editTodo = createAsyncThunk(
    "todos/editTodo", // Corrected slice name
    async (data, { rejectWithValue, dispatch }) => {
      try {
        const response = await todoService.editTodo(data);
        dispatch(getAllTodos());
        return response.data;
      } catch (error) {
        return rejectWithValue(error?.response?.data?.message || error?.message);
      }
    }
  );

export const deleteTodo = createAsyncThunk(
  "todos/deleteTodo",
  async (data, { rejectWithValue, dispatch }) => {
    try {
      const response = await todoService.deleteTodo(data.id);
      dispatch(getAllTodos());
      return response.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.message || error?.message);
    }
  }
);

export const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllTodos.pending, (state) => {
        state.todos.status = "pending";
        state.todos.error = "";
      })
      .addCase(getAllTodos.fulfilled, (state, action) => {
        state.todos.status = "idle";
        state.todos.data = action.payload.todolist || [];
        state.todos.error = "";
      })
      .addCase(getAllTodos.rejected, (state, action) => {
        state.todos.status = "rejected";
        state.todos.error = action.payload;
        state.todos.data = [];
      });

    
      builder
      .addCase(editTodo.pending, (state) => {
        state.editTodoData.status = "pending";
        state.editTodoData.error = "";
      })
      .addCase(editTodo.fulfilled, (state, action) => {
        state.editTodoData.status = "idle";
        state.editTodoData.error = "";
      })
      .addCase(editTodo.rejected, (state, action) => {
        state.editTodoData.status = "rejected";
        state.editTodoData.error = action.payload;
      });

    builder
      .addCase(deleteTodo.pending, (state) => {
        state.deleteTodoData.status = "pending";
        state.deleteTodoData.error = "";
      })
      .addCase(deleteTodo.fulfilled, (state, action) => {
        state.deleteTodoData.status = "idle";
        state.deleteTodoData.error = "";
      })
      .addCase(deleteTodo.rejected, (state, action) => {
        state.deleteTodoData.status = "rejected";
        state.deleteTodoData.error = action.payload;
      });
  },
});

export default todoSlice.reducer;
