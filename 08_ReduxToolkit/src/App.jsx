import { AddTodo, Todos } from "./components";

function App() {
  return (
    <>
      <h1 className="text-3xl p-2 bg-gray-700 text-white text-center">Todo App Using Redux Toolkit</h1>
      <AddTodo />
      <Todos/>
    </>
  );
}

export default App;
