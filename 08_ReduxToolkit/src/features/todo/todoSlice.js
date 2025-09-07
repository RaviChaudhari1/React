import { createSlice, nanoid } from "@reduxjs/toolkit";

const loadTodos = () => {
    try {
        const todos = localStorage.getItem("todos");
        return todos ? JSON.parse(todos) : [];
    } catch (err) {
        console.error("Error loading todos", err);
        return [];
    }
};

const initialState = {
  todos: loadTodos(),
};

const saveTodos = (todos) => {
  try {
    localStorage.setItem("todos", JSON.stringify(todos));
  } catch (err) {
    console.error("Error saving todos", err);
  }
};

export const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    addTodo: (state, action) => {
      const todo = {
        id: nanoid(),
        text: action.payload,
      };
      state.todos.push(todo);
      saveTodos(state.todos);
    },
    deleteTodo: (state, action) => {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload);
      saveTodos(state.todos);
    },
    editTodo: (state, action) => {
      state.todos = state.todos.map((todo) =>
        todo.id === action.payload.id
          ? (todo.text = action.payload.text)
          : todo.text
      );
      saveTodos(state.todos);
    },
  },
});

export const { addTodo, deleteTodo, editTodo } = todoSlice.actions;

export default todoSlice.reducer;
