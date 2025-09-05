import { useEffect, useState } from "react";
import { TodoProvider } from "./contexts";
import { TodoForm, TodoItem } from "./components";
import { v4 as uuidv4 } from "uuid";

function App() {
  const [todos, setTodos] = useState([]);

  const addTodo = (todo) => {
    // here ...prev is spread operator which consists of all the previous todos
    // {id: Date.now(), ...todo} - here new todo will created with all properties as it is but 'id' will be overwritten
    // ...todo spreads the new todo and new id is overwritten
    setTodos((prev) => [{ id: uuidv4(), ...todo }, ...prev]);
  };

  const deleteTodo = (id) => {
    const newTodos = todos.filter((todo) => todo.id !== id);

    setTodos(newTodos);
  };

  const editTodo = (id, newTodo) => {
    const newTodos = todos.map((prevTodo) =>
      prevTodo.id === id ? { ...prevTodo, todo: newTodo } : prevTodo
    );
    setTodos(newTodos);
  };

  const toggleComplete = (id) => {
    // Take all previous todos
    // Map prevTodos
    // find todo with 'id' = 'id'
    // if found, toggle isConpleted value of todo, everything else remains same and setTodos()
    // else set prevTodos to setTodos()
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo
      )
    );
  };

  useEffect(() => {
    const todos = JSON.parse(localStorage.getItem("todos"));

    if (todos && todos.length > 0) {
      setTodos(todos);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  return (
    <TodoProvider
      value={{ todos, addTodo, deleteTodo, editTodo, toggleComplete }}
    >
      <div className="bg-[#172842] min-h-screen py-8">
        <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
          <h1 className="text-2xl font-bold text-center mb-8 mt-2">
            Manage Your Todos
          </h1>
          <div className="mb-4">
            <TodoForm />
          </div>
          <div className="flex flex-wrap gap-y-3">
            {todos.map((todo) => (
              <div key={todo.id} className="w-full">
                <TodoItem todo={todo} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </TodoProvider>
  );
}

export default App;
