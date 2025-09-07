# Redux Toolkit

Redux Toolkit simplifies Redux development by reducing boilerplate and providing powerful utilities.



### 🔹 Dependencies to install
```bash
npm install @reduxjs/toolkit
npm install react-redux
```

---

## 1. Creating Store
Store is like a global container that holds the entire app's state

```js
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({});
```

## 2. Creating Slice and Reducers

```js
import { createSlice, nanoid } from "@reduxjs/toolkit";

// initialState → the starting data of our app
const initialState = {
  todos: [
    {
      id: nanoid(),
      text: "Redux Toolkit Todo Project",
    },
  ],
};

export const todoSlice = createSlice({
  // name → used as a key in the Redux store
  name: "todo",
  // initialState → default data for this slice
  initialState,
  // reducers → functions that update the state
  reducers: {
    // addTodo reducer
    // state → current state
    // action → object that carries "data" (payload) to update state
    addTodo: (state, action) => {
      const todo = {
        id: nanoid(),
        text: action.payload, // action.payload = data we pass
      };
      state.todos.push(todo); // updating state
    },
    deleteTodo: (state, action) => {
      // action.payload here = id of todo to delete
      state.todos = state.todos.filter((todo) => todo.id !== action.payload);
    },
  },
});


// 🟢 Why export actions? 
// addTodo, deleteTodo, editTodo are action creators
// → these are used inside components with dispatch(addTodo("text"))
// → basically a way to update state in the store
export const { addTodo, deleteTodo } = todoSlice.actions;

// 🟢 Why export reducer?
// todoSlice.reducer is the main function that handles state changes
// → it listens to actions (addTodo, deleteTodo, editTodo)
// → without reducers, state management in store is not possible
// → used in store.js when creating Redux store
export default todoSlice.reducer;

```

## 3. Configuring Store with Reducers

```js
import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "../features/todo/todoSlice.js";

export const store = configureStore({
  reducer: todoReducer,
});

```

## 4. Using `useDispatch` (Storing Data in Store)

```jsx
import React from "react";
import { useDispatch } from "react-redux";
import { addTodo } from "../features/todo/todoSlice";

function AddTodo() {
  const [input, setInput] = React.useState("");
  const dispatch = useDispatch();

  // dispatch → sends an action to the store
  const addTodoHandler = (e) => {
    e.preventDefault();
    dispatch(addTodo(input));
    setInput("");
  };

  return (
    <form onSubmit={addTodoHandler} className="space-x-3 mt-12">
      <input
        type="text"
        placeholder="Enter a Todo..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button type="submit">Add Todo</button>
    </form>
  );
}

export default AddTodo;

```

## 5. Using useSelector (Accessing Store Values)

```jsx
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteTodo } from "../features/todo/todoSlice";

function Todos() {
  // useSelector → to read state from the store
  const todos = useSelector((state) => state.todos);
  const dispatch = useDispatch();

  return (
    <>
      <h2>Todos</h2>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            {todo.text}
            <button onClick={() => dispatch(deleteTodo(todo.id))}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </>
  );
}

export default Todos;

```

## 6. Providing Store to App

```jsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { Provider } from "react-redux";
import { store } from "./store/store.js";

// Provider → makes the Redux store available to all components inside the app
createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <App />
  </Provider>
);

```

---

## ⚡ Summary

- `configureStore` → creates a Redux store.
- `createSlice` → defines state, reducers, and actions.
- `useDispatch` → dispatch actions (update state).
- `useSelector` → access data from the store.
- `Provider` → makes store available to React components.